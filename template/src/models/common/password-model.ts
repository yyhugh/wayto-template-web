/**
 * 表示一个用于修改密码模型的定义。
 * @interface
 * @version 1.0.0
 */
export default interface IPasswordModel
{
    /**
     * 获取或设置原始密码。
     * @member
     * @returns string
     */
    originalPassword: string;
    
    /**
     * 获取或设置当前密码。
     * @member
     * @returns string
     */
    currentPassword: string;
    
    /**
     * 获取或设置确认密码。
     * @member
     * @returns boolean
     */
    confirmPassword: string;
}
