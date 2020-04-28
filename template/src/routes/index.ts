import consoles from "./modules/console";
import error from "./modules/error";

// 布局组件
const admin = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/admin.vue")), "admin");

// 登录
const login = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/login.vue")), "login");

const routes =
[
    {
        path: "/",
        redirect: "/login"
    },
    {
        name: "home",
        path: "/home",
        redirect: "/consoles"
    },
    {
        name: "login",
        path: "/login",
        component: login
    },
    // 放在结尾是因为404监听了 ‘/*’ 路径，这个放前面会影响路由跳转
    ...error
];

export default routes;
