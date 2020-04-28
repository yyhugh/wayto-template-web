import { Type } from "uxmid-core";
import { IFilterItem } from "models";
import dayjs from "dayjs";

/**
 * 替换字符串占位符
 * @function
 * @version 1.0.0
 * @param {string} str 传入需要处理的字符串
 * @param {Array | Object} args 传入字符串中要被替换的参数。类型为数组或者object
 * @returns string
 */
export function formatString(str: string, args: Array<any> | any): string
{
    let tempStr = str;

    if (arguments.length > 1)
    {
        if (Type.isObject(args))
        {
            for (let key in args)
            {
                if (args[key] !== undefined)
                {
                    let reg = new RegExp("({" + key + "})", "g");
                    tempStr = tempStr.replace(reg, args[key]);
                }
            }
        }

        if (Type.isArray(args))
        {
            for (let i = 0; i < args.length; i++)
            {

                if (args[i] !== undefined)
                {
                    let reg = new RegExp("({)" + i + "(})", "g");
                    tempStr = tempStr.replace(reg, args[i]);
                }
            }
        }
    }
    return tempStr;
}

/**
 * 将指定的 String 或 Date 类型格式化为 `yyyy-mm-dd` 形式。
 * @param  {string|Date} value
 * @returns string
 */
export function formatDate(value: string | Date): string
{
    if(!Type.isEmptyObject(value))
    {
        return dayjs(value).format("YYYY-MM-DD");
    }
    
    return null;
}

/**
 * 将指定的 String 或 Date 类型格式化为 `yyyy-mm-dd hh:mm:ss` 形式。
 * @param  {string|Date} value
 * @returns string
 */
export function formatDateTime(value: string | Date): string
{
    if(!Type.isEmptyObject(value))
    {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    }
    
    return null;
}

/**
 * 检测数据类型
 * @param {*} obj
 */

export const typeCheck = obj =>
{
    const toString = Object.prototype.toString;
    const map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
    };

    return map[toString.call(obj)];
};

/**
 * 根据过滤条件的数据类型编码条件值。
 * @param  {IFilter} filter 过滤条件实例。
 * @returns string 编码后的字符串。
 */
export function encodeFilterValue(filter: IFilterItem): string
{
    // 如果没有设置类型，则默认做字符串处理
    let filterType = filter.type || String;
    let filterValue = "";
    
    if(filterType === Array || filterType === Object)
    {
        // 如果是数组或者JSON对象，则序列化处理
        filterValue = JSON.stringify(filter.value);
    }
    else
    {
        // 其他数据类型强制转换为字符串
        if(!Type.isEmptyObject(filter.value))
        {
            filterValue = String(filter.value);
        }
    }
    
    if(filterValue)
    {
        filterValue = encodeURIComponent(filterValue);
    }

    return filterValue;
}

/**
 * 根据过滤条件的数据类型解码条件值。
 * @param  {IFilter} filter 过滤条件实例。
 * @param  {string} value 需要解码的字符串值。
 * @returns any 解码后的真实数据。
 */
export function decodeFilterValue(filter: IFilterItem, value: any): any
{
    // 如果没有设置类型，则默认做字符串处理
    let filterType = filter.type || String;
    let filterValue: any;

    // 解码字符串值
    value = decodeURIComponent(value);

    switch(filterType)
    {
        case String:
        case Date:
        {
            filterValue = value;

            break;
        }
        case Number:
        {
            filterValue = parseFloat(value);

            break;
        }
        case Boolean:
        {
            filterValue = (value === "true" || value === "1");

            break;
        }
        default:
        {
            filterValue = JSON.parse(value);

            break;
        }
    }

    return filterValue;
}

/**
 * 函数节流，在监听频繁触发函数（scroll, touchmove, mouseover等）时调用，
 * @param {Function} func 
 * @param {Numebr} wait 
 * @param {Number} mustRun 
 */
export const throttle = function(func: Function, wait: number) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait);
        }

    }
};

/**
 * 下载文件兼容性处理。
 * @param url 下载文件的url
 */
export function downloadFile(url: string): void
{
    if(!url || typeof url !== "string")
    {
        throw new Error("download url is avalid!");
    }

    const linkEl = document.createElement("a");
        
    if("download" in linkEl)
    {
        const filename = url.substr(url.lastIndexOf("/"));
        linkEl.download = filename;
        document.body.appendChild(linkEl);
        linkEl.href = url;
        linkEl.click();
        linkEl.remove();
    } else {
        const win = window.open(url, "_self");
        win.opener = null;
    }
}

/**
 * 下载excel文件流。
 * @param url 下载文件的url
 */
export function downloadExcel(file: Blob, disposition: string): void
{
    if(!file)
    {
        throw new Error("download url is avalid!");
    }

    const blob = new Blob([file], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}),
        reader = new FileReader();
    let dispositions = disposition.match(/\"(.*?)\"/g),
        filename = dispositions && dispositions.length > 0 && dispositions[0].replace(/\"/g, "");

    reader.readAsDataURL(blob);
    reader.onload = (e: any) =>
    {
        const url = e.target.result,
            linkEl = document.createElement("a");
            
        if("download" in linkEl)
        {
            // const filename = url.substr(url.lastIndexOf("/"));
            linkEl.download = filename || (url.substr(url.lastIndexOf("/")) + ".xls");
            document.body.appendChild(linkEl);
            linkEl.href = url;
            linkEl.click();
            linkEl.remove();
        } else {
            const win = window.open(url, "_self");
            win.opener = null;
        }
    };
}

/**
 * 年月日数据枚举
 * @returns void
 */
export function getDateEnums(): any
{
    const hours = (isShowMinute = false) =>
    {
        let hourEnum = {};
        for(let item = 0; item <= 23; item++)
        {
            
            let hour = item < 10 ? `0${item}` : `${item}`;
            hourEnum[item] = isShowMinute ? `${hour}:00` : hour;
        }
        return hourEnum;
    };

    const weeks: any =
    {
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
        7: "星期日"
    };

    const days = () =>
    {
        let dayEnum = {};
        for(let item = 1; item <= 31; item++)
        {
            dayEnum[item] = item < 10 ? `0${item}` : `${item}`;
        }

        return dayEnum;
    };

    const months = () =>
    {
        let dayEnum = {};
        for(let item = 1; item <= 12; item++)
        {
            dayEnum[item] = item < 10 ? `0${item}` : `${item}`;
        }

        return dayEnum;
    };
    
    return {
        hours: hours(),
        hoursMinute: hours(true),
        weeks,
        days: days(),
        months: months()
    };
}
