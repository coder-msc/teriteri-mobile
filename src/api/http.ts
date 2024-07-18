import axios, {AxiosResponse, AxiosStatic} from "axios";
import {getUserToken, setUserToken} from "../store/UserSrore";
import {SERVICE_ROUT} from "../util/type"
// @ts-ignore
import qs from "qs"

// 服务器地址
const ServerPath:string=SERVICE_ROUT.ServerPath

// 创建对象
const http=axios.create({
    baseURL:ServerPath,
    timeout: 10000 // 设置请求超时时间

})

// 设置拦截器--在给发送后端请求前
http.interceptors.request.use(config=>{
    config.headers.set("token",getToken())
    console.log("请求头：",config.headers)
    return config
})

export function  getToken(){
    return getUserToken();
   // return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMTExMTExIiwic3ViIjoiYWRtaW4tdGVzdCIsImV4cCI6MTcxMzMxNTcxMiwianRpIjoiOWI2M2U5MWMtM2QzZi00ZGQyLWEzZGMtOTE5ZjE1ZGUzMjA1In0.JXaNy73ucP1TqLU733jyEehJWQTlocCFpC4o9wmX-Vc"
  //  return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMTIzNDU2Iiwic3ViIjoiYWRtaW4tdGVzdCIsImV4cCI6MTcwODU0NjcyMywianRpIjoiMGUyMzAxZTEtOWM0My00YmZiLTk4NzQtMDIxMzkxNzQ5ZDEyIn0.RtBKY3HYtz3K4TFeUImHS9-oHG-gjp79ZEmq-PL4E_E";
}
export  function  setToken(token){
    setUserToken(token)
}

// 封装一下
export  function  HttpGet(url:string,data?:any){
    if(typeof data!='undefined'){
        return http.get(url+"?"+qs.stringify(data))
    }

    return http.get(url)
}

export  function  HttpPost(url:string,data?:any){
    return http.post(url,data)
}

export  function  HttpPut(url:string,data?:any){
    return http.put(url,data)
}

export  function  HttpDelete(url:string,data?: object){
    if(typeof data!='undefined'){
        return http.delete(url+"?"+qs.stringify(data))
    }

    return http.delete(url)
}

// 设置头像
/**
 *
 * @param url
 * @param formData
 * @param progressVue ref的数据 上传进度
 * @constructor
 */
export  function HttpFile(url:string, formData:any, progressVue:any){

    // const formData = new FormData();
    // formData.append('file', fileVue.value);
    // const formData = new FormData();
    // formData.append('file', fileVue.value);
    // 使用 axios 发送 POST 请求，并监听 progress 事件
    return    http({
        timeout:0,
        method: 'post',
        url: url,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'

        },
        onUploadProgress: (event) => {
            console.log("event.loaded :",event.loaded)
            //event.loaded 是指已经上传的字节数，
            // event.total 是指要上传的文件的总字节数
            console.log("event.total:",event.total)
            progressVue.value = Math.round((event.loaded * 100) / event.total);
        }
    })

}



export  function HttpGetFileObj(url:string){
    return http({
        timeout:0,
        method: 'get',
        url: url,
        responseType: 'blob', // 指定响应类型为 Blob
    })
}