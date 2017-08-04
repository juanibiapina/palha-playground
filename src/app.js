import { start } from './framework';
import { createReactRenderer } from './palhaReactRenderer';

import { initialModel, update, view } from './todo';

start({
  initialModel: initialModel,
  update: update,
  view: view,
  renderer: createReactRenderer(document.getElementById('root')),
});
