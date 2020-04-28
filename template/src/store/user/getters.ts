import { Type } from "uxmid-core";
import { Getter, GetterTree } from "vuex";
import { ApplicationContext } from "src/application/index";
import { IUserProfile, ICredential } from "models/account";
import State from "./state";

export function profile(state: State): IUserProfile
{
    // 首先从 vuex 中获取
    let profile = state.profile;

    if(Type.isEmptyObject(profile))
    {
        // 如果 vuex 中没有则尝试从应用程序上下中获取
        let credential = ApplicationContext.current.credential as ICredential;
        
        if(!Type.isEmptyObject(credential))
        {
            profile = credential.user;

            // 将用户信息更新至 vuex 中
            state.profile = profile;
        }
    }
    
    return profile;
}

export function authorizedCodes(state: State): Array<string> {
    // 首先从 vuex 中获取
    let authorizedCodes = state.authorizedCodes;

    if (Type.isEmptyObject(authorizedCodes)) {
        // 如果 vuex 中没有则尝试从应用程序上下中获取
        let codesText = localStorage.getItem("_authorizedCodes_");

        if (!Type.isEmptyObject(codesText)) {
            authorizedCodes = JSON.parse(codesText);

            // 将用户信息更新至 vuex 中
            state.authorizedCodes = authorizedCodes;
        }
    }

    return authorizedCodes;
}

export default <GetterTree<State, any>>
{
    profile,
    authorizedCodes
};
