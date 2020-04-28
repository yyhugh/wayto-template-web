import { Type } from "uxmid-core";

export {
    LOADING_STATUS
};

/**
 * 数据加载状态
 * @enum
 * @version 1.0.0
 */
enum LOADING_STATUS
{
    /**
     * 加载中
     * @member
     */
    loading,

    /**
     * 加载完成
     * @member
     */
    finish,

    /**
     * 无数据
     * @member
     */
    nodata
}

Type.setMetadata(LOADING_STATUS,
{
    loading:
        {
            description: "加载中"
        },
    finish:
        {
            description: "加载完成"
        },
    nodata:
        {
            description: "无数据"
        }
});
