// business
import * as business from "./business";

// common
import * as common from "./common";

// layout
import * as layout from "./layout";

const components =
{
    ...business,
    ...common,
    ...layout
};

// tslint:disable-next-line:variable-name
export function install(Vue: any, opts: any = {})
{
    Object.keys(components).forEach(key =>
    {
        Vue.component(key, components[key]);
    });
}

export default { ...components, install };
