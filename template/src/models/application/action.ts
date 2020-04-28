/**
 * 表示应用程序的一个操作。
 * @interface
 * @version 1.0.0
 */
export default interface IAction
{
    /**
     * 获取或设置操作ID。
     * @member
     * @returns string
     */
    actionId: string;
    
    /**
     * 获取或设置模块ID。
     * @member
     * @returns string
     */
    moduleId: string;

    /**
     * 获取或设置操作编号。
     * @member
     * @returns string
     */
    actionNo: string;

    /**
     * 获取或设置操作名称。
     * @member
     * @returns string
     */
    name: string;
}
