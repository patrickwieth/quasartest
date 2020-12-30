import { boot } from 'quasar/wrappers'
import socketIo from 'socket.io-client'
import ioserver, { Socket } from 'socket.io'

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

  
})
