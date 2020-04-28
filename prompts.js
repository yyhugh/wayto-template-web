module.exports =
[
    {
        name: "chineseName",
        type: "string",
        validate: function(input)
        {
            var done = this.async();

            if (!input || input && input.trim() === '')
            {
                // Pass the return value in the done callback
                done('请输入项目中文名称');
                return;
            }

            done(null, true);
        },
        message: "请输入项目中文名称"
    },
    {
        name: "author",
        type: "string",
        message: "请输入author"
    },
    {
        name: "echarts",
        type: "confirm",
        message: "是否使用echarts",
        default: false
    },
    {
        name: "map",
        type: "list",
        message: "是否使用地图插件",
        choices:
        [
            { name: "amap", value: "amap" },
            { name: "openlayer", value: "openlayer" },
            { name: "不使用", value: "none" },
        ]
    },
    {
        name: "aliyuOSS",
        type: "confirm",
        message: "是否静态资源上传阿里云？",
        default: true
    },
    {
        name: "surportIE",
        type: "confirm",
        message: "是否需要支持IE？",
        default: false
    }
];
