const {WebSocketServer} = require("ws")

// 创建wb服务器
const wbss = new WebSocketServer({
  port: 3000
})

// 保存客户端链接实例
const clients = []

// 客户端连接时触发
wbss.on("connection", (client) => {
  clients.push(client)
  console.log("clients:1 客户端连接数", clients.length);

  // 绑定当前客户端连接，获取消息
  client.on('message', async function message(data) {
    console.log('data', data.toString());
    // 将消息传递给其他客户端
    clients.forEach(c => {
      if(c !== client) {
        c.send(data.toString())
      }
    })
  });

  // 客户端断开连接(关闭或者刷新)
  client.on("close", () => {
    const findIndex = clients.findIndex(c => c === client)
    clients.splice(findIndex, 1)
    console.log("clients:2 客户端连接数", clients.length);
  })
})