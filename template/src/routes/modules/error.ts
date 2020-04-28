/*!
 * Authors:
 *      Evan
 * 错误页的路由集合
 * Copyright (C) 2018-present O&M Cloud Inc. All rights reserved. 
 */

const page500         = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/errors/500")), "errors");
const page403         = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/errors/403")), "errors");
const page404       = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/errors/404")), "errors");

export default
[
    {
        name: "500",
        path: "/500",
        component: page500
    },
    {
        name: "403",
        path: "/403",
        component: page403
    },
    {
        name: "404",
        path: "/*",
        component: page404
    }
];
