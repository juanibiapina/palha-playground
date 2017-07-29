import React from 'react'
import ReactDOM from 'react-dom';

import Palha from 'palha';

const App = () => (
  <h1>Hello, world!</h1>
);

const reactRenderer = (view) => {
  ReactDOM.render(
    view,
    document.getElementById('root')
  );
};

const view = () => (
  <App />
);

const start = (data) => (
  data.renderer(data.view())
);

start({
  view: view,
  renderer: reactRenderer,
});
