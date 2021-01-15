import React,{Component} from 'react';
import { Provider } from 'react-redux';
import {configureStore} from './redux/configureStore';
import Main from './components/MainComponent';
import { PersistGate } from 'redux-persist/integration/react'

let {store,persistor} = configureStore();
class App extends Component {
  render() {
    return (
    <Provider store = {store} >
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Main />
        </div>
      </PersistGate>
    </Provider>
    );
  };
}

export default App;
