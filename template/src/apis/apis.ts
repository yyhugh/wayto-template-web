import API from "./urls";
import HttpClient from "common/http/http-client";
import IHttpResponse from "../common/http/http-response";
import IHttpRequest from "common/http/http-request";
import { ArgumentException } from "uxmid-core";

/**
 * 发送ajax请求
 * @param {any} options 请求参数
 * @param {string} url 请求地址
 * @param {string} method 请求类型
 * @returns {any}
 */
const send = (url: string, options?: IHttpRequest, method: string = "post"): IHttpResponse =>
{
    // 如果未传入url以及参数抛出异常
    if (!url)
    {
        throw new ArgumentException("url is null.");
    }

    // 返回promise实例由用户处理
    return HttpClient.instance[method](
    {
        url,
        ...options
    });
};

/**
 * 接口类
 * @version 1.0.0
 */
export default class Apis
{
    // user
    public login =              (options?: IHttpRequest) => send(API.login, options);                               // 登录接口
    public getVerifyImg =       (options?: IHttpRequest) => send(API.getVerifyImg, options, "get");                 // 登录页请求图形验证码

    // common
    public uploadImage =        (options?: IHttpRequest) => send(API.uploadImage, options);                         // 头像上传接口
}
