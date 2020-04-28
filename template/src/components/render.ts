// vue 函数式组件, 通用实现iview-table render方法。
// 参考 https://cn.vuejs.org/v2/api/#render
// 参考iview-table render实现 

export default {
    name: "RenderCell",
    functional: true,
    props: {
        row: Object,
        render: Function
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row
            // index: ctx.props.index
        };
        return ctx.props.render(h, params);
    }
};
