/**
 * 表示一个登录模型的定义。
 * @interface
 * @version 1.0.0
 */
export default interface ILoginModel
{
    /**
     * 获取或设置用户名。
     * @member
     * @returns string
     */
    username: string;
    
    /**
     * 获取或设置密码。
     * @member
     * @returns string
     */
    password: string;

    /**
     * 模块。
     * @member
     * @returns string
     */
    namespace?: string;
    
    /**
     * 获取或设置是否记住密码。
     * @member
     * @returns boolean
     */
    rememberPassword?: boolean;
}
