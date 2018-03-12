import React from 'react';
import ReactDOM from 'react-dom';
import './common.css';
import registerServiceWorker from './registerServiceWorker';

import Main from './components/Main';

ReactDOM.render(
  <div>
    <Main />
  </div>,
   document.getElementById('root')
);
registerServiceWorker();
