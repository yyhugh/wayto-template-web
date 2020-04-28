import IAction from "./action";

/**
 * 表示应用程序的一个模块。
 * @interface
 * @version 1.0.0
 */
export default interface IModule
{
    /**
     * 获取或设置模块ID。
     * @member
     * @returns string
     */
    moduleId: string;

    /**
     * 获取或设置模块编号。
     * @member
     * @returns string
     */
    moduleNo: string;

    /**
     * 获取或设置模块名称。
     * @member
     * @returns string
     */
    name: string;

    /**
     * 获取或设置模块ID。
     * @member
     * @returns string
     */
    parentId: string;
    
    /**
     * 获取或设置子模块。
     * @member
     * @returns Array<IModule>
     */
    children?: Array<IModule>;

    /**
     * 获取或设置操作列表。
     * @member
     * @returns Array<IAction>
     */
    actions?: Array<IAction>;
}
