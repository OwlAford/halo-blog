import React from 'react'
import Spin from '^/Spin'

const Profile = React.lazy(() => import(/* webpackChunkName: "profile" */ './Profile'))

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Profile />
  </React.Suspense>
)
