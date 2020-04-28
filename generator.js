const fs = require("fs");

module.exports = (api, options, rootOptions) =>
{
    // 安装一些基础公共库以及项目内部库, 这里声明的会被合并到package.json，在preset.json里面也可以声明依赖，但是那边的都会放到 dependencies
    api.extendPackage({
        scripts:
        {
            "lint": "vue-cli-service lint",
            "dev": "vue-cli-service serve",
            "dll:base": "webpack -p --progress --config ./webpack.dll.base.conf.ts",
            "dll:other": "webpack -p --progress --config ./webpack.dll.conf.ts",
            "dll": "npm run dll:base & npm run dll:other",
            "modern": "vue-cli-service build --modern"
        },
        dependencies:
        {
            "axios": "^0.18.0",
            "cropperjs": "^1.5.1",
            "dayjs": "^1.8.14",
            "md5": "^2.2.1",
            "uxmid-core": "^1.0.1",
            "uxmid-web": "^1.0.0",
            "view-design": "^4.2.0",
            "viewerjs": "^1.3.3"
        },
        devDependencies:
        {
            "add-asset-html-webpack-plugin": "^3.1.3",
            "clean-webpack-plugin": "^1.0.1",
            "webpack-aliyun-oss-plugin": "^2.1.0",
            "style-resources-loader": "^1.2.1",
            "tslint-config-flagwind": "^1.0.1",
            "vue-cli-plugin-style-resources-loader": "^0.1.3",
            "webpack-cli": "^3.3.4"
        }
    });

    if(options.aliyuOSS)
    {
        api.extendPackage({
            devDependencies:
            {
                "webpack-aliyun-oss-plugin": "^2.1.0",
            }
        });
    }
    
    if(options.surportIE)
    {
        api.extendPackage({
            devDependencies:
            {
                "@babel/polyfill": "^7.4.4",
            }
        });
    }
    
    if(options.echarts)
    {
        api.extendPackage({
            dependencies:
            {
                "flagwind-echarts": '^1.0.0'
            },
            devDependencies:
            {
                "@types/echarts": "^4.1.9",
            }
        });
    }

    if(options.map === "openlayer")
    {
        api.extendPackage({
            dependencies:
            {
                "ol": "^5.3.2"
            },
            devDependencies:
            {
                "@types/ol": "^4.6.5"
            }
        });
    }
    
    if(options.map === "amap")
    {
        api.extendPackage({
            dependencies:
            {
                "flagwind-amap": "^1.0.0"
            }
        });
    }

    // render是用ejs语法渲染文件，语法参考 https://ejs.bootcss.com/
    api.render("./template");

    // 创建完成后 删除文件
    api.onCreateComplete(function()
    {
        try
        {
            fs.unlinkSync(api.resolve("src/components/HelloWorld.vue"));
            fs.unlinkSync(api.resolve("src/views/About.vue"));
            fs.unlinkSync(api.resolve("src/views/Home.vue"));
            fs.unlinkSync(api.resolve("src/App.vue"));
            fs.unlinkSync(api.resolve("src/router.ts"));
            fs.unlinkSync(api.resolve("src/store.ts"));
            fs.unlinkSync(api.resolve("src/shims-tsx.d.ts"));
            fs.unlinkSync(api.resolve("src/shims-vue.d.ts"));

            return Promise.resolve();
        }
        catch (error)
        {
            return Promise.reject(error);
        }
    });
};
