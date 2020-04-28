<template>
    <div class="v-error v-error-404">
        <div class="v-error-content">
            <i-card>
                <p class="v-error-content-title">4<span class="v-error-404-icon"><i-icon type="ios-navigate-outline"></i-icon></span>4</p>
                <p class="v-error-content-message">哎呀...您访问的页面不存在</p>
                <p class="v-error-button-strip">
                    <i-button @click="onBackHomeClick" size="large" type="text">返回首页</i-button>
                    <i-button @click="onBackPrevClick" size="large" type="primary">返回上一页</i-button>
                </p>
            </i-card>
        </div>
    </div>
</template>

<script lang="ts">
import { component, View } from "uxmid-web";

/**
 * 错误 404 视图。
 * @class
 * @version 1.0.0
 */
@component
export default class Error404View extends View
{
    /**
     * 当返回首页按钮点击时调用。
     * @protected
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns void
     */
    protected onBackHomeClick(e: MouseEvent): void
    {
        this.$router.push("home");
    }
    
    /**
     * 当返回上一页按钮点击时调用。
     * @protected
     * @param  {MouseEvent} e 鼠标事件参数。
     * @returns void
     */
    protected onBackPrevClick(e: MouseEvent): void
    {
        this.$router.go(-1);
    }
}
</script>

<style lang="less">
    @import "~styles/views/errors/errors";
</style>
