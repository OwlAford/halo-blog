import React from 'react';
import Spin from '^/Spin';

const Note = React.lazy(() => import(/* webpackChunkName: "note" */ './Note'));

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Note />
  </React.Suspense>
);
