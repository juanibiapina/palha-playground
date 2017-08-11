import { createApp } from './framework';
import { createReactRenderer } from './palhaReactRenderer';

import { initialModel, update, view } from './todo';

const firstApp = createApp();

firstApp({
  initialModel: initialModel,
  update: update,
  view: view,
  renderer: createReactRenderer(document.getElementById('root')),
});

const secondApp = createApp();

secondApp({
  initialModel: initialModel,
  update: update,
  view: view,
  renderer: createReactRenderer(document.getElementById('root2')),
});
