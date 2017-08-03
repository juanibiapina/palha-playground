import { start } from './framework';
import { createReactRenderer } from './palhaReactRenderer';

import { initialModel, update, view } from './tictactoe';

import Palha from 'palha';

start({
  initialModel: initialModel,
  update: update,
  view: view,
  renderer: createReactRenderer(document.getElementById('root')),
});
