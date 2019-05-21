import React from 'react';
import Spin from '^/Spin';

const Chat = React.lazy(() => import(/* webpackChunkName: "chat" */ './Chat'));

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Chat />
  </React.Suspense>
);
