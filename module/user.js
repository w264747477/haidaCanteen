/* jshint esversion: 6 */
// 用户类
class User{
    /**
     * 用户类的构造函数
     * @param {姓名} name 
     * @param {性别} sex 
     * @param {年龄} age 
     */
    constructor(name, sex, age){
        this.name = name;
        this.sex = sex;
        this.age = age;
    }
    // 展示用户信息，类似于toString函数
    showInfo() {
        console.log(`用户的姓名是：${this.name},用户的性别是：${this.sex},用户的年龄是：${this.age}`);
    }
}
// 导出
module.exports = User;
