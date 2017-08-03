import ReactDOM from 'react-dom';

export const createReactRenderer = (element) => (
  (view) => ReactDOM.render(view, element)
);
