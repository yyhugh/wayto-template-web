/*!
 * Authors:
 *      Liaozezhen <447674218@qq.com>
 * 
 * Copyright (C) 2018-present O&M Cloud Inc. All rights reserved. 
 */

import { component, Component } from "uxmid-web";
import ServiceBase from "services/service-base";
import { ISearchModel, IFilter } from "models/index";

import dayjs from "dayjs";

/**
 * 一个 Vue 混入类，提供系统配置的表格功能。
 * @class
 * @version 1.0.0
 */
@component
export default class ConfigTable extends Component
{
    /**
     * 相关服务。
     * @private
     * @type {ServiceBase}
     */
    private _service: ServiceBase;

    /**
     * 添加页面路径。
     * @protected
     * @type {string}
     */
    protected addRouteName: string = "";

    /**
     * 编辑页面路径。
     * @protected
     * @type {string}
     */
    protected editRouteName: string = "";

    /**
     * 删除的API名称。
     * @protected
     * @type {string}
     */
    protected deleteApiName: string = "";

    /**
     * 获取列表的API名称。
     * @protected
     * @type {string}
     */
    protected queryApiName: string = "";

    /**
     * 获取id的名称。
     * @protected
     * @type {string}
     */
    protected idName: string = "";
    
    /**
     * 筛选条件。
     * @protected
     * @type {any}
     */
    protected filters: IFilter =
    {
        key:
        {
            value: "",
            type: String
        }
    };

    /**
     * 表格列集合。
     * @protected
     * @returns {Array<any>}
     */
    public extendColumns: Array<any> =
    [
        {
            title: "创建人",
            key: "creator",
            render: (h, params) => {
                return h("span", params.row.creator && params.row.creator.fullName || "-");
            }
        },
        {
            title: "创建时间",
            key: "createdTime",
            render: (h, params) => {
                return h("span", params.row.createdTime && dayjs(params.row.createdTime).format("YYYY-MM-DD") || "-");
            }
        },
        {
            title: "备注",
            key: "remark",
            render: (h, params) => {
                return h("span", params.row.remark || "-");
            }
        },
        {
            title: "操作",
            width: 300,
            render: (h, params) => {
                return h("div",
                {
                    class: "config-table-operate"
                },
                [
                    h("i-button",
                    {
                        attrs:
                        {
                            icon: "compose"
                        },
                        on:
                        {
                            click: () => (this as any).onEdit(params.row)
                        }
                    }, "编辑"),
                    h("i-button",
                    {
                        attrs:
                        {
                            icon: "trash-a"
                        },
                        on:
                        {
                            click: () => (this as any).onDelete(params.row)
                        }
                    }, "删除")
                ]);
            }
        }
    ];

    /**
     * 获取当前路由的自定义名称。
     * @protected
     * @returns {string}
     */
    protected get title(): string
    {
        try
        {
            const
                paths = Object.assign([], this.$route.matched).reverse(),
                path = paths.find(item => item.meta && item.meta.label);

            return path.meta && path.meta.label;
        }
        catch (error)
        {
            return "";
        }
    }

    /**
     * 获取相关服务实例。
     * @protected
     * @returns {ServiceBase}
     */
    protected get service(): ServiceBase {
        const self: any = this;
        if (!self._service) {
            self._service = this.serviceProvier.resolve<ServiceBase>(ServiceBase);
        }

        return self._service;
    }

    /**
     * 根据查询模型加载数据。
     * @virtual
     * @async
     * @param  {ISearchModel} model 查询模型。
     * @returns Promise
     */
    protected async loadRecords(model: ISearchModel): Promise<void> {
        const self: any = this;

        self.loading = true;

        const { content: result, extras } = await this.service[this.queryApiName](model);

        if (result) {
            self.records = result;
            self.recordCount = parseInt(extras.resultTotalcount) || 0;
        }

        self.loading = false;
    }

    /**
     * 跳转到新增设备生产产家的页面。
     * @protected
     * @returns {void}
     */
    protected onAdd(): void
    {
        this.$router.push({ name: this.addRouteName });
    }

    /**
     * 进行编辑。
     * @protected
     * @returns {void}
     */
    protected onEdit(item: any): void
    {
        this.$router.push({ name: this.editRouteName, params: { operateId: item[this.idName] } });
    }

    /**
     * 进行删除。
     * @protected
     * @returns {Promise<void>}
     */
    protected async onDelete(item: any): Promise<void>
    {
        const self: any = this;
        const modal = self.$modal.confirm
        ({
            title: `删除${this.title}`,
            content: `确定删除${this.title}？`,
            loading: true,
            onOk: async () => {
                try {
                    await this.service[this.deleteApiName](item[this.idName]);

                    // 清空编辑表单。
                    setTimeout(() => {
                        this.$message.success(`${this.title}删除成功。`);

                        // 刷新列表。
                        self.search();
                    }, 500);
                }
                catch (error) {
                    error && this.$message.error(error.content && error.content.message || error.message);
                }

                this.$modal.remove();
            }
        });
    }

    /**
     * 切换页数。
     * @protected
     * @returns {void}
     */
    // protected onPageChange(index?: number): void
    // {
    //     const extend = this.filters.key.value ? { query: { key: this.filters.key.value } } : {};

    //     this.$router.push({ name: this.$route.name, params: { "pageIndex": index.toString() }, ...extend });
    // }

    /**
     * 搜索关键词。
     * @protected
     * @returns {void}
     */
    // protected onKeySearch(): void
    // {
    //     const
    //         self: any = this,
    //         extend = this.filters.key.value ? { query: { key: this.filters.key.value } } : {};

    //     this.$router.push({ name: this.$route.name, ...extend });
    // }

    /**
     * 当路由发生变化时触发。
     * @private
     * @returns {void}
     */
    // private beforeRouteUpdate(to: any, from: any, next: any): void
    // {
    //     next();
    //     this.changePageByRoute(this, to);
    // }

    /**
     * 当路由进入时触发。
     * @private
     * @returns {void}
     */
    // private beforeRouteEnter(to: any, from: any, next: any): void
    // {
    //     next((vm: any) => vm.changePageByRoute(vm, to));
    // }

    /**
     * 根据路由切换页数。
     * @protected
     * @returns {void}
     */
    // private changePageByRoute(vm: any, to: any): void
    // {
        // let index = parseInt(to.params.pageIndex);
        // index = index && index > 0 && index || 1;

        // vm.filters.key.value = to.query.key;
        // vm.pageIndex = index;
        // vm.search();
    // }
}
