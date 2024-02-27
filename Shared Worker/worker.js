// 消息监听
let data = null
onconnect = (event) => {
  const port = event.ports[0];

  // 页面都向worker发送消息，内部逻辑进行区分，然后回复消息。
  port.addEventListener("message", function (e) {
    if(e.data.type === "second") { // 页面二发送的消息
      port.postMessage(data)
      data = null
    }else if(e.data.type === "first"){ // 页面一发送的消息
      data = {
        type: "first",
        message: e.data
      }
    }
  });

  port.start(); 
}
