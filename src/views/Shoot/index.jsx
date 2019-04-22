import React from "react";
import Spin from "^/Spin";

const Shoot = React.lazy(() =>
  import(/* webpackChunkName: "shoot" */ "./Shoot")
);

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Shoot />
  </React.Suspense>
);
