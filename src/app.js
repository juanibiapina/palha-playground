import App from 'palha';
import { createReactRenderer } from './palhaReactRenderer';

import { initialModel, update, view } from './todo';

const firstApp = new App({
  initialModel: initialModel,
  update: update,
  view: view,
  renderer: createReactRenderer(document.getElementById('root')),
});

firstApp.start();

const secondApp = new App({
  initialModel: initialModel,
  update: update,
  view: view,
  renderer: createReactRenderer(document.getElementById('root2')),
});

secondApp.start();
