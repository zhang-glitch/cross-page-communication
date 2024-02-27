// 消息监听
self.addEventListener("message", async (event) => {
  console.log("sw: event", event)
  // 获取所有注册了service worker客户端
  const clients = await self.clients.matchAll()
  console.log("注册的所有service worker!", clients)

  clients.forEach(client => {
    // 获取到数据进行传递
    client.postMessage({
      swMessage: event.data.sendMessage
    })
  })
})