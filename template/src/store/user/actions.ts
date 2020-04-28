import { Store, ActionTree, ActionContext } from "vuex";
import State from "./state";
import { IUserProfile } from "models/account";

export function setProfile(store: ActionContext<State, any>, profile: IUserProfile): void
{
    store.commit("SET_PROFILE", profile);
}

export function logout(store: ActionContext<State, any>): void
{
    store.commit("LOGOUT");
}

export function setPermissions(store: ActionContext<State, any>, permissions: Array<any>): void
{
    store.commit("SET_PERMISSIONS", permissions);
}

export function setAuthorizedCodes(store: ActionContext<State, any>, authorizedCodes: Array<any>): void
{
    store.commit("SET_AUTHORIZEDCODES", authorizedCodes);
}

export default <ActionTree<State, any>>
{
    setProfile,
    setPermissions,
    setAuthorizedCodes,
    logout
};
