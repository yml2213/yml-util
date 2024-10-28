module.exports = {
    myCookie,
}

/**
 * 传入 set-cookie 返回一行 cookie
 * @param cookieArray set-cookie数据
 */

function myCookie(cookieArray) {
    const extractedCookies = cookieArray.map(cookie => cookie.split(';')[0]);
    return extractedCookies.join(';') + ';';
}

