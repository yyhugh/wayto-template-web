import { Type, Broadcast, BroadcastManager } from "uxmid-core";
import { Mutation, MutationTree } from "vuex";
import { ApplicationContext } from "src/application/index";
import { IUserProfile, ICredential } from "models/account";
import State from "./state";

// 导入广播定义
import broadcasts from "config/broadcasts";
import "../../broadcasts";

export function SET_PROFILE(state: State, profile: IUserProfile): void
{
    // 首先将用户信息更新至 vuex 中
    state.profile = profile;
    
    // 其次将用户信息同步更新至应用程序上下文中
    let credential = ApplicationContext.current.credential as ICredential;

    if(!Type.isEmptyObject(credential))
    {
        credential.user = profile;

        // 一定要重新设置凭证，因为凭证会持久至 LocalStorage 中
        ApplicationContext.current.credential = credential;
    }
}

export function LOGOUT(state: State): void
{
    const broadcast = new Broadcast(broadcasts.USER_LOGOUT);

    if(broadcast)
    {
        BroadcastManager.instance.send(broadcast);
    }
}

export function SET_PERMISSIONS(state: State, permissions: Array<any>): void
{
    state.profile = {
        ...state.profile
    };

    // 其次将用户信息同步更新至应用程序上下文中
    let credential = ApplicationContext.current.credential as ICredential;

    if (!Type.isEmptyObject(credential)) {
        credential.user = state.profile;

        // 一定要重新设置凭证，因为凭证会持久至 LocalStorage 中
        ApplicationContext.current.credential = credential;
    }
}

export function SET_AUTHORIZEDCODES(state: State, codes: Array<any>): void
{
    state.authorizedCodes = codes;
    
    if (!Type.isEmptyObject(codes))
    {
        localStorage.setItem("_authorizedCodes_", JSON.stringify(codes));
    }
}

export default <MutationTree<State>>
{
    SET_PROFILE,
    LOGOUT,
    SET_PERMISSIONS,
    SET_AUTHORIZEDCODES
};
