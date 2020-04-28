import uxmid from "uxmid-core";
import { IUserProfile } from "models/account";

export default class State
{
    /**
     * 获取或设置当前登录用户的信息。
     * @member
     * @returns IUserProfile
     */
    public profile: IUserProfile = null;
    
    /**
     * 获取或设置当前登录用户的权限信息。
     * @member
     * @returns {Array<any>}
     */
    public authorizedCodes: Array<any> = null;
}
