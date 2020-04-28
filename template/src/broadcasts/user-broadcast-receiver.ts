import { Receivable, BroadcastContext, IBroadcastReceiver } from "uxmid-core";
import Router, { Route } from "vue-router";
import { Store } from "vuex";
import { UserService } from "services/index";
import { ApplicationContext } from "../application";
import broadcasts from "config/broadcasts";

/**
 * 用户广播接收器。
 * @class
 * @version 1.0.0
 */
@Receivable(broadcasts.USER_LOGOUT)
@Receivable(broadcasts.USER_SESSION_LOST)
@Receivable(broadcasts.USER_CREDENTIAL_INVALID)
@Receivable(broadcasts.USER_UNAUTHORIZED)
export default class UserBroadcastReceiver implements IBroadcastReceiver
{
    private _userService: UserService;                      // 用户服务

    /**
     * 获取或设置当前应用的主路由对象。
     * @protected
     * @property
     * @returns Router
     */
    public get router(): Router
    {
        return ApplicationContext.current.router;
    }

    /**
     * 获取应用的 Store 实例。
     * @returns Store
     */
    protected get store(): Store<any>
    {
        return ApplicationContext.current.store;
    }

    /**
     * 获取或设置用户服务实例。
     * @protected
     * @property
     * @returns UserService
     */
    protected get userService(): UserService
    {
        if(!this._userService)
        {
            let serviceProvier = ApplicationContext.current.serviceFactory.default;

            this._userService = serviceProvier.resolve<UserService>(UserService);
        }

        return this._userService;
    }

    /**
     * 当接收到广播时调用的方法。
     * @param  {BroadcastContext} context 广播上下文实例。
     * @returns Promise<void>
     */
    public async receive(context: BroadcastContext): Promise<void>
    {
        switch(context.uri)
        {
            case broadcasts.USER_LOGOUT:
            {
                // 调用服务退出登录
                // await this.userService.logout();
                
                // 跳转至登陆视图
                this.router.push("/login");

                break;
            }
            case broadcasts.USER_SESSION_LOST:
            {
                // 调用服务强制退出
                // await this.userService.exit();

                // 跳转至登陆视图
                this.router.push("/login");

                break;
            }
            case broadcasts.USER_CREDENTIAL_INVALID:
            {
                // 调用服务强制退出
                // await this.userService.exit();

                // 跳转至登陆视图
                this.router.push("/login");

                break;
            }
            case broadcasts.USER_UNAUTHORIZED:
            {
                // 这里账号密码错误会返回403 故不处理
                // 跳转至403视图
                // this.router.push("/403");

                break;
            }
        }
    }
}
