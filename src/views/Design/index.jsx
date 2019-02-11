import React from 'react'
import Spin from '^/Spin'

const Design = React.lazy(() => import(/* webpackChunkName: "design" */ './Design'))

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Design />
  </React.Suspense>
)
