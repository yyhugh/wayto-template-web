/**
 * 表示一个组织结构的定义。
 * @interface
 * @version 1.0.0
 */
export default interface IUserStructure
{
    /**
     * 组织结构的名称。
     * @type {string}
     */
    "name": string;

    /**
     * 备注。
     * @type {string}
     */
    "remark": string;

    /**
     * 组织结构的ID。
     * @type {number}
     */
    "departmentId"?: number;

    /**
     * 上级组织结构的ID。
     * @type {number}
     */
    "parentId"?: number;

    /**
     * 上级组织结构的组织ID。
     * @type {number}
     */
    "corporationId"?: number;
}
