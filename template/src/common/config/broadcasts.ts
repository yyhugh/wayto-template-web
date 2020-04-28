/**
 * 全局广播定义。
 * @config
 */
const broadcasts =
{
    /**
     * 用户登录。
     * @member
     */
    USER_LOGIN: "user://login",

    /**
     * 获取登录用户信息。
     * @member
     */
    USER_GET_INFO: "user://user.profile.get",

    /**
     * 用户会话丢失。
     * @member
     */
    USER_SESSION_LOST: "user://session.lost",

    /**
     * 用户安全凭证无效。
     * @member
     */
    USER_CREDENTIAL_INVALID: "user://credential.invalid",
    
    /**
     * 用户未授权访问。
     * @member
     */
    USER_UNAUTHORIZED: "user://unauthorized",
    
    /**
     * 用户退出。
     * @member
     */
    USER_LOGOUT: "user://logout"
};

export default broadcasts;
