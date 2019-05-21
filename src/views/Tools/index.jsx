import React from 'react';
import Spin from '^/Spin';

const Tools = React.lazy(() =>
  import(/* webpackChunkName: "tools" */ './Tools')
);

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Tools />
  </React.Suspense>
);
