/**
 * 构建前从 npm registry 拉取各生态项目的最新版本
 * ----------------------------------------------------------------------------
 * 为什么放在「构建时」而不是「运行时」：
 *   bindview 的组件 props 只在实例创建时传入一次，父组件更新不会刷新子组件的 props
 *   （见 bindview/src/core/createComponentExample.js），因此「父组件异步拿到版本号 →
 *   再传给卡片子组件」这条路走不通。把版本号在构建前落盘成 JSON，页面直接静态引用，
 *   既没有运行时异步 / 跨域 / 离线失败的问题，看到的也确实是 npm 上的最新版本。
 *
 * 行为：
 *   - 依次尝试 npmmirror（国内快）与 npmjs 官方源；
 *   - 成功 → 更新 src/config/versions.json 中对应条目，并刷新 fetchedAt；
 *   - 失败 → 保留 JSON 里上一次的值（离线也能正常构建，不会中断构建流程）；
 *   - 无论如何都以退出码 0 结束，只做提示，不阻断 webpack。
 *
 * 用法：
 *   node scripts/fetch-versions.js      （或 npm run versions）
 *   已挂到 prestart / preserve / prehistory / prebuild，npm run serve|build 会自动执行。
 */
const fs = require("fs")
const path = require("path")
const https = require("https")

const OUT_FILE = path.resolve(__dirname, "../src/config/versions.json")

/** 需要查询的包：与 src/config/ecosystem.js 里的四个生态项目一一对应 */
const PACKAGES = ["bindview", "bindview-router", "bindview-store", "bindview-component"]

/** registry 优先级：先国内镜像，再官方源 */
const REGISTRIES = ["https://registry.npmmirror.com", "https://registry.npmjs.org"]

const TIMEOUT = 8000

/**
 * 请求一个 URL 并解析 JSON
 * @param {String} url
 * @returns {Promise<Object|null>} 解析失败 / 非 200 / 超时都返回 null（由调用方回退）
 */
function requestJson(url) {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      { timeout: TIMEOUT, headers: { "User-Agent": "bindview-template-version-fetcher" } },
      (res) => {
        // 跟随一次重定向（registry 偶尔会 302 到 CDN）
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume()
          resolve(requestJson(res.headers.location))
          return
        }
        if (res.statusCode !== 200) {
          res.resume()
          resolve(null)
          return
        }

        let body = ""
        res.setEncoding("utf8")
        res.on("data", (chunk) => {
          body += chunk
        })
        res.on("end", () => {
          try {
            resolve(JSON.parse(body))
          } catch (err) {
            resolve(null)
          }
        })
      }
    )

    req.on("timeout", () => {
      req.destroy()
      resolve(null)
    })
    req.on("error", () => resolve(null))
  })
}

/**
 * 查一个包的最新版本
 * @param {String} name 包名
 * @returns {Promise<{version:String|null, source:String|null}>}
 */
async function latestVersion(name) {
  for (const base of REGISTRIES) {
    const json = await requestJson(`${base}/${name}/latest`)
    if (json && json.version) {
      return { version: String(json.version), source: base }
    }
  }
  return { version: null, source: null }
}

/** 读取上一次的结果，作为网络失败时的兜底 */
function readPrev() {
  try {
    const raw = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"))
    return raw && typeof raw === "object" && raw.versions ? raw.versions : {}
  } catch (err) {
    return {}
  }
}

async function main() {
  const prev = readPrev()
  const versions = Object.assign({}, prev)
  const failed = []

  const results = await Promise.all(
    PACKAGES.map(async (name) => ({ name, ...(await latestVersion(name)) }))
  )

  results.forEach((item) => {
    if (item.version) {
      versions[item.name] = item.version
    } else {
      failed.push(item.name)
    }
  })

  const next = {
    // 本次查询时间（有包失败时也写入，便于区分「离线」与「真的没更新」）
    fetchedAt: new Date().toISOString(),
    versions
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(next, null, 2) + "\n", "utf8")

  console.log("")
  console.log("  npm 版本检查（写入 src/config/versions.json）")
  results.forEach((item) => {
    if (item.version) {
      console.log(`    ✔ ${item.name}@${item.version}  (${item.source})`)
    } else {
      console.log(`    · ${item.name} 查询失败，沿用本地记录 ${versions[item.name] || "（无）"}`)
    }
  })
  if (failed.length > 0) {
    console.log(`    提示：${failed.join(" / ")} 未能联网查询，已保留上一次的版本号，不影响构建。`)
  }
  console.log("")
}

main().catch((err) => {
  // 兜底：脚本本身出问题也不能阻断 npm run serve / build
  console.log(`  [fetch-versions] 跳过版本检查：${err && err.message}`)
})
