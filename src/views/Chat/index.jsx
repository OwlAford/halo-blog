import Loadable from 'react-loadable'
import Spin from '^/Spin'

export default Loadable({
  loader: () => import(/* webpackChunkName: "chat" */ './Chat'),
  loading: Spin
})
