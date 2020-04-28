<template>
    <div class="v-error v-error-500">
        <div class="v-error-content">
                <i-card>
                    <p class="v-error-content-title">
                        5<span class="v-error-500-icon"><i-icon type="social-freebsd-devil"></i-icon></span><span class="v-error-500-icon"><i-icon type="social-freebsd-devil"></i-icon></span>
                    </p>
                    <p class="v-error-content-message">抱歉...服务器出小差了</p>
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
 * 错误 500 视图。
 * @class
 * @version 1.0.0
 */
@component
export default class Error500View extends View
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
