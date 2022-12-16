/**
 * vue版的节流函数初始化函数
 * @author 游博林 @2022-2-15 18:56
 * @property {number} delay = 500       默认节流延迟时间
 * @property {boolean} immediate = true 是否立即执行
 * @returns {function} vue版的节流函数
 */
function initThrottle({ delay = 500, immediate = true } = {}) {
  const defaultDelay = delay
  const defaultImmediate = immediate
  const ID = Symbol('defaultID')
  const isDoThrottle = { [ID]: false }
  /**
   * vue版的节流函数
   * @param {function} fn                     需要节流的函数
   * @param {object} options                  配置选项
   * @property {array} params of options      需要节流的函数的参数
   * @property {number} delay of options      节流延迟时间
   * @property {boolean} immediate of options 是否立即执行
   * @property {string|number} id of options  传入id启用不同的节流函数
   */
  return function throttle(fn, { params, delay, immediate, id = ID } = {}) {
    if (typeof fn !== 'function') {
      return console.error('[throttle warn]: TypeError: The First parameter is not a function')
    }
    if (isDoThrottle[id]) return
    const isImmediate = immediate ?? defaultImmediate
    isDoThrottle[id] = true
    isImmediate && fn.apply(this, params)
    setTimeout(() => {
      !isImmediate && fn.apply(this, params)
      isDoThrottle[id] = false
    }, delay ?? defaultDelay)
  }
}

export default initThrottle
