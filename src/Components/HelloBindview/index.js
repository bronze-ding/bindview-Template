import "./index.less"

export default function (bv) {
  return bv.$h('div', { class: '_body' }, [
    bv.$h('h1', 'Welcome Bindview.js '),
    bv.$h('div', { ref: 'introduce', class: 'introduce' }, [
      bv.$h('p', 'bindview.js是一个使用虚拟dom来创建真实dom,并实现了模型与视图绑定的javascript库,使用了webpack打包工具')
    ]),
    bv.$h('div', { class: 'Exhibition' }, [
      bv.$h('div', [
        bv.$h('p', 'npm 安装'),
        bv.$h('pre', bv.$h('code', [
          bv.$h('span', { val: 'npm i bindview', class: 'keyword' })
        ])),
        bv.$h('p', '基础使用'),
        bv.$h('pre', bv.$h('code', [
          bv.$h('span', { val: 'import ', class: 'reds' }),
          bv.$h('span', { val: 'Bindview', class: 'keyword' }),
          bv.$h('span', { val: ' from ', class: 'reds' }),
          bv.$h('span', { val: "'bindview'", class: 'punctuation' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: "new ", class: 'keyword' }),
          bv.$h('span', { val: "Bindeview(", class: 'punctuation' }),
          bv.$h('span', { val: "{", class: 'reds' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: "  el: ", class: 'keyword' }),
          bv.$h('span', { val: "'#App',", class: 'punctuation' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: "  data: ", class: 'keyword' }),
          bv.$h('span', { val: "{", class: 'reds' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: "    title: ", class: 'keyword' }),
          bv.$h('span', { val: "'Hello Bindview.js'", class: 'punctuation' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: "  }", class: 'reds' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: "  node", class: 'keyword' }),
          bv.$h('span', { val: "(", class: 'hunag' }),
          bv.$h('span', { val: " bv ", class: 'punctuation' }),
          bv.$h('span', { val: ")", class: 'hunag' }),
          bv.$h('span', { val: "{", class: 'reds' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: "    retutn ", class: 'hunag' }),
          bv.$h('span', { val: "bv", class: 'keyword' }),
          bv.$h('span', { val: ".", class: 'punctuation' }),
          bv.$h('span', { val: "$h", class: 'reds' }),
          bv.$h('span', { val: "(", class: 'reds' }),
          bv.$h('span', { val: "'div'", class: 'hunag' }),
          bv.$h('span', { val: ",", class: 'punctuation' }),
          bv.$h('span', { val: "bv", class: 'keyword' }),
          bv.$h('span', { val: ".", class: 'punctuation' }),
          bv.$h('span', { val: "title", class: 'hunag' }),
          bv.$h('span', { val: ")", class: 'reds' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: "  }", class: 'reds' }),
        ])),
      ]),
      bv.$h('div', [
        bv.$h('p', 'git 安装'),
        bv.$h('pre', bv.$h('code', [
          bv.$h('span', { val: 'git clone https://github.com/debfig/bindview-Template.git', class: 'keyword' })
        ])),
        bv.$h('p', 'Bindview.js 模板使用'),
        bv.$h('pre', bv.$h('code', [
          bv.$h('span', { val: '//', class: 'punctuation' }),
          bv.$h('span', { val: ' 安装依赖', class: 'lv' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: '    npm i ', class: 'keyword' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: '//', class: 'punctuation' }),
          bv.$h('span', { val: ' 运行', class: 'lv' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: '    npm run serve ', class: 'keyword' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: '//', class: 'punctuation' }),
          bv.$h('span', { val: ' 打包', class: 'lv' }),
          bv.$h('br'),
          bv.$h('p'),
          bv.$h('span', { val: '    pm run build ', class: 'keyword' }),
        ])),
      ]),
    ]),
    bv.$h('div', { class: 'Exhibition' }, [
      bv.$h('div', [
        bv.$h('p', '<script> 标签引入'),
        bv.$h('pre', bv.$h('code', [
          bv.$h('span', { val: '<script src="http://canlie.xyz:8001/api/bindview"></script>', class: 'keyword' })
        ])),
      ])
    ])
  ])
}