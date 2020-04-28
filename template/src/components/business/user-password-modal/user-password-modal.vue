<template>
    <i-modal class="u-user-password-modal" v-model="visible" title="修改密码" width="400" @on-cancel="onCancel">
        <i-form ref="passwordForm" :model="model" :rules="rules" :label-width="100" @keydown.native.enter.prevent>
            <i-form-item label="旧密码" prop="originalPassword">
                <i-input type="password" v-model="model.originalPassword" placeholder="请输入旧密码" :maxlength="16"></i-input>
            </i-form-item>
            <i-form-item label="新密码" prop="currentPassword">
                <i-input type="password" v-model="model.currentPassword" placeholder="请输入新密码" :maxlength="16"></i-input>
            </i-form-item>
            <i-form-item ref="confirmPasswordItem" label="确认新密码" prop="confirmPassword">
                <i-input type="password" v-model="model.confirmPassword" placeholder="请输入确认新密码" :maxlength="16"></i-input>
            </i-form-item>
        </i-form>
        <template slot="footer">
            <i-button class="cancel" @click="onCancel">取消</i-button>
            <i-button :loading="handling" class="submit" type="primary" @click="onSubmit">
                <template v-if="!handling">修改</template>
                <template v-else>修改中...</template>
            </i-button>
        </template>
    </i-modal>
</template>

<script lang="ts">
import { Form } from "@iview/index";
import { component, config, watch, View } from "uxmid-web";
import { IPasswordModel } from "models/index";
import { formatString } from "common/utils/extends";
import { UserService } from "services/index";
import messages from "common/utils/messages";
import patterns from "common/utils/patterns";

/**
 * 表示一个当前登录密码修改模态框。
 * @class
 * @version 1.0.0
 */
@component
export default class UserPasswordModal extends View
{
    private _userService: UserService;                      // 用户服务

    /**
     * 获取或设置一个布尔值，标识当前是否正在保存中。
     * @protected
     * @member
     * @returns boolean
     */
    protected handling: boolean = false;
    
    /**
     * 控制 iview 模态框的开关。
     * @protected
     * @member
     * @returns boolean
     */
    protected visible: boolean = false;
    
    /**
     * 获取或设置组件使用的模型。
     * @protected
     * @member
     * @returns IPasswordModel
     */
    protected model: IPasswordModel =
    {
        originalPassword: "",
        currentPassword: "",
        confirmPassword: ""
    };

    /**
     * 获取或设置组件使用的验证规则。
     * @protected
     * @member
     * @returns any
     */
    protected rules: any =
    {
        originalPassword:
        [
            {
                required: true,
                message: formatString(messages["field.input.required"], ["旧密码"])
            },
            {
                min: 6,
                max: 16,
                message: formatString(messages["field.string.range"], [6, 16])
            }
        ],
        currentPassword:
        [
            {
                required: true,
                message: formatString(messages["field.input.required"], ["新密码"])
            },
            {
                min: 6,
                max: 16,
                message: formatString(messages["field.string.range"], [6, 16])
            }
        ],
        confirmPassword:
        [
            {
                required: true,
                message: formatString(messages["field.input.required"], ["确认新密码"])
            },
            {
                min: 6,
                max: 16,
                message: formatString(messages["field.string.range"], [6, 16])
            }
        ]
    };

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
            this._userService = this.serviceProvier.resolve<UserService>(UserService);
        }

        return this._userService;
    }
    
    /**
     * 获取或设置一个布尔值，表示是否显示模态框。
     * @public
     * @config
     * @returns boolean
     */
    @config({ type: Boolean, default: false })
    public value: boolean;
    
    /**
     * 当 "value" 配置项发生改变时调用。
     * @protected
     * @returns void
     */
    @watch("value", {immediate: true})
    protected onValueChange(value: boolean): void
    {
        this.visible = value;
    }

    /**
     * 当 "visible" 属性发生改变时调用。
     * @protected
     * @returns void
     */
    @watch("visible")
    protected onVisibleChange(visible: boolean): void
    {
        this.$emit("input", visible);
    }
    
    /**
     * 当点击确定按钮时调用。
     * @protected
     * @returns void
     */
    protected onSubmit(): void
    {
        let $form = this.$refs.passwordForm as Form;

        $form.validate(async(isValid: boolean) =>
        {
            if(isValid && !this.handling)
            {
                // 验证确认密码是否与密码匹配
                if(this.model.currentPassword !== this.model.confirmPassword)
                {
                    let $confirmPasswordItem = this.$refs.confirmPasswordItem as any;
                    $confirmPasswordItem.validateMessage = messages["password.different"];
                    $confirmPasswordItem.validateState = "error";

                    return;
                }

                // 防止重复点击
                this.handling = true;

                try
                {
                    // 调用服务进行密码修改
                    await this.userService.updatePassword(this.model.originalPassword, this.model.confirmPassword);

                    // 提示修改成功
                    this.$message.success(messages["password.update.success"]);
                    
                    // 关闭模态框
                    this.onCancel();
                }
                catch(error)
                {
                    this.$message.error(error.message);
                }
                finally
                {
                    this.handling = false;
                }
            }
        });
    }

    /**
     * 当点击取消按钮时调用。
     * @protected
     * @returns void
     */
    protected onCancel(): void
    {
        this.visible = false;

        setTimeout(() =>
        {
            let $form = this.$refs.passwordForm as Form;

            $form.resetFields();

        }, 300);
    }
}
</script>

<style lang="less">
    @import "./style.less";
</style>
