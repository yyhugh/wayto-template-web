import { Store, ActionTree, ActionContext } from "vuex";
import State from "./state";
import { ApplicationContext } from "src/application";

export async function setTabList(store: ActionContext<State, any>, tabList: Array<any> = []): Promise<void>
{
    store.commit("SET_TABLIST", tabList);
}

export function addTab(store: ActionContext<State, any>, tabInfo: any): void
{
    store.commit("ADD_TAB", tabInfo);
    store.commit("SET_CURRENT_TAB", tabInfo.name);
}

export function setCurrentTab(store: ActionContext<State, any>, tabInfo: any): void
{
    store.commit("SET_CURRENT_TAB", tabInfo.name);
}

export default <ActionTree<State, any>>
{
    setTabList,
    addTab,
    setCurrentTab
};
