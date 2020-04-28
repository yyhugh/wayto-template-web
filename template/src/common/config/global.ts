const debug = process.env.NODE_ENV === "development";
const waytoConfig = (<any>window).waytoSetting;

const globalConfig =
{
    // SaaS 服务器地址
    platformServer: waytoConfig.apiServer,

    // 地图apikey
    aMapKey: waytoConfig.aMapKey,

    // 通讯密钥
    secret: "f8e55997-e10d-4b26-9442-6683c556be71",

    // 业务模块前缀
    // schema: waytoConfig.schema,

    // ajax相关配置
    ajaxDebug: debug,
    ajaxResponseType: "json",
    ajaxTimeout: 20000,
    ajaxCustomHeader:
    {
        // "x-json-datetime": "yyyy-MM-dd HH:mm:ss",
        // "x-json-casing": "Camel",
        // "x-json-behaviors": "ignores:default indented"
    },

    pageSize: 15,

    mapCenter: [113.91113, 22.78242]
};

export default globalConfig;
