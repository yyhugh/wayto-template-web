## vue create 预置脚手架
> 要想实现vue create创建自己的脚手架，目录需要有以下文件
* `preset.json`(必须)   存放vue脚手架的预设值，等同于用`vue create`创建项目后保存在`~/.vuerc`的配置
* `generator.js`(可选)  配置逻辑处理的文件
* `prompts.js`(可选)    用户对话配置文件

### 🐋 项目说明
该脚手架是为了快速初始化`Web PC`后台项目，为了解决每次新建项目都要从别的项目复制然后，删改，会遗留大量上个项目的元素，这里尽量做到删减，便于干净快速初始化

### 📚 使用方式
需要先全局安装vue-cli，3.0及以上版本
```bash
vue create -p uxmid/web-vue-cli <project name>
```

### 📦 脚手架内容
* 添加`vue dll`，预打包不常用的库，提高打包速度
* 添加`webpack-aliyun-oss-plugin`，打包之后静态文件都上传至阿里云`oss`，发包只用发布一个`index.html`即可.
* 添加`style-resources-loader`, 将常用的`less`函数及`mixins`添加到`webpack`上下文全局，不用再在写`style`的时候手动引入变量了
* 配置`fork-ts-checker`只检验项目下`ts`, `tsx`, `vue`的`ts`语法，避免检测`node_modules`内容

### ✏️ TodoList
- [ ] 将大的依赖库放到`external`, 然后cdn方式引入，可大大减小`vendor`体积
- [ ] 其他

### 🙋 迭代
不可能一开始就是完美的，需要与实际项目开发结合不停迭代添加元素，达到真正的便利化。
