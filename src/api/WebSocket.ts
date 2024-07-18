import { Message, Response, VideoMessage } from "@/util/type";
//import WebSocket from 'ws';


export class Ws<T>{
    private ws:WebSocket;
    private i:number=0;
    public constructor(router:string){
        this.ws=new WebSocket(router)
        this.ws.onopen =()=>{

        }
    }
    public  sendMessage( message:T){

  
        
    }
     public  onMessage(fun:  (rep:Response<T>) =>void){
      
          this.ws.addEventListener("message",
            (repC:any)=>{
              const repData:Response<T>=  JSON.parse(repC.data)
              if(repData.status===404){
               console.error("websocket--错误");
               
               return;
              }
              fun(repData)
             
           }
          )
    }
  }
  