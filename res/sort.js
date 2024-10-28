module.exports = {
    sortByKey,
    joinSortedKeys,
    parseQueryString
}

/**
 * 根据对象的键进行排序，并返回排序后的查询字符串。
 * @param {object} obj 包含键值对的对象。
 * @param {string} sp 分隔符，默认为 '&'。
 * @returns {string} 排序后的查询字符串。
 */
function sortByKey(obj, sp = '&') {
    let queryString = '';
    const keys = Object.keys(obj).sort(); // 获取排序后的键数组
    for (const key of keys) {
        if (obj.hasOwnProperty(key)) {
            if (queryString !== '') {
                queryString += sp;
            }
            queryString += `${key}=${obj[key]}`;
        }
    }
    return queryString;
}

/**
 * 根据传入对象的键进行排序，并返回排序后的键值对字符串。
 * @param {object} obj 包含键值对的对象。
 * @param {string} sp 分隔符，默认为空字符串。
 * @returns {string} 排序后的键值对字符串。
 */
function joinSortedKeys(obj, sp = '') {
    return Object.keys(obj).sort().map(key => key + obj[key]).join(sp);
}

/**
 * 将查询字符串解析为键值对对象。
 * @param {string} str 包含键值对的查询字符串。
 * @param {string} sp 分隔符，默认为 '&'。
 * @returns {object} 解析后的键值对对象。
 */
function parseQueryString(str, sp = '&') {
    const obj = {};
    const pairs = str.split(sp);
    for (const pair of pairs) {
        const [key, value] = pair.split('=');
        obj[key] = value;
    }
    return obj;
}



