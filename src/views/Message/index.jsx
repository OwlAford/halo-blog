import Loadable from 'react-loadable'
import Spin from '^/Spin'

export default Loadable({
  loader: () => import(/* webpackChunkName: "message" */ './Message'),
  loading: Spin
})
