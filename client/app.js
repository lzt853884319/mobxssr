import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App.jsx'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

// webpack Hot Module Replacement API
if (module.hot) {
    console.log("fasdfasdfasdf");
    
  module.hot.accept('./App.jsx', () => {
    console.log("fasdfasd21212121212121fasdf");
    // if you are using harmony modules ({modules:false})
    render(App)
    // in all other cases - re-require App manually
    render(require('./App.jsx'))
  })
}