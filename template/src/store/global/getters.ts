import { Getter, GetterTree } from "vuex";
import State from "./state";
import { Type } from "uxmid-core";

export function getUserList(state: State): Array<any>
{
    return state.userList;
}

export function getTabList(state: State): Array<any>
{
    // 首先从 vuex 中获取
    let routeList = state.tabList;

    if (routeList.length === 0)
    {
        // 如果 vuex 中没有则尝试从应用程序上下中获取
        let codesText = localStorage.getItem("tabList");

        if (!Type.isEmptyObject(codesText))
        {
            routeList = JSON.parse(codesText);

            // 将用户信息更新至 vuex 中
            state.tabList = routeList;
        }
    }

    return routeList;
}

export function getCurrentTab(state: State): string
{
    // 首先从 vuex 中获取
    let currentTab = state.currentTab;

    if (!currentTab)
    {
        // 如果 vuex 中没有则尝试从应用程序上下中获取
        let codesText = localStorage.getItem("currentTab");

        if (!Type.isEmptyObject(codesText)) {
            currentTab = JSON.parse(codesText);

            // 将用户信息更新至 vuex 中
            state.currentTab = currentTab;
        }
    }

    return currentTab;
}

export default <GetterTree<State, any>>
{
    getUserList,
    getTabList,
    getCurrentTab
};
