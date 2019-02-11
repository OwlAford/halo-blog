import React from 'react'
import Spin from '^/Spin'

const Message = React.lazy(() => import(/* webpackChunkName: "message" */ './Message'))

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Message />
  </React.Suspense>
)
