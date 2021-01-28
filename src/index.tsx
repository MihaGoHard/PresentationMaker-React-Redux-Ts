import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { mainReducer } from './Models/Reducers/programmReducer';
import { saveStateToArchive } from './Models/CommonFunctions/archive';
import { goBackArchive, goForwardArchive } from './Models/ActionCreators/commonActionCreators';
import { useCopyPasteListners, useFullScrinEvents, useSaveToArh, useUndoRedoListners } from './CustomHooks/CommonDifferentHooks';



export const store = createStore(mainReducer)


useSaveToArh()
useUndoRedoListners()
useCopyPasteListners()
useFullScrinEvents()


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
)



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

