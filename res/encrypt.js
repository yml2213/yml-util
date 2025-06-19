module.exports = {
    MD5,
    SHA256,
    SHA1,
    AES,
    DES,
    RSA,
    RSADecrypt,
    BASE64Encode,
    BASE64Decode,
    HMACSHA256,
    HMACMD5,
    SHA256withRSA

}
const CryptoJS = require("crypto-js")
const NodeRSA = require("node-rsa")

/**
 * 对内容进行SHA256哈希，然后使用RSA私钥进行签名。
 * @param {string} content - 要签名的内容。
 * @param {string} private_key - RSA私钥。
 * @returns {Promise<string>} 返回签名的Base64 URL Safe编码。
 */
function SHA256withRSA(content, private_key) {
    const rs = require('jsrsasign')
    const key = rs.KEYUTIL.getKey(private_key)
    const signature = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA" })
    signature.init(key)
    signature.updateString(content)
    const originSign = signature.sign()
    return rs.hextob64u(originSign)
}


/**
 * 对字符串进行MD5加密。
 * @param {string} str - 要加密的原始字符串。
 * @param {boolean} [isUp=false] - 是否返回大写密文，默认返回小写。
 * @param {number} [num=32] - 输出密文的位数，默认为32位。
 * @returns {string} - 返回加密后的字符串。
 */
function MD5(str, isUp = false, num = 32) {
    let s = CryptoJS.MD5(str).toString()
    // console.log(CryptoJS)
    if (isUp) s = s.toUpperCase()
    if (num === 32) {
        return s
    } else if (num === 16) {
        return s.substring(8, 24)
    }
    return s
}


/**
 * 使用CryptoJS库计算给定数据的SHA256哈希值。
 * @param {string} data - 要计算哈希值的原始数据。
 * @returns {string} - 返回计算得到的SHA256哈希值的字符串表示。
 */
function SHA256(data) {
    // 使用 CryptoJS 库的 SHA256 函数计算数据的哈希值
    const hash = CryptoJS.SHA256(data)
    // 将哈希值转换为字符串表示
    return hash.toString()
}

/**
 * 使用CryptoJS库计算给定数据的HMAC-SHA256哈希值。
 * @param {string} key - 用于HMAC计算的密钥。
 * @param {string} data - 要计算哈希值的数据。
 * @returns {string} - 返回计算得到的HMAC-SHA256哈希值的字符串表示。
 */
function HMACSHA256(key, data) {
    // 使用 CryptoJS 库的 HMAC 函数计算 HMAC-SHA256
    const hash = CryptoJS.HmacSHA256(data, key)
    // 将哈希值转换为字符串表示
    return hash.toString()
}

/**
 * 使用CryptoJS库计算给定数据的HMAC-MD5哈希值。
 * @param {string} key - 用于HMAC计算的密钥。
 * @param {string} data - 要计算哈希值的数据。
 * @returns {string} - 返回计算得到的HMAC-MD5哈希值的字符串表示。
 */
function HMACMD5(key, data) {
    // 使用 CryptoJS 库的 HMAC 函数计算 HMAC-MD5
    const hash = CryptoJS.HmacMD5(data, key)
    // 将哈希值转换为字符串表示
    return hash.toString()
}


/**
 * 使用 CryptoJS 库的 SHA1 函数计算数据的 SHA1 哈希值。
 * @param {string} data - 要计算哈希值的数据。
 * @returns {string} - 返回计算得到的 SHA1 哈希值的字符串表示。
 */
function SHA1(data) {
    // 使用 CryptoJS 库的 SHA256 函数计算数据的哈希值
    const hash = CryptoJS.SHA1(data)
    // 将哈希值转换为字符串表示
    return hash.toString()
}


/**
 * RSA 加密 （node-rsa）
 * @param {string} str 加密内容
 * @param {string} key rsa 公钥
 * @param {string} type 返回数据类型 base64||hex  默认base64
 * @returns  string  base64 格式加密结果
 */
function RSA(str, key, type = 'base64') {
    const node_rsa = new NodeRSA(key, 'public', {
        encryptionScheme: 'pkcs1'
    })
    return node_rsa.encrypt(str, type, 'utf8')
}

/**
 * RSA 解密 （node-rsa）
 * @param {string} encryptedStr 加密内容
 * @param {string} key rsa 私钥
 * @returns string 解密结果
 */
function RSADecrypt(encryptedStr, key) {
    const node_rsa = new NodeRSA(key, { encryptionScheme: 'pkcs1' })
    return node_rsa.decrypt(encryptedStr, 'utf8')
}


/**
 * BASE64 编码
 * @param {string} str 编码内容
 * @returns {string} 编码结果
 */
function BASE64Encode(str) {
    return Buffer.from(str, 'utf-8').toString('base64')
}

/**
 * BASE64 解码
 * @param {string} str 解码内容
 * @returns {string} 解码结果 utf8
 */
function BASE64Decode(str) {
    return Buffer.from(str, 'base64').toString('utf8')
}



/**
 * 使用 CryptoJS 库进行 AES 加密或解密
 * @param {string} str 待加密或解密的字符串
 * @param {string} mode 加密模式，可以是 CBC/ECB/CTR/CFB/OFB
 * @param {string} key 使用的密钥
 * @param {string} [iv] 使用的初始化向量（IV），ECB 模式不需要 IV
 * @param {string} [padding] 填充方式，默认为 Pkcs7。可选 Pkcs5 / NoPadding / ZeroPadding
 * @param {string} [type] 操作类型，默认为加密。可选 encrypt | decrypt
 * @param {string} [outputType] 输出类型，默认为 Base64。可选 b64 | hex
 * @returns {string} 加密或解密后的字符串
 */
function AES(str, mode, key, iv, padding = 'Pkcs7', type = 'encrypt', outputType = 'b64') {
    // 处理密钥和IV
    const keyWord = CryptoJS.enc.Utf8.parse(key)
    const ivWord = CryptoJS.enc.Utf8.parse(iv)

    // 设置选项
    const options = {
        iv: ivWord,
        mode: CryptoJS.mode[mode.toUpperCase()],
        padding: CryptoJS.pad[padding]
    }

    // 根据操作类型处理
    if (type === 'decrypt') {
        // 解密操作
        const decrypted = CryptoJS.AES.decrypt(str, keyWord, options)
        return decrypted.toString(CryptoJS.enc.Utf8)
    } else {
        // 加密操作
        const encrypted = CryptoJS.AES.encrypt(str, keyWord, options)

        // 根据输出类型返回结果
        if (outputType === 'hex') {
            return encrypted.ciphertext.toString(CryptoJS.enc.Hex)
        } else {
            return encrypted.toString()  // 默认返回Base64格式
        }
    }
}


/**
 * DES 加密（crypto-js）
 * @param {string} str 待加密字符串
 * @param {string} mode 加密模式    CBC/ECB/CTR/CFB/OFB
 * @param {string} key 使用的 key
 * @param {string} [iv] 使用的 iv（ECB 不需要 iv）
 * @param {string} [padding] 填充方式（默认为 Pkcs7） Pkcs7=Pkcs5/NoPadding/ZeroPadding/
 * @returns {string} 格式加密结果
 */
function DES(str, mode, key, iv, padding = 'Pkcs7') {
    let key_word = CryptoJS.enc.Utf8.parse(key)
    let password = CryptoJS.enc.Utf8.parse(str)
    let mode_up = mode.toUpperCase()
    let options = {
        mode: CryptoJS.mode[mode_up]
    }
    if (mode !== 'ECB') {
        options.iv = CryptoJS.enc.Utf8.parse(iv)
    }
    if (padding) {
        options.padding = CryptoJS.pad[padding]
    }
    let encrypted = CryptoJS.DES.encrypt(password, key_word, options)
    return encrypted.toString()
}
