/**
 * 全局配置
 * @version 1.0.0
 */

window.waytoSetting = {};

Object.defineProperties(window.waytoSetting,
{
    // API url
    apiServer:
    {
        value: "",
        writable: false,            // 不可改写值
        configurable: false         // 不能重新定义配置
    },
    // 地图apikey
    aMapKey:
    {
        value: "d1df37dc019083f3fa1a068587b56658", // 地图
        writable: false,
        configurable: false
    }
});
