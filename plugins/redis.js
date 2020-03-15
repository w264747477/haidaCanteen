const redis = require('redis');
const config = require('./redis.config').redis

// const client = redis.createClient(config.port, config.url); // 实例redis对象
const client = redis.createClient({host:config.url, port: config.port,no_ready_check:true});
//连接错误处理
client.on("error", err => {
    console.log('redis connect err', err);
});

client.on('connect', () => {
    console.log('redis connect success');
})

//验证redis
client.auth(config.password);

const redisHelper = {};

/**
 * redisHelper setString function
 * @param key
 * @param value
 * @param expire
 */
redisHelper.setString = (key, value, expire) => {
    return new Promise((resolve, reject) => {
        client.set(key, value, function (err, result) {

            if (err) {
                console.log(err);
                reject(err);
            }

            if (!isNaN(expire) && expire > 0) {
                client.expire(key, parseInt(expire));
            }
            resolve(result)
        })
    })
}

/**
 * redisHelper getString function
 * @param key
 */
redisHelper.getString = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, function (err, result) {
            if (err) {
                console.log('错误')
                console.log(err);
                reject(err)
            }
            console.log(result)
            resolve(result)
        });
    })
}

module.exports = redisHelper;
