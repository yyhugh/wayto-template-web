import { WorkbenchBase, ApplicationContextBase, Broadcast, BroadcastManager, Logger, ConsoleLogHandler } from "uxmid-core";

import ApplicationContext from "./context";
import Workspace from "./workspace";

import Vue from "vue";
import Router from "vue-router";
import routes from "../routes";
import Vuex from "vuex";
import modules from "../store";
import filters from "../common/filters";
import { previewer } from "common/directives";

// 全局配置
import { globalConfig } from "config/index";

// HTTP 客户端
import HttpClient from "common/http/http-client";
import IHttpResponse from "common/http/http-response";
import HttpResponseCode from "common/http/http-response-code";

// 导入广播定义
import broadcasts from "config/broadcasts";

// 导入应用广播
import "../broadcasts";

// 导入系统组件
import components from "uxmid-web";

// 导入应用组件
import MainLayout from "layouts/main.vue";
import GenericLayout from "layouts/generic.vue";

// 导入自定义公共组件
import commonComponents from "components/index";

// 导入第三方组件

<%_ if (options.map === "map") { _%>
// 高德地图组件
import AMap from "flagwind-amap";
<%_ } _%>

<%_ if (options.echarts) { _%>
import echarts from "flagwind-echarts";
<%_ } _%>

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

// 导入全局样式
import "uxmid-web/dist/styles/uxmid.css";
import "iview/dist/styles/iview.css";

<%_ if (options.map === "openlayer") { _%>
import "ol/ol.css";
<%_ } _%>


/**
 * 提供工作台的基本封装。
 * @class
 * @version 1.0.0
 */
export default class Workbench extends WorkbenchBase
{
    private _workspace: Workspace;
    
    /**
     * 获取当前应用的主工作空间。
     * @property
     * @returns Workspace
     */
    public get workspace(): Workspace
    {
        return this._workspace;
    }
    
    /**
     * 初始化工作台的新实例。 
     * @param  {ApplicationContextBase} applicationContext
     */
    public constructor(context: ApplicationContextBase)
    {
        super(context);
    }
    
    /**
     * 当工作台打开时调用。
     * @async
     * @protected
     * @virtual
     * @param  {Array<string>} args
     * @returns void
     */
    protected async onOpen(args: Array<string>): Promise<void>
    {
        let context = this.applicationContext as ApplicationContext;

        // 关闭生产提示
        Vue.config.productionTip = false;

        Vue.config.errorHandler = (err, vm, info) =>
        {
            console.error(err, vm, info);
        };

        Vue.config.warnHandler = (msg, vm, trace) =>
        {
            // `trace` 是组件的继承关系追踪
            console.error(msg, vm, trace);
        };

        // 注册日志处理程序
        Logger.handlers.add(new ConsoleLogHandler());

        // 初始化系统及自定义组件
        this.initializeComponent(context);

        // 初始化第三方组件
        this.initializeCustomComponent(context);
        
        // 初始化路由程序
        this.initializeRouter(context);

        // 初始化状态管理程序
        this.initializeStore(context);

        // 初始化全局混入
        // this.initializeMixins(context);
        
        // 初始化全局指令
        this.initializeDirectives(context);

        // 初始化全局过滤器
        this.initializeFilters(context);

        // 初始化 http 客户端
        this.initializeHttpClient(context);

        // 初始化工作空间
        this._workspace = this.createWorkspace();
    }
    
    /**
     * 创建一个工作空间对象。
     * @override
     * @returns IWorkspace
     */
    protected createWorkspace(): Workspace
    {
        return new Workspace(this);
    }

    /**
     * 初始化全局组件。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeComponent(context: ApplicationContext): void
    {
        // 注册系统组件
        Vue.use(components);
        <%_ if (options.echarts) { _%>
            Vue.component("fw-echarts", echarts);
        <%_ } _%>
        
        // 注册应用组件
        Vue.use(commonComponents);

        // 注册布局母版
        Vue.component("l-generic", GenericLayout);
        Vue.component("l-main", MainLayout);
    }

    /**
     * 初始化注册第三方组件。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeCustomComponent(context: ApplicationContext): void
    {
        <%_ if (options.map === "map") { _%>
        // 初始化高德地图配置
        AMap.init
        ({
            key: globalConfig.aMapKey,
            version: "1.4.9",
            plugins:
            [
                "Autocomplete",
                "PlaceSearch",
                "Scale",
                "OverView",
                "ToolBar",
                "MapType",
                "PolyEditor",
                "CircleEditor",
                "Geocoder",
                "PositionPicker"
            ]
        });

        // 注册高德地图组件
        Vue.use(AMap);
        <%_ } _%>

        dayjs.locale("zh-cn");
        dayjs.extend(relativeTime);
    }
    
    /**
     * 初始化路由程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeRouter(context: ApplicationContext): void
    {
        // 注册路由组件
        Vue.use(Router);
        
        // 初始化路由程序
        let router = new Router({mode: "history", routes});
        
        // 设置路由程序
        context.router = router;
    }
    
    /**
     * 初始化状态管理程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeStore(context: ApplicationContext): void
    {
        // 注册状态管理程序
        Vue.use(Vuex);

        // 初始化状态容器
        let store = new Vuex.Store
        ({
            modules
        });
        
        // 设置状态容器
        context.store = store;
        
        // 添加公共菜单
        // context.store.dispatch("menu/add", { path: "/", items: menus });
    }

    /**
     * 初始化所有全局 Vue 混入。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeMixins(context: ApplicationContext): void
    {
        // 混入全局权限验证
        // Vue.mixin(Authorization);
    }
    
    /**
     * 初始化所有全局 Vue 自定义指令。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeDirectives(context: ApplicationContext): void
    {
        // 全局权限验证指令
        // Vue.directive("permission", permission);
        
        // 图片放大预览
        Vue.directive("previewer", previewer);
        // Vue.directive("picviewer", picviewer);
    }

    /**
     * 初始化所有全局 Vue 过滤器。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeFilters(context: ApplicationContext): void
    {
        Object.keys(filters).forEach(key =>
        {
            Vue.filter(key, filters[key]);
        });
    }

    /**
     * 初始化 HTTP 客户端。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeHttpClient(context: ApplicationContext): void
    {
        HttpClient.instance.handlers.add((code: number, content: IHttpResponse, request) =>
        {
            let broadcast: Broadcast;
            
            switch(code)
            {
                case HttpResponseCode.sessionLost:
                {
                    broadcast = new Broadcast(broadcasts.USER_SESSION_LOST);

                    break;
                }
                case HttpResponseCode.invalidCredential:
                {
                    broadcast = new Broadcast(broadcasts.USER_CREDENTIAL_INVALID);

                    break;
                }
                case HttpResponseCode.unauthorized:
                {
                    broadcast = new Broadcast(broadcasts.USER_UNAUTHORIZED);

                    break;
                }
            }

            if(broadcast)
            {
                BroadcastManager.instance.send(broadcast);
            }
        });
    }
}
