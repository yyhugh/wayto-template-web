<template>
    <div class="v-temporary">
        <u-page-list>
            <router-view/>
        </u-page-list>
    </div>
</template>

<script lang="ts">
import { component, View } from "uxmid-web";

@component
export default class PropertyManage extends View
{
}
</script>
<style lang="less">
.v-temporary
{
    height: 100%;
}
</style>
