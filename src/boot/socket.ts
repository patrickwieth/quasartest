import { boot } from 'quasar/wrappers'
import socketIo from 'socket.io-client'
import { Socket } from 'socket.io'

declare module 'vue/types/vue' {
  interface Vue {
    $socket: SocketIOClient.Socket;
  }
}

export default boot(({ Vue }) => {
  const SERVER_URL = 'http://localhost:3001'

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$socket = socketIo(SERVER_URL)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('io:', Vue.prototype.$socket)

  let yes : SocketIOClientStatic = socketIo.connect(SERVER_URL)
  console.log(yes)
})
