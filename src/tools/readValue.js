/**
 * 兼容「函数取值器」与「直接取值」两种 props 写法
 * ----------------------------------------------------------------------------
 * bindview 里把响应式数据传给子组件时通常写成函数（函数取值器 / 函数插槽），
 * 例如 <Son num={() => _.num} />，子组件内用 num() 读取即可保持响应式；
 * 而静态数据则直接传值。这个工具让展示页的组件两种写法都能吃。
 *
 * @param {*} value 任意 props 值
 * @returns {*} 是函数则调用并返回结果，否则原样返回
 */
export default function readValue(value) {
  return typeof value === "function" ? value() : value
}
