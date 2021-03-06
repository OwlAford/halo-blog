import registerServiceWorker from './registerServiceWorker';
import '~/utils/raf';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from '@/App';
import store from '~/store';
import { routeRootPath } from '~/constants/config';

import 'nprogress/nprogress.css';
import 'normalize.css';

render(
  <Provider {...store}>
    <Router basename={routeRootPath}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('MOUNT_NODE')
);

registerServiceWorker();
