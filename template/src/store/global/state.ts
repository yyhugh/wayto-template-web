import { Type, InvalidOperationException } from "uxmid-core";

export default class State
{
    /**
     * 获取或设置当前登录用户的信息。
     * @member
     * @returns Array<any>
     */
    public userList: Array<any> = [];

    /**
     * 获取或设置路由菜单信息
     * @member
     * @returns Array<any>
     */
    public tabList: Array<any> = [];

    /**
     * 当前选中tab
     * @member
     * @returns string
     */
    public currentTab: string = "";
}
