/*
10-9	第一版完成，改用 request，支持青龙

*/
const encrypt = require("./res/encrypt")
const random = require("./res/random")
const time = require("./res/time")
const tools = require("./res/tools")
const sort = require("./res/sort")
const got = require('got');
const requestPromise = require('request-promise-native');

module.exports = {
    encrypt,
    random,
    time,
    tools,
    sort,
    request_Promise,
    request,
    checkEnv,
    yiyan,
    b64_encode,
    b64_decode,
};


/**
 * 获取并打印一个“一言”。
 * @returns {Promise} 返回一个Promise对象，当“一言”获取成功时解析。
 */
async function yiyan() {
    try {
        const response = await got('https://v1.hitokoto.cn/');
        const data = JSON.parse(response.body);
        // console.log(message);
        return `[一言]: ${data.hitokoto}  by--${data.from}`;
    } catch (error) {
        console.error('获取一言时发生错误:', error);
        return error;
    }
}


async function request(options) {
    debugProxy(options)
    const got = require("got")
    let response, body, res_hd, res
    try {
        if (options.method.toUpperCase() === "GET") {
            delete options.json;
            delete options.body;
            delete options.from;
        }
        if (options.params) {
            options.searchParams = options.params
            delete options.params
        }
        response = await got(options, {
            followRedirect: false,
            https: {rejectUnauthorized: false},
            timeout: 13000,
        })
    } catch (error) {
        response = error.response
        console.error(error)
    }
    if (response) {
        body = response.body
        res_hd = response.headers
        if (body) {
            try {
                res = JSON.parse(body)
            } catch (e) {
                res = body
            }
        }
    }
    return {res_hd, res}
}

async function request_Promise(options) {
    debugProxy(options);
    let response, body, res_hd, res;
    try {
        if (options.params) {
            // request库使用 qs 字符串化参数
            options.qs = options.params;
        }
        // console.log(options);
        response = await requestPromise({
            method: options.method,
            uri: options.url,
            qs: options.qs, // 如果存在的话
            body: options.body, // 如果是POST请求的话
            json: options.json, // 如果需要发送JSON数据的话
            followRedirect: false,
            rejectUnauthorized: false,
            timeout: 13000,
        });
    } catch (error) {
        response = error.response;
        console.error(error);
    }

    if (response) {
        body = response;
        res_hd = response.headers; // 注意：request-promise-native 返回的response已经包含了headers
        if (body) {
            try {
                // 如果response不是JSON格式，这里可能会抛出错误
                res = typeof body === 'string' ? JSON.parse(body) : body;
            } catch (e) {
                res = body;
            }
        }
    }
    return {res_hd, res};
}


function debugProxy(options) {
    const {HttpProxyAgent, HttpsProxyAgent} = require("hpagent")
    let httpProxy = process.env.DEBUG_PROXY
    if (httpProxy) {
        options.https = {
            rejectUnauthorized: false
        }
        let o = {
            keepAlive: true,
            keepAliveMsecs: 1000,
            maxSockets: 256,
            maxFreeSockets: 256,
            scheduling: 'lifo',
            proxy: httpProxy
        }
        options.agent = {
            http: new HttpProxyAgent(o,),
            https: new HttpsProxyAgent(o,)
        }
    }
}

/**
 * 变量检查
 */
async function checkEnv(ck, name) {
    return new Promise((resolve) => {
        let ckArr = [];
        if (ck) {
            if (ck.indexOf("@") !== -1) {
                ck.split("@").forEach((item) => {
                    ckArr.push(item);
                });
            } else if (ck.indexOf("\n") !== -1) {
                ck.split("\n").forEach((item) => {
                    ckArr.push(item);
                });
            } else {
                ckArr.push(ck);
            }
            resolve(ckArr);
        } else {
            console.log();
            console.log(`未填写变量 ${name} ,请仔细阅读脚本说明!`);
        }
    });
}


/**
 * base64 编码
 */
function b64_encode(data) {
    return Buffer.from(data, 'utf-8').toString('base64')
}

/**
 * base64 解码
 */
function b64_decode(data) {
    return Buffer.from(data, 'base64').toString('utf8')
}


