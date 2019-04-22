import React from "react";
import Spin from "^/Spin";

const Wall = React.lazy(() => import(/* webpackChunkName: "wall" */ "./Wall"));

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Wall />
  </React.Suspense>
);
