import registerServiceWorker from './registerServiceWorker'
import React from 'react'
import { render } from 'react-dom'
import App from '@/App'

render(
  <App />,
  document.getElementById('MOUNT_NODE')
)

registerServiceWorker()
