import { Type, ArgumentException, InvalidOperationException } from "uxmid-core";
import { Mutation, MutationTree } from "vuex";
import State from "./state";

export function SET_USERLIST(state: State, users: Array<any>): void
{
    state.userList = users;
}

export function SET_TABLIST(state: State, tabList: Array<any>): void
{
    state.tabList = tabList;
    
    if (!Type.isEmptyObject(tabList))
    {
        localStorage.setItem("tabList", JSON.stringify(tabList));
    }
}

export function ADD_TAB(state: State, tabInfo: any): void
{
    let selectIndex = -1;
    state.tabList.forEach((item, index) =>
    {
        if(item.name === tabInfo.name)
        {
            selectIndex = index;
        }
    });
    
    if(selectIndex === -1)
    {
        state.tabList.push(tabInfo);
    }
    else
    {
        state.tabList.splice(selectIndex,1,tabInfo);
    }

    if (!Type.isEmptyObject(state.tabList))
    {
        localStorage.setItem("tabList", JSON.stringify(state.tabList));
    }
}

export function SET_CURRENT_TAB(state: State, currentTab: any): void
{
    state.currentTab = currentTab;

    if (currentTab)
    {
        localStorage.setItem("currentTab", JSON.stringify(currentTab));
    }
}

export default <MutationTree<State>>
{
    SET_USERLIST,
    SET_TABLIST,
    ADD_TAB,
    SET_CURRENT_TAB
};
