module.exports = {
    string,
    element,
    int_range,
    uuid,
    ua_ios
}

/**
 * 生成随机字符串。
 * @param {number} len 字符串长度。
 * @param {number} [type=1] 字符类型：0 - 数字和大写字母；1 - 数字和小写字母；2 - 纯数字；3 - 数字、小写字母和大写字母。
 * @returns {string} 生成的随机字符串。
 */
function string(len, type = 1) {
    // 定义字符集
    const charSets = [
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', // 数字 + 大写字母
        '0123456789abcdefghijklmnopqrstuvwxyz',  // 数字 + 小写字母
        '0123456789',                             // 纯数字
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' // 数字 + 小写字母 + 大写字母
    ];

    // 选择字符集
    const selectedChars = charSets[type] || charSets[1]; // 默认选择小写字母 + 数字
    let randomString = '';

    // 生成随机字符串
    for (let i = 0; i < len; i++) {
        randomString += selectedChars.charAt(Math.floor(Math.random() * selectedChars.length));
    }

    return randomString;
}


/**
 * 生成UUID。
 * @param {number} [len=32] 字符串长度。
 * @param {number} [type=1] 分隔符类型：1 - 使用短横线分隔；2 - 使用下划线分隔。
 * @returns {string} 生成的UUID。
 */
function uuid(len = 32, type = 1) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    // 生成随机字符串
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        str += chars.charAt(randomIndex);
    }
    // 根据type添加分隔符
    if (type == 1) {
        // 添加短横线分隔符
        str = str.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
    } else if (type == 2) {
        // 添加下划线分隔符
        str = str.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1_$2_$3_$4_$5');
    }
    return str;
}


/**
 * 生成模拟的iPhone User-Agent字符串。
 * @returns {string} 模拟的User-Agent字符串。
 */
function ua_ios() {
    // 生成随机iOS版本号
    function getRandomiOSVersion() {
        return `${Math.floor(Math.random() * 14) + 1}_${Math.floor(Math.random() * 10)}`;
    }

    // 生成随机状态栏高度
    function getRandomStatusBarHeight() {
        return `${Math.floor(Math.random() * 100) + 20}`;
    }

    // 构建User-Agent字符串
    return `Mozilla/5.0 (iPhone; CPU iPhone OS ${getRandomiOSVersion()} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 xinhuamm DV/2 themeColor/#FFFFFF statusBarHeight/${getRandomStatusBarHeight()}`
}


/**
 * 从数组中随机选择一个元素。
 * @param {Array} arr 输入的数组。
 * @returns {*|undefined} 如果数组不为空，返回随机选中的元素；如果数组为空或输入不是数组，返回undefined。
 */
function element(arr) {
    // 如果输入不是数组或者数组为空，返回 undefined
    if (!Array.isArray(arr) || arr.length === 0) {
        return undefined;
    }
    // 生成随机索引
    const randomIndex = Math.floor(Math.random() * arr.length);
    // 返回随机选中的元素
    return arr[randomIndex];
}



/**
 * 生成一个在指定范围内的随机整数。
 * @param {number} [min=1] 最小值。
 * @param {number} [max=10] 最大值。
 * @returns {number} 在min和max之间的随机整数。
 */
function int_range(min = 1, max = 10) {
    // 向上取整，确保包含最小值
    min = Math.ceil(min);
    // 向下取整，确保包含最大值
    max = Math.floor(max);
    // 生成在min和max之间的随机整数
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

