/**
 * 从 npm registry 实时获取各包的最新版本（浏览器端）
 * ----------------------------------------------------------------------------
 * 网页加载后由组件在 life.created 里调用，拿到结果写进自己的 data，
 * 靠 bindview 的响应式自动刷新视图（DataProxy 任意 set 都会 queueJob(vm)）。
 *
 * 两个源依次尝试，任一成功即返回：
 *   1. registry.npmmirror.com —— 国内访问快
 *   2. registry.npmjs.org     —— 官方源
 * 两者都带 `Access-Control-Allow-Origin: *`，因此浏览器可直接跨域请求。
 *
 * 取不到（离线 / 被拦截 / 超时）时返回空对象，页面回退到内置兜底版本，不会报错。
 */

const REGISTRIES = ["https://registry.npmmirror.com", "https://registry.npmjs.org"]

/** 单个请求的超时时间（毫秒）：避免离线环境一直挂着 */
const TIMEOUT = 6000

/**
 * 带超时的 fetch
 * @param {String} url
 * @returns {Promise<Response>}
 */
function fetchWithTimeout(url) {
  // AbortController 在旧浏览器上可能不存在，降级为直接 fetch
  if (typeof AbortController !== "function") {
    return fetch(url, { cache: "no-store" })
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT)

  return fetch(url, { cache: "no-store", signal: controller.signal }).finally(() => {
    clearTimeout(timer)
  })
}

/**
 * 查一个包的最新版本（registry 的 <pkg>/latest 接口）
 * @param {String} name 包名
 * @returns {Promise<String|null>}
 */
async function fetchOneVersion(name) {
  for (let i = 0; i < REGISTRIES.length; i++) {
    const base = REGISTRIES[i]
    try {
      const res = await fetchWithTimeout(`${base}/${encodeURIComponent(name)}/latest`)
      if (!res.ok) continue

      const data = await res.json()
      if (data && data.version) return String(data.version)
    } catch (err) {
      // 当前源不可用，换下一个
    }
  }
  return null
}

/**
 * 批量查询最新版本
 * @param {Array<String>} names 包名列表
 * @returns {Promise<Object>} { [包名]: 版本号 }，未取到的包不会出现在结果里
 */
export async function fetchLatestVersions(names) {
  // 环境不支持 fetch（极老浏览器 / 非浏览器环境）时直接放弃，由调用方回退
  if (typeof fetch !== "function") return {}

  const list = Array.isArray(names) ? names : []
  const pairs = await Promise.all(
    list.map(async (name) => [name, await fetchOneVersion(name)])
  )

  const versions = {}
  pairs.forEach((pair) => {
    if (pair[1]) versions[pair[0]] = pair[1]
  })
  return versions
}
