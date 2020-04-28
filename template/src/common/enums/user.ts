import { Type } from "uxmid-core";

export
{
    USER_STATUS,
    USER_GENDER
};

/**
 * 表示用户的状态。
 * @enum
 * @version 1.0.0
 */
enum USER_STATUS
{

    /**
     * 禁用
     * @member
     */
    disable,

    /**
     * 启用
     * @member
     */
    enable
}

Type.setMetadata(USER_STATUS,
{
    enable:
    {
        description: "启用"
    },
    disable:
    {
        description: "禁用"
    }
});

/**
 * 表示用户的性别。
 * @enum
 * @version 1.0.0
 */
enum USER_GENDER
{

    /**
     * 女
     * @member
     */
    female,

    /**
     * 男
     * @member
     */
    man
}

Type.setMetadata(USER_GENDER,
{
    female:
    {
        description: "女"
    },
    man:
    {
        description: "男"
    }
});
