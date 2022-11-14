/**
 * vue版的防抖函数初始化函数
 * @author 游博林 @2022-2-16 01:42
 * @property {Number} delay = 500       默认防抖延迟时间
 * @property {Boolean} immediate = true 是否立即执行
 * @returns {Function} debounce vue版的防抖函数
 */
function initDebounce({ delay = 600, immediate = false } = {}) {
  const defaultDelay = delay
  const defaultImmediate = immediate
  const ID = Symbol('defaultID')
  const timeoutID = {}
  /**
   * vue版的防抖函数
   * @param {Function} fn                     需要防抖的函数
   * @param {Object} options                  配置选项
   * @property {Array} params of options      需要防抖的函数的参数
   * @property {Number} delay of options      防抖延迟时间
   * @property {Boolean} immediate of options 是否立即执行
   * @property {String|Number} id of options  传入id启用不同的防抖函数
   */
  return function debounce(fn, { params, delay, immediate, id = ID } = {}) {
    if (typeof fn !== 'function') {
      return console.error('[debounce warn]: TypeError: The First parameter is not a function')
    }
    const isImmediate = immediate ?? defaultImmediate
    if (isImmediate && !timeoutID[id]) fn.apply(this, params)
    clearTimeout(timeoutID[id])
    timeoutID[id] = setTimeout(() => {
      if (!isImmediate) fn.apply(this, params)
      if (isImmediate) timeoutID[id] = void 0
    }, delay ?? defaultDelay)
  }
}

export default initDebounce
