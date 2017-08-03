import { start } from './framework';

import { initialModel, update, view, reactRenderer } from './tictactoe';

import Palha from 'palha';

start({
  initialModel: initialModel,
  update: update,
  view: view,
  renderer: reactRenderer,
});
