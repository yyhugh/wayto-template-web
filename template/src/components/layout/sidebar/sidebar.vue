<template>
    <i-sider v-model="isCollapsed"  collapsible :collapsed-width="72" :width="192" :class="isCollapsed ? 'collapsed' : ''" >
        <div class="layout-sidebar-logo" @click="toHome">
            <i class="logo-img"></i>
            <h1 class="logo-text"></h1>
        </div>
        <i-menu
            class="layout-sidebar-menu"
            width="auto"
            ref="menu"
            :accordion="true"
            :open-names="open"
            :active-name="activeName"
            @on-select="onMenuSelect"
        >
            <i-menu-item v-for="(item, i) in menus" :key="i" :name="item.name">
                <i :class="item.icon"></i>
                <span>{{item.label}}</span>
            </i-menu-item>
        </i-menu>
        <!-- 触发器 BEGIN-->
        <div class="trigger"  slot="trigger" @click="isCollapsed = !isCollapsed">
            <i class="iconfont iconicon_fangk"></i>
        </div>
        <!-- 触发器 END-->
    </i-sider>
</template>

<script lang="ts">
import { component, Component, watch } from "uxmid-web";

/**
 * 表示一个公共侧边栏组件。
 * @class
 * @version 1.0.0
 */
@component
export default class Sidebar extends Component
{
    /**
     * 获取和设置展开当前菜单。
     * @protected
     * @property
     * @returns {boolean}
     */
    protected isCollapsed: boolean = false;

    /**
     * 获取当前需要高亮的菜单路径。
     * @protected
     * @property
     * @returns {string}
     */
    protected get activeName(): string
    {
        let path: string = this.$route.path,
            paths: Array<string> = path.replace(/^\/\//, "").split("/");

        return paths[1];
    }

    /**
     * 获取和设置当前导航的打开窗口。
     * @protected
     * @property
     * @returns {Array<string>}
     */
    protected open: Array<string> = [];

    /**
     * 模块列表
     * @protected
     * @property
     * @returns {Array<any>}
     */
    protected menus: Array<any> =
    [
        {
            name: "consoles",
            label: "工作台",
            icon: "iconfont iconicon_board"
        },
        {
            name: "person",
            label: "人员管理",
            icon: "iconfont iconicon_fangkeguanli"
        },
        {
            name: "patrol",
            label: "巡查管理",
            icon: "iconfont iconicon_xunjianguanli"
        },
        {
            name: "danger",
            label: "隐患管理",
            icon: "iconfont iconicon_yinhuan"
        },
        {
            name: "access",
            label: "学生出入",
            icon: "iconfont iconicon_xuesheng"
        },
        {
            name: "visitor",
            label: "访客管理",
            icon: "iconfont iconicon_fangke"
        },
        {
            name: "emergency",
            label: "安全应急",
            icon: "iconfont iconicon_renwuguanli"
        },
        {
            name: "things",
            label: "安全物联",
            icon: "iconfont iconicon_shebeiguanli"
        },
        {
            name: "knowledge",
            label: "安全知识",
            icon: "iconfont iconicon_anquanzhishi"
        },
        {
            name: "rooms",
            label: "房屋管理",
            icon: "iconfont iconicon_fangwuguanli"
        },
        {
            name: "property",
            label: "资产管理",
            icon: "iconfont iconicon_guoziguanli"
        },
        {
            name: "bus",
            label: "校车管理",
            icon: "iconfont iconicon_xiaoche"
        },
        {
            name: "dorm",
            label: "宿舍管理",
            icon: "iconfont iconicon_sushe"
        },
        {
            name: "activity",
            label: "户外活动",
            icon: "iconfont iconicon_huwai"
        },
        {
            name: "system",
            label: "系统设置",
            icon: "iconfont iconicon_xitongguanli"
        }
    ];

    /**
     * 当路由发生变化的时候操作。
     * @protected
     * @param {any} - to 当前路由实例。
     * @returns {void}
     */
    @watch("$route", {deep: true, immediate: true})
    protected updateOpen(to: any): void
    {
        let path: string = this.$route.path,
            paths: Array<string> = path.replace(/^\/waterleakage\//, "").split("/");

        this.open = [paths[0]];

        this.$nextTick(() => (this.$refs.menu as any).updateOpened());
    }

    /**
     * 当选择菜单项时调用。
     * @protected
     * @param  {string} path 菜单路径。
     * @returns {void}
     */
    protected onMenuSelect(name: string): void
    {
        if(name !== this.$route.name)
        {
            this.$store.dispatch("global/setTabList", []);
            this.$router.push({ name });
        }
    }

    /**
     * 返回首页。
     * @protected
     * @returns {void}
     */
    protected toHome(): void
    {
        this.$router.push("/home");
    }
}
</script>

<style lang="less">
    @import "./sidebar";
</style>
