module.exports = {
    wait,
    waitRanTime,
    ts10,
    ts13,
    getHour,
    getMinute,
    getYear,
    getMonth,
    getDayOfWeek,
    getSecond,
    getDayOfMonth,
    timestampToDate,
    dayjsFormat

}


/**
 * 使用dayjs库格式化当前日期和时间。
 * @param {string} str 日期和时间的格式字符串。
 * @returns {string} 格式化后的当前日期和时间。
 */
function dayjsFormat(str) {
    const dayjs = require('dayjs');
    return dayjs().format(str);
}



/**
 * 休眠指定的秒数 (默认 3 秒)。
 * @param {number} second 休眠的秒数。
 */
async function wait(second = 3) {
    return new Promise((e) => setTimeout(e, second * 1000))
}


/**
 * 随机休眠 10 到 15 秒。
 */
async function waitRanTime(ctx) {
    let ran = Math.floor(Math.random() * (15 - 10 + 1)) + 10
    return new Promise((e) => setTimeout(e, ran * 1000))
}

/**
 * 获取当前时间的10位时间戳。
 * @returns {number} 10位时间戳。
 */
function ts10() {
    return Math.round(new Date().getTime() / 1000)
}

/**
 * 获取当前时间的13位时间戳。
 * @returns {number} 13位时间戳。
 */
function ts13() {
    return Math.round(new Date().getTime())
}

/**
 * 获取当前小时。
 * @returns {number} 当前小时数。
 */
function getHour() {
    return new Date().getHours();
}

/**
 * 获取当前分钟。
 * @returns {number} 当前分钟数。
 */
function getMinute() {
    return new Date().getMinutes();
}

/**
 * 获取当前年份。
 * @returns {number} 当前年份。
 */
function getYear() {
    return new Date().getFullYear();
}

/**
 * 获取当前月份。
 * @param {boolean} [padded=false] - 是否返回带前导零的月份。
 * @returns {string} 当前月份。
 */
function getMonth(padded = false) {
    const monthNumber = new Date().getMonth() + 1;
    return padded ? monthNumber.toString().padStart(2, '0') : String(monthNumber);
}

/**
 * 获取当前日期（周几）。
 * @returns {number} 当前日期（0-6，其中0表示周日）。
 */
function getDayOfWeek() {
    return new Date().getDay();
}

/**
 * 获取当前秒数。
 * @returns {number} 当前秒数。
 */
function getSecond() {
    return new Date().getSeconds();
}

/**
 * 获取当前日期是本月的第几天。
 * @returns {number} 本月的第几天，例如 13, 30。
 */
function getDayOfMonth() {
    return new Date().getDate();
}


/**
 * 将时间戳转换为日期字符串。
 * @param {number} ts 时间戳，可以是10位或13位。
 * @returns {string} 格式为"YYYY-MM-DD HH:mm:ss"的日期字符串。
 */
function timestampToDate(ts) {
    // 如果时间戳是10位，将其转换为毫秒
    ts = ts.toString().length === 13 ? parseInt(ts) : parseInt(ts) * 1000;
    // 创建日期对象，并加上8小时的偏移量以转换为北京时间
    const date = new Date(ts + 8 * 3600 * 1000);
    // 返回格式化后的日期字符串
    return date.toISOString().replace("T", " ").slice(0, 19);
}

