<template>
    <div class="user-info-page">
        <template v-for="(item, index) in labels">
            <h3 class="user-info-title" :key="`title${index}`">{{item.title}}</h3>
            <ul class="user-info-list" :class="clomuns > 1 ? `clomuns-${clomuns}` : '' " :key="`list${index}`">
                <li class="user-info-item" v-for="(value, key) in item.data" :class="value.class" :style="value.style" :data-style="value.style" :key="index + '' + key ">
                    <label class="user-info-label" :style="{width: labelWidth, minWidth: labelWidth}" v-show="value.label">{{value.label}}</label>
                    <span class="user-info-text" v-if="value.value && !value.render">{{values[value.value]}}</span>
                    <template v-else-if="value.render && value.label">
                        <span class="user-info-text">
                            <render-cell :render="value.render" :row="values"></render-cell>
                        </span>
                    </template>
                    <template v-else-if="value.render">
                        <render-cell :render="value.render" :row="values"></render-cell>
                    </template>
                </li>
            </ul>
        </template>
    </div>
</template>

<script lang="ts">
import { component, View, config } from "uxmid-web";

@component
export default class InfoPanel extends View
{
    /**
     * 是否显示添加用户
     * @config
     * @protected
     */
    @config({type: Array})
    public labels: any[];

    /**
     * 是否显示添加用户
     * @config
     * @protected
     */
    @config()
    public values: any;

    /**
     * label的宽度
     * @config
     * @protected
     */
    @config()
    public labelWidth: "string";

    /**
     * 详细信息分成的列数
     * @config
     * @protected
     */
    @config({default: 1})
    public clomuns: number;
}
</script>

<style lang="less">
    @import "./style";
</style>
