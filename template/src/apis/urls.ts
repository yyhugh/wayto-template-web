import { globalConfig } from "config/index";

const apiUrl = globalConfig.platformServer;

export default
{
    // user
    login:                      `${apiUrl}/oauth/token`,                                            // 登录
    getVerifyImg:               `${apiUrl}/free/getVerifyImg`,                                      // 登录页请求图形验证码

    // common
    uploadImage:                `${apiUrl}/upload/img`,                                             // 上传图片
};
