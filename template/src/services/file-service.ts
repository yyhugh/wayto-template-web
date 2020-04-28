import { Injectable } from "uxmid-core";
import ServiceBase from "./service-base";
import IHttpResponse from "src/common/http/http-response";

@Injectable()
export default class FileService extends ServiceBase
{
    /**
     * 上传图片。
     * @param {any} model
     * @returns Promise
     */
    public async uploadAvatar(id: number, file: any): Promise<IHttpResponse>
    {
        // 请求接口
        let records = await this.apis.uploadImage
        ({
            serializeType: "form-data",
            data:
            {
                bizId: id,
            },
            files:
            {
                "file": file
            }
        });

        return records;
    }
}
