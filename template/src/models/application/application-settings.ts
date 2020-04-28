/**
 * 表示应用程序配置。
 * @interface
 * @version 1.0.0
 */
export default interface IApplicationSettings
{
    /**
     * 获取或设置应用名称。
     * @member
     * @returns string
     */
    name: string;

    /**
     * 获取或设置应用所有者(公司名)。
     * @member
     * @returns string
     */
    owner?: string;
    
    /**
     * 获取或设置应用的版本号。
     * @member
     * @returns string
     */
    version: string;
    
    /**
     * 获取或设置与服务端通讯的密钥。。
     * @member
     * @returns string
     */
    secret: string;

    /**
     * 获取或设置服务器地址。
     * @member
     * @returns string
     */
    serverUrl: string;
    
    /**
     * 获取或设置全局分页大小。
     * @member
     * @returns number
     */
    pageSize: number;
}
