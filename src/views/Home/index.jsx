import React from "react";
import Spin from "^/Spin";

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ "./Home"));

export default () => (
  <React.Suspense fallback={<Spin />}>
    <Home />
  </React.Suspense>
);
