import React from 'react';
import Spin from '^/Spin';

const Efforts = React.lazy(() =>
  import(/* webpackChunkName: "efforts" */ './Efforts')
);

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Efforts />
  </React.Suspense>
);
