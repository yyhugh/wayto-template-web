import { Injectable } from "uxmid-core";
import ServiceBase from "./service-base";
import { ICredential, ILoginModel, IFilterModel, IUserProfile } from "src/models";

/**
 * 表示用户相关服务。
 * @class
 * @version 1.0.0
 */
@Injectable()
export default class UserService extends ServiceBase
{
    public async login(model: ILoginModel): Promise<void>
    {
        // 登录之前清空上次的凭证
        this.applicationContext.credential = null;

        const result = await this.apis.login
        ({
            serializeType: "form-data",
            data:
            {
                client_id: "wayto-oauth-client-id",
                client_secret: "wayto-oauth-client-secret",
                grant_type: "password",
                ...model
            }
        });

        const { access_token: credentialId, user }  = result.content;

        const userProfile: IUserProfile =
        {
            id: user.id,
            username: user.userName,
            realname: user.realName,
            mobile: user.mobile,
            orgId: user.orgId,
            filePath: user.filePath
        };

        // 生成凭证实体
        const credential: ICredential =
        {
            userId: user.id,
            credentialId: credentialId,
            user: userProfile
        };

        // 重要: 一定要保存用户凭证至应用上下文中
        this.applicationContext.credential = credential;

        // 更新用户信息至 vuex 中
        this.store.dispatch("user/setProfile", userProfile);
    }
}
