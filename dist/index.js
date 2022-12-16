/**
 * vue版的防抖函数初始化函数
 * @author 游博林 @2022-2-16 01:42
 * @property {number} delay = 500       默认防抖延迟时间
 * @property {boolean} immediate = true 是否立即执行
 * @returns {function} debounce vue版的防抖函数
 */
function initDebounce({ delay = 600, immediate = false } = {}) {
  const defaultDelay = delay;
  const defaultImmediate = immediate;
  const ID = Symbol('defaultID');
  const timeoutID = {};
  /**
   * vue版的防抖函数
   * @param {function} fn                     需要防抖的函数
   * @param {object} options                  配置选项
   * @property {array} params of options      需要防抖的函数的参数
   * @property {number} delay of options      防抖延迟时间
   * @property {boolean} immediate of options 是否立即执行
   * @property {string|number} id of options  传入id启用不同的防抖函数
   */
  return function debounce(fn, { params, delay, immediate, id = ID } = {}) {
    if (typeof fn !== 'function') {
      return console.error('[debounce warn]: TypeError: The First parameter is not a function')
    }
    const isImmediate = immediate ?? defaultImmediate;
    if (isImmediate && !timeoutID[id]) fn.apply(this, params);
    clearTimeout(timeoutID[id]);
    timeoutID[id] = setTimeout(() => {
      if (!isImmediate) fn.apply(this, params);
      if (isImmediate) timeoutID[id] = void 0;
    }, delay ?? defaultDelay);
  }
}

/**
 * vue版的节流函数初始化函数
 * @author 游博林 @2022-2-15 18:56
 * @property {number} delay = 500       默认节流延迟时间
 * @property {boolean} immediate = true 是否立即执行
 * @returns {function} vue版的节流函数
 */
function initThrottle({ delay = 500, immediate = true } = {}) {
  const defaultDelay = delay;
  const defaultImmediate = immediate;
  const ID = Symbol('defaultID');
  const isDoThrottle = { [ID]: false };
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
    const isImmediate = immediate ?? defaultImmediate;
    isDoThrottle[id] = true;
    isImmediate && fn.apply(this, params);
    setTimeout(() => {
      !isImmediate && fn.apply(this, params);
      isDoThrottle[id] = false;
    }, delay ?? defaultDelay);
  }
}

/**
 * JSON深拷贝
 * @param {object} obj 需要深拷贝的对象
 * @returns {object}   JSON深拷贝后的新对象
 */
const copy = obj => JSON.parse(JSON.stringify(obj));

/**
 * 将角度转换成弧度
 * @param {number|string} v 角度
 * @returns {number} 弧度
 */
const rad = v => (v * Math.PI) / 180;

/**
 * 判断数据类型
 * @param {any} data 需要判断类型的数据
 * @returns {'number'|'string'|'array'|'function'|'null'|'undefined'|'object'|'boolean'} 数据类型
 */
const types = data => Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

/**
 * 判断是否是对象类型
 * @param {any} data 数据
 * @returns {boolean} 类型字符串
 */
const isObj = data => types(data) === 'object';

/**
 * 首字母大写
 * @param {string} str 英文单词
 * @returns {string} Capitalize string
 */
const capitalize = str => {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
};

/**
 * 中横线转大驼峰 kebab-case to CamelCase
 * @param {string} str 英文单词
 * @returns {string} 大驼峰英文单词
 */
const kebabcase2CamelCase = str =>
  str
    .split('-')
    .map(item => capitalize(item))
    .join('');

/**
 * 删除数组中的元素
 * @param {array} arr 数组
 * @param {any} item 数组中的元素
 * @param {number} index 数组中元素的索引
 * @returns {array} 由删除元素组成的新数组
 */
const removeItem = (arr, item, index = arr.indexOf(item)) => !!~index && arr.splice(index, 1);

/**
 * 给距离添加单位
 * @param {string|number} v 需要加单位的值
 * @returns {string} 加了单位的值
 */
const distanceUnit = v => {
  if (isNaN(v)) return v
  v = +v;
  if (v > 1000) v = Math.round(v / 100) / 10 + 'km';
  else {
    if (v < 0 || isNaN(v)) v = 0;
    v = Math.round(v) + 'm';
  }
  return v
};
/**
 * 自动给没加单位的值加上rpx
 * @param {string|number} v 需要加单位的值
 * @returns {string} 加了单位的值
 */
const addUnit = (
  v,
  unit = typeof uni != 'undefined' && types(uni) == 'object' ? 'rpx' : 'px'
) => (isNaN(v) ? v : v + unit);

/**
 * 防抖
 */
const debounce = initDebounce();

/**
 * 节流
 */
const throttle = initThrottle();

/**
 * 获取距离的一系列方法
 */
class Distance {
  static EARTH_RADIUS = 6378137 // 地球半径 单位 M
  constructor() {}
  /**
   * 获取两个坐标之间的距离
   * @param {object} coord1                       坐标1
   * @param {object} coord2                       坐标2
   * @property {number|string} longitude of coord 经度
   * @property {number|string} latitude of coord  纬度
   * @returns 当前位置到目的地的距离
   */
  static getDistance(coord1, coord2) {
    if (
      isNaN(coord1.longitude) ||
      isNaN(coord1.latitude) ||
      isNaN(coord2.longitude) ||
      isNaN(coord2.latitude)
    )
      console.error('getDistance方法参数错误,请传坐标对象');
    const La1 = Math.rad(coord1.latitude);
    const La2 = Math.rad(coord2.latitude);
    const La3 = La1 - La2;
    const Lb3 = Math.rad(coord1.longitude) - Math.rad(coord2.longitude);
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(La3 / 2), 2) +
            Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)
        )
      );
    s *= this.EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s
  }
  /**
   * 获取当前定位位置到目的地的距离
   * @description 适合在只需要获取一次的时候，快捷使用，如果大量使用此方法，每次都会调用定位方法，消耗大量资源
   * @param {object} aim                        目的地坐标
   * @property {number|string} longitude of aim 当前位置经度
   * @property {number|string} latitude of aim  当前位置纬度
   * @returns 当前位置到目的地的距离
   */
  static async from(aim) {
    const [err, { longitude, latitude }] = await uni.getLocation();
    if (err) uni.showToast({ title: '获取位置失败', icon: 'none' });
    return this.getDistance({ longitude, latitude }, aim)
  }
}

/**
 * CSS样式字符串转对象
 * @param {string} styleStr CSS样式字符串
 * @returns {object} 样式对象
 */
const style2obj = styleStr => {
  if (isObj(styleStr)) return JSON.copy(styleStr) // 如果是对象直接返回
  if (styleStr == null) return {} // 如果是null,undefined返回空对象
  if (styleStr.charAt(styleStr.length - 1) == ';') styleStr = styleStr.slice(0, -1);
  const styleArr = styleStr.split(';');
  const styleObj = {};
  styleArr.forEach(item => {
    const [k, v] = item.split(':');
    styleObj[k] = v;
  });
  return JSON.copy(styleObj)
};

/**
 * Urlquery 对url参数的一系列方法
 */
class Urlquery {
  constructor() {}
  /**
   * url参数字符串转对象
   * @param {string} url              需要解析的url字符串
   * @param {object} opts             配置选项
   * @property {boolean} omit of opts 是否省略值为undefined的参数
   * @returns {object} url参数对象
   */
  static parse(url, { omit = true } = {}) {
    const index = url.indexOf('?');
    if (~index) url = url.slice(index + 1);
    const o = {};
    if (!url.includes('://')) {
      url.split('&').forEach(item => {
        const [k, v] = item.split('=');
        if (omit && v === undefined) return
        o[k] = v;
      });
    }
    return o
  }
  /**
   * url参数对象转字符串
   * @param {object} o url参数对象
   * @property {boolean} omit 是否省略值为undefined的参数
   * @property {string} prefix 前缀
   * @returns {string} url参数字符串
   */
  static stringify(o, { prefix = '?', encode = true } = {}) {
    if (typeof o == 'string' && o) return prefix ? prefix + o : o
    if (!isObj(o)) return ''
    // 处理程序
    let str = '';
    Object.entries(o).forEach(([k, v]) => {
      if (v === undefined) return
      v = encode ? this.encodeParam(v) : v;
      str += `&${k}=${v}`;
    });
    str = str.slice(1);
    if (prefix) str = prefix + str;
    return str
  }
  // 编码参数，如果是对象或者数组就装成json字符串
  static encodeParam(v) {
    if (isObj(v) || Array.isArray(v)) v = JSON.stringify(v);
    return encodeURIComponent(v)
  }
  /**
   * 获取指定的url参数
   * @param {string} url url字符串
   * @param  {any} args  参数字段
   * @returns {string} 指定的url参数字符串
   */
  static getSpecifyParams(url, ...args) {
    const hasProperty = Object.prototype.hasOwnProperty;
    let o = this.parse(url);
    let specifiedParams = '';
    args.forEach(k => {
      if (hasProperty.call(o, k)) specifiedParams += `&${k}=${o[k]}`;
    });
    return specifiedParams.slice(1)
  }
}

/**
 * 进行延时，以达到可以简写代码的目的 比如: await uni.y.sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise} 返回promise
 */
const sleep = (gap = 30) => new Promise(r => setTimeout(() => r(), gap));

/**
 * 一维数组转二维数组
 * @param {array} arr 一维数组
 * @param {number} n 子数组的长度
 * @returns {array} 二维数组
 */
const arrayToMatrix = (arr, n) => {
  const matrix = [];
  const len = arr.length;
  let i = 0;
  while (i < len) {
    matrix.push(arr.slice(i, (i += n)));
  }
  return matrix
};

/**
 * 创建枚举类型
 * @param {array|object} E 数据源
 * @returns {object} 枚举类型
 */
class Enum {
  index
  constructor(E) {
    if (Array.isArray(E)) {
      E.forEach((v, i) => {
        if (isObj(v)) return Enum.setObjEnum(v, this)
        this[(this[v] = Enum.getIndex(this) || i)] = v;
      });
    } else if (isObj(E)) Enum.setObjEnum(v, this);
    else throw new TypeError('Enum parameter must be Object or Array')
  }
  static setObjEnum(o, instance) {
    Object.entries(o).forEach(([k, v]) => {
      instance[(instance[k] = v)] = k;
      instance.index = v;
    });
  }
  static getIndex(instance) {
    if (instance.index == null) return false
    if (typeof instance.index != 'number') throw new Error('Enum member must have initializer.')
    return ++instance.index
  }
}

/**
 * 从一个对象中提取需要的属性返回一个新对象
 * @param {object} obj 源对象
 * @param {array} keys 需要获取的属性的key
 * @returns {object} 由需要的熟悉组成的新对象
 */
const pick = (obj, keys) => {
  let o = {};
  keys.forEach(k => (o[k] = obj[k]));
  return o
};

/**
 * 获取index保存在数组中
 * @param {array} sourceArr 查找源，从这个数组中中查找目标对象中的值
 * @param {array} targetArr 查找目标，这个数组中保存的是需要查找的值
 * @param {object} options 配置项
 * @param {string} targetKey of options 目标属性名
 * @param {string} childKey of options 子数组属性名
 * @returns {array} 找到的索引组成的数组
 */
const findIndexArr = (
  sourceArr,
  targetArr,
  { targetKey = 'value', childKey = 'children', handler } = {}
) => {
  let resultArr = [];
  let targetIndex = 0;
  function getDeault(sourceArr, targetArr) {
    return sourceArr.findIndex(item => {
      let found = item[targetKey] == targetArr[targetIndex];
      if (found) {
        typeof handler == 'function' && handler(item);
        if (targetArr[++targetIndex]) {
          resultArr.unshift(getDeault(item[childKey], targetArr));
        }
      }
      return found
    })
  }
  resultArr.unshift(getDeault(sourceArr, targetArr));
  return resultArr
};

/**
 * html字符串转纯文本
 * @param {string} html html字符串
 * @returns {string} 去除了标签的纯文本内容
 */
const html2txt = html => html.replace(/<[^>]*>/g, '');

/**
 * 合并样式
 * @param  {...string|object} args 样式字符串或对象
 * @returns {object} 合并后的样式对象
 */
const mergeStyle = (...args) => Object.assign({}, ...args.map(v => style2obj(v)));

/**
 * Vue中监听不到Set的更新,所以用数组实现一个Set数据结构，从而支持响应式
 */
class MySet {
  constructor() {
    this.value = [];
  }
  // 判断是否存在元素
  has(v) {
    return this.value.includes(v)
  }
  // 添加元素
  add(v) {
    let index = this.value.indexOf(v);
    if (!~index) this.value.push(v);
    return index
  }
  // 删除元素
  delete(v, i = this.value.indexOf(v)) {
    return !!~i && this.value.splice(i, 1)
  }
  // 多选必选一个
  check(v) {
    const index = this.add(v);
    if (this.size > 1) this.delete(v, index);
  }
  // 多选可不选
  checkToggle(v) {
    this.delete(v, this.add(v));
  }
  // 单选必选一个
  radio(v) {
    if (!this.value.includes(v)) this.value.splice(0, this.value.length, v);
  }
  // 单选可不选
  radioToggle(v) {
    if (this.value.includes(v)) this.value.splice(0, this.value.length);
    else this.value.splice(0, this.value.length, v);
  }
  // 清除所有
  clear() {
    this.value.splice(0, this.value.length);
  }
  // 获取数组长度
  get size() {
    return this.value.length
  }
}

/**
 * 随机获取数组中的元素
 * @param {array} arr 数组
 * @returns {any} 元素
 */
const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * 获取随机整数
 * @param {number} min 最小边界
 * @param {number} max 最大边界
 * @returns {number} 整数
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * 数字转成汉字
 * @param {string|number} num 要转换的数字
 * @returns {string} 汉字数字 支持7位，也就是最大1234567
 * */
const chinesNum = num => {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let unit = ['', '十', '百', '千', '万'];
  num = parseInt(num);
  let getWan = temp => {
    let strArr = temp.toString().split('').reverse();
    let newNum = '';
    let newArr = [];
    strArr.forEach((item, index) => {
      newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index]);
    });
    let numArr = [];
    newArr.forEach((m, n) => {
      if (m !== '零') numArr.push(n);
    });
    if (newArr.length > 1) {
      newArr.forEach((m, n) => {
        if (newArr[newArr.length - 1] === '零') {
          if (n <= numArr[numArr.length - 1]) {
            newNum += m;
          }
        } else {
          newNum += m;
        }
      });
    } else newNum = newArr[0];
    return newNum
  };
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan;
  }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
};

/**
 * 保留decimal位的四舍五入数字
 * @param {number} num 需要转换的数字
 * @param {number} decimal 保留的位数
 * @returns {string} 转换后的数字字符串
 */
const roundNum = (num, decimal = 2) => {
  let b = Math.pow(10, decimal);
  return (Math.round(num * b) / b).toFixed(decimal)
};

/**
 * 浏览器环境中的获取缓存大小方法
 * @returns {string} 缓存大小数字字符串
 */
const getLocalStorageSize = () => {
  let s = window.localStorage;
  let { size } = new Blob(Object.keys(s).map(k => s.getItem(k)));
  if (size < 1024) size = size + 'B';
  else if (size < 1048576) size = (size / 1024).toFixed(2) + 'KB';
  else if (size < 1073741824) size = (size / 1048576).toFixed(2) + 'MB';
  else size = (size / 1073741824).toFixed(2) + 'GB';
  return size
};

/**
 * 随机生成hex
 * @returns {string} 16进制颜色字符串
 */
const randomColor = () => `#${Math.random().toString(16).slice(2, 6)}`;

/**
 * 随机生成rgb
 * @returns {string} rgb字符串不带rgb前缀 (r,g,b)
 */
const rgb = () => {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgb = '(' + r + ',' + g + ',' + b + ')';
  return rgb
};

/**
 * rgb转hex
 * @param {number|string} r
 * @param {number|string} g
 * @param {number|string} b
 * @returns {string} hex
 */
const rgbToHex = (r, g, b) =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

/**
 * 数组去重
 * @param {array} arr
 * @returns {array} 去重后的数组
 */
const uniqueArr = arr => Array.from(new Set(arr));

/**
 * 截取指定字符的前/后字符串
 * @param {string} str 要截取的字符串
 * @param {string} sign 指定分割的字符串
 * @param {{to:'left'|'right';handle:'indexOf'|'lastIndexOf'}} options 配置选项
 * @returns {string} 截取后的字符串
 */
const splitstr = (str, sign, { to = 'left', handle = 'indexOf' } = {}) => {
  const index = str[handle](sign);
  if (!~index) return ''
  let param = [0, index];
  if (to == 'right') param = [index, str.length];
  return str.substring(...param)
};

/**
 * 安全数组，确保链出来的数组不会因undefined中断程序
 * @param {object} origin 源对象
 * @param {string} chain 数据链，一直链到目标数组
 * @returns {array} 返回一个空数组或者目标数组
 */
const safeArr = function (origin, chain) {
  const chainArr = chain.split('.');
  let result = origin;
  for (const key of chainArr) {
    result = result[key];
    if (!(result && typeof result == 'object')) break
  }
  if (!Array.isArray(result)) return []
  return result
};

/**
 * 带颜色标签的console.log
 * @param {string|{label:string;style:string}} opts label的配置
 * @param  {...any} args 要打印的内容
 */
const logs = (opts, ...args) => {
  const defaultStyle = 'color:white;background:green;padding:2px 5px;border-radius:4px';
  if (typeof opts == 'string') console.log(`%c${opts}`, defaultStyle, ...args);
  else if (!opts) console.log(...args);
  else if (typeof opts == 'object') {
    const { label, style } = opts;
    console.log(`%c${label}`, style, ...args);
  }
};

/**
 * 动态设置网页图标
 * @param {string} href 资源路径
 * @param {HTMLLinkElement} link link标签元素
 */
const setLinkIcon = (href, link = document.querySelector('link[rel*="icon"]')) => {
  link.href = href;
};

/**
 * vue插件
 * @property install 安装方法 extend:是否扩展原生js, proto:是否扩展Vue原型链
 */
const vuePlugin = {
  /**
   * 安装方法
   * @param {Vue} Vue Vue构造函数
   * @param {{extend:boolean;proto:boolean}} options 配置选项 extend:是否扩展原生js, proto:是否扩展Vue原型链
   */
  install(Vue, { extend = true, proto = true } = {}) {
    // 原生js扩展
    if (extend) {
      JSON.copy = copy;
      console.logs = logs;
    }
    // 扩展Vue原型链
    if (proto) {
      Vue.prototype.$_safeArr = safeArr;
      Vue.prototype.$_addUnit = addUnit;
    }
  },
};

export { Distance, Enum, MySet, Urlquery, addUnit, arrayToMatrix, capitalize, chinesNum, copy, debounce, distanceUnit, findIndexArr, getLocalStorageSize, getRandomInt, getRandomItem, html2txt, initDebounce, initThrottle, isObj, kebabcase2CamelCase, logs, mergeStyle, pick, rad, randomColor, removeItem, rgb, rgbToHex, roundNum, safeArr, setLinkIcon, sleep, splitstr, style2obj, throttle, types, uniqueArr, vuePlugin };
