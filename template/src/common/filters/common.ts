import { globalConfig } from "config/index";

const apiUrl = globalConfig.platformServer;

/**
 * 给图片加时间戳
 * @param url 图片url
 */
export function urlTimetamp(url: string): string
{
    return url && url + "?t=" + parseInt("" + Math.random() * 1000000);
}

/**
 * 给图片加时间戳
 * @param url 图片url
 */
export function imagePath(url: string): string
{
    return url && apiUrl + url;
}

/**
 * 真实四舍五入算法
 * @param {Number} digit 
 * @param {Number} length 
 */

export function numberRound(digit, length)
{
    length = length ? parseInt(length) : 0;
    if (length <= 0) return Math.round(digit);
    digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
    return digit.toFixed(length);
}

/**
 * 格式化价格
 * @param price 
 * @param isShowSymbol 
 * @param pirceSymbol 
 * @param length 
 */
export function formartPrice(price: string | number, isShowSymbol: boolean = true, pirceSymbol?: string, length?: number)
{
    if(!price && price !== 0)
    {
        return "";
    }

    let numPart,    // 整数部分
        isNegative,    // 是否负数
        priceSymbol,
        floatPart;    // 小数部分

    let index = -3;

    // 默认保留小数位为2
    length = length >= 0 ? length : 2;

    // 如果没有传入默认为0
    price = price || 0;

    // 是否是个负数
    price < 0 && (isNegative = true);

    // 将小于0的数转换为绝对值
    price = Math.abs(+price);
    // fixed = (fixed ? fixed : 2)
    
    // 校验传入值
    if (typeof price === "number")
    {
        price = numberRound(price, length).toString();
    }
    
    if (typeof price === "string")
    {
        
        if (price.indexOf(".") !== -1)
        {
            // 如果有小数点
            let splitNum = numberRound(parseFloat(price), length).toString().split(".");
            
            numPart = splitNum[0];
            floatPart = "." + splitNum[1];
            
        }
        else
        {
            // 如果没有小数点，补齐两位小数显示
            numPart = price;
            floatPart = ".00";
        }
        
        // 将每个字符串转换为数组
        numPart = numPart.toString().split("");
        
        while (numPart.length + index > 0)
        {
            
            numPart.splice(index, 0, ",");    // splice(起始位置，替换个数，数据); 起始位置为负数则倒着操作
            
            index -= 4;
        }

        // 处理金额符号
        priceSymbol = isShowSymbol ? pirceSymbol ? pirceSymbol : "¥" : "";
        
        return priceSymbol + (isNegative ? "-" : "") + numPart.join("") + (length > 0 ? floatPart : "");
    }

}

/**
 * 百分比处理
 * @param num 
 * @param digit 
 */
export function percentage(num: number, digit: number = 2): string
{
    return Math.round(num * 100 * (digit = Math.pow(10, digit))) / digit + "%";
}
