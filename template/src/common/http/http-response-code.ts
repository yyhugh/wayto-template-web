import { Type } from "uxmid-core";

/**
 * 表示一个 Http请求响应状态码。
 * @enum
 * @version 1.0.0
 */
enum HttpResponseCode
{
    /**
     * 失败。
     * @member
     */
    failure = 500,

    /**
     * 成功。
     * @member
     */
    success = 200,

    /**
     * 成功但是无数据返回
     * @member
     */
    nodata = 204,

    /**
     * 参数无效。
     * @member
     */
    invalidParameter = 400,

    /**
     * 会话丢失。
     * @member
     */
    sessionLost = 401,

    /**
     * 凭证无效。
     * @member
     */
    invalidCredential = 402,

    /**
     * 未授权。
     * @member
     */
    unauthorized = 403,

    /**
     * 签名无效。
     * @member
     */
    invalidSign = 405,
    
    /**
     * 服务器错误。
     * @member
     */
    // serverError = 500,
    
    /**
     * 网络错误。
     * @member
     */
    networkError = 505
}

/*
* 定义枚举元数据。
*/
Type.setMetadata(HttpResponseCode,
{
    failure:
    {
        alias: "操作失败",
        description: "操作失败，请检查并重试。"
    },
    success:
    {
        alias: "操作成功",
        description: "恭喜您，操作成功"
    },
    invalidParameter:
    {
        alias: "参数无效",
        description: "操作失败，请检查各输入项是否正确。"
    },
    sessionLost:
    {
        alias: "会话丢失",
        description: "登录失效，请重新登录。"
    },
    invalidCredential:
    {
        alias: "凭证无效",
        description: "您的账号已在别处登录，请重新登录或联系管理员。"
    },
    // 当前项目中，账号密码错误返回403
    unauthorized:
    // {
    //     alias: "权限错误",
    //     description: "您无权执行该操作，请联系管理员。"
    // },
    {
        alias: "账号密码错误",
        description: "账号或密码错误，请检查重新输入。"
    },
    invalidSign:
    {
        alias: "签名错误",
        description: "签名错误，请重试并联系管理员。"
    },
    serverError:
    {
        alias: "服务器异常",
        description: "抱歉，服务器发生异常，请重试或联系管理员。"
    },
    networkError:
    {
        alias: "通讯错误",
        description: "抱歉，与服务器通讯失败，请重试或联系管理员。"
    }
});

export default HttpResponseCode;
