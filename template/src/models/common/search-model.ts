/**
 * 表示一个查询模型的定义。
 * @interface
 * @version 1.0.0
 */
export default interface ISearchModel
{
    /**
     * 获取或设置当前页码。
     * @member
     * @returns number
     */
    current?: number;

    /**
     * 获取或设置分页大小。
     * @member
     * @returns number
     */
    size?: number;

    // /**
    //  * 搜索条件
    //  * @member
    //  * @returns Array<any>
    //  */
    // filters?: Array<any>;

    // /**
    //  * 排序条件
    //  * @member
    //  * @returns Array<any>
    //  */
    // sortings?: Array<any>;
}
