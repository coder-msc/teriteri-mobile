import {defineStore} from "pinia";

/**
 * 用于传值
 */

export function getValue(key){
   const Router= RouterStore();
   if(Router.map.has(key)){
       return Router.map.get(key)
   }
   return "error"
}
export function getValueAndDelete(key){
    const Router= RouterStore();
    if(Router.map.has(key)){
        let value=   Router.map.get(key)
        Router.map.delete(key)
        return value
    }
    return "error"
}
export  function  setValue(key,value){
    const Router= RouterStore();
    Router.map.set(key,value)
}



export const RouterStore=defineStore('router',{

    // 类似于组件的 data,存储全局状态的
    // 必须是箭头函数
    state: ()=>{
        return {
            map: new Map(),
            shareShow:false  // 分享组件的显示


        }
    },
    // 类似computed 计算属性，有缓存功能
    getters:{

    },
    // 类似组件的methods,封装业务逻辑，修改 state
    actions:{  }
})


export const {shareShow} = RouterStore()  // 只是抛出 shareShow

