import { createRoot } from 'react-dom/client'
import App from "./components/App.js"
import { Provider } from 'react-redux'
import store from "./components/store/index.js"

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
