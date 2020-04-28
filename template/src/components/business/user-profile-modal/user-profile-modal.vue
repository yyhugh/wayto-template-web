<template>
    <i-modal class="u-user-profile-modal" v-model="visible" title="资料维护" width="600" :mask-closable="false" @on-visible-change="onDisplay" @on-cancel="onCancel">
        <div class="u-user-profile-modal-avatar">
            <!-- <i-avatar v-if="!!model.avatar" :src="model.avatar"></i-avatar> -->
            <label class="avatar-upload-label" for="avatar-upload">
                <div v-if="!!model.avatar" class="u-user-avatar" :style="{backgroundImage: `url(${model.avatar || require('assets/camera.png')  | urlTimetamp})`}">
                </div>
                <i-avatar v-else>{{surname}}</i-avatar>
                <input id="avatar-upload" type="file" class="avatar-upload" @change="onAvatarChange" accept="image/*" />
            </label>
        </div>
        <div class="u-user-profile-modal-profile">
            <i-form ref="profileForm" :model="model" :rules="rules" :label-width="80" @keydown.native.enter.prevent>
                <i-form-item label="账 号">
                    <span>{{model.name}}</span>
                </i-form-item>

                <i-form-item label="姓 名" prop="fullName">
                    <i-input type="text" v-model="model.fullName" placeholder="请输入姓名" :maxlength="20"></i-input>
                </i-form-item>
                
                <i-form-item label="性 别" prop="gender">
                    <i-radio-group v-model="model.gender">
                        <i-radio v-for="(item, index) in genders" :key="index" :label="item.value">{{item.description}}</i-radio>
                    </i-radio-group>
                </i-form-item>
                
                <i-form-item label="电 话" prop="mobilePhone">
                    <i-input type="text" v-model="model.mobilePhone" placeholder="请输入手机号码" :maxlength="11"></i-input>
                </i-form-item>
                
                <i-form-item label="出生年月" prop="birthdate">
                    <i-date-picker type="date" v-model="model.birthdate" placeholder="请选择出生日期"></i-date-picker>
                </i-form-item>

                <i-form-item label="备 注" prop="description">
                    <i-input type="textarea" v-model="model.description" placeholder="请输入备注" :maxlength="300"></i-input>
                </i-form-item>
            </i-form>
        </div>
        <template slot="footer">
            <i-button class="cancel" @click="onCancel">取消</i-button>
            <i-button :loading="handling" class="submit" type="primary" @click="onSubmit">
                <template v-if="!handling">保存</template>
                <template v-else>保存中...</template>
            </i-button>
        </template>

        <i-modal class="profile-avatar-crop" v-model="isShowCrop" width="700" title="图片裁剪">
            <u-crop-image class="profile-avatar-cropper" ref="avatarCropper" @on-cropped="onCropEnd"></u-crop-image>
            <template slot="footer">
                <i-button @click="isShowCrop = false">取消</i-button>
                <i-button type="primary" @click="onCropperSubmit">确定</i-button>
            </template>
        </i-modal>
    </i-modal>
</template>

<style lang="less">
    .profile-avatar-crop .ivu-modal-wrap
    {
        z-index: 1002;
    }
    .profile-avatar-crop
    {
        .profile-avatar-cropper
        {
            max-height: 400px;
            overflow: hidden;
        }
    }

</style>


<script lang="ts">
import { Form } from "@iview/index";
import { EnumEntry, EnumUtils } from "uxmid-core";
import { component, config, watch, View } from "uxmid-web";
import { IUserProfile } from "models/index";
import { USER_GENDER } from "enums";
import { formatString } from "common/utils/extends";
import { UserService, FileService } from "services/index";
import { ApplicationContext } from "src/application/index";

import messages from "common/utils/messages";
import patterns from "common/utils/patterns";

/**
 * 表示一个当前登录用户资料修改模态框。
 * @class
 * @version 1.0.0
 */
@component
export default class UserProfileModal extends View
{
    private _userService: UserService;                      // 用户服务
    private _fileService: FileService;                      // 文件服务

    /**
     * 获取或设置文件服务实例。
     * @protected
     * @property
     * @returns FileService
     */
    protected get fileService(): FileService
    {
        if(!this._fileService)
        {
            this._fileService = this.serviceProvier.resolve<FileService>(FileService);
        }

        return this._fileService;
    }

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
     * 获取或设置显示裁剪框。
     * @protected
     * @member
     * @returns boolean
     */
    protected isShowCrop: boolean = false;

    /**
     * 获取或设置组件使用的模型。
     * @protected
     * @member
     * @returns IUserProfile
     */
    protected model: IUserProfile =
    {
        name: "",
        gender: 1,
        userId: 0,
        fullName: ""
    };

    /**
     * 获取或设置组件使用的验证规则。
     * @protected
     * @member
     * @returns any
     */
    protected rules: any =
    {
        fullName:
        [
            {
                required: true,
                message: formatString(messages["field.input.required"], ["姓名"])
            },
            {
                max: 20,
                message: formatString(messages["field.string.max"], [20])
            }
        ],
        gender:
        [
            {
                required: true,
                message: formatString(messages["field.select.required"], ["性别"])
            }
        ],
        mobilePhone:
        [
            {
                required: true,
                pattern: patterns["mobile"],
                message: formatString(messages["field.invalid"], ["手机号"]),
                transform: (value: string) =>
                {
                    if(value)
                    {
                        return value.toString().trim();
                    }

                    return value;
                }
            },
            {
                max: 11,
                message: formatString(messages["field.string.max"], [11])
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
     * 获取供用户选择的性别枚举数组。
     * @protected
     * @property
     * @returns EnumEntry[]
     */
    protected get genders(): Array<EnumEntry>
    {
        return EnumUtils.getEntries(USER_GENDER);
    }

    /**
     * 获取当前用户的信息。
     * @protected
     * @property
     * @returns IUserProfile
     */
    protected get user(): IUserProfile
    {
        return this.$store.getters["user/profile"];
    }

    /**
     * 获取用户的姓氏。
     * @protected
     * @property
     * @returns string
     */
    protected get surname(): string
    {
        // console.log(this.user);
        return this.user.realname && this.user.realname.substring(0, 1);
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
     * 创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected created(): void
    {
        // 手动触发 value 配置项变动
        this.onValueChange(this.value);
    }
    
    /**
     * 当 "value" 配置项发生改变时调用。
     * @protected
     * @returns void
     */
    @watch("value")
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
     * 当 "user" 属性发生改变时调用。
     * @protected
     * @returns void
     */
    @watch("user")
    protected onUserChange(user: IUserProfile): void
    {
        // 注意： 这里特意做了一个拷贝，防止数据串改
        this.model = Object.assign({}, this.user);
    }

    /**
     * 图片本地载入之后
     * @protected
     * @returns void
     */
    protected onAvatarChange(e)
    {
        // 显示裁剪框
        this.isShowCrop = true;

        // 将file文件流转换为blob对象
        let cropperImgUrl = URL.createObjectURL(e.target.files[0]);

        let cropper: any = this.$refs.avatarCropper;
        console.log("cropper",cropper)
        cropper.startCropper(cropperImgUrl);

        // 清空input值
        e.target.value = null;
    }

    /**
     * 确认裁剪
     * @protected
     * @returns void
     */
    protected onCropperSubmit(): void
    {
        this.isShowCrop = false;

        let cropper: any = this.$refs.avatarCropper;

        cropper.correctCropper();
    }

    /**
     * 裁剪完成上传文件
     * @protected
     * @returns Promise
     */
    protected async onCropEnd(data: any): Promise<void>
    {
        console.log(data)
        let options =
        {
            ImageFileName: data.filename,
            ImageFileStream: data.blob
        };

        try
        {
            let { content } = await this.fileService.uploadAvatar(+ApplicationContext.current.credential.userId, options);
            console.log(content);
            this.model.avatar = content.url;
        }
        catch (error)
        {
            this.$message.error(error.message);
        }
    }

    /**
     * 当模态框呈现时调用。
     * @protected
     * @returns void
     */
    protected onDisplay(visible: boolean): void
    {
        if(visible === true)
        {
            this.onUserChange(this.user);
        }
    }

    /**
     * 当点击确定按钮时调用。
     * @protected
     * @returns void
     */
    protected onSubmit(): void
    {
        let $form = this.$refs.profileForm as Form;

        $form.validate(async(isValid: boolean) =>
        {
            if(isValid && !this.handling)
            {
                // 防止重复点击
                this.handling = true;

                try
                {
                    // 调用服务进行资料修改
                    await this.userService.updateUserProfile(this.model);

                    // 提示修改成功
                    this.$message.success(messages["userinfo.update.success"]);
                    
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
            let $form = this.$refs.profileForm as Form;

            $form.resetFields();

            // this.model.avatarDBUrl = "";
        }, 300);
    }
}
</script>

<style lang="less">
    @import "./style.less";
</style>
