import React from 'react'
import ReactDOM from 'react-dom';

import Palha from 'palha';

// components

const Square = (props) => (
  <button onClick={props.onClick}>
    {props.value}
  </button>
);

class Board extends React.Component {
  handleClick(i) {
    this.props.dispatch({ name: "CHECK_SQUARE", id: i });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.model.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

const Game = (props) => (
  <div className="game">
    <div className="game-board">
      <Board model={props.model} dispatch={props.dispatch}/>
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
);

// app

const reactRenderer = (view) => {
  ReactDOM.render(
    view,
    document.getElementById('root')
  );
};

const view = (model, dispatch) => (
  <Game model={model} dispatch={dispatch} />
);

const initialModel = {
  squares: Array(9).fill(null),
};

const update = (model, action) => {
  console.log(model);
  console.log(action);
  if (action.name === "CHECK_SQUARE") {
    const squares = model.squares.slice();
    squares[action.id] = "X";

    return {
      ...model,
      squares: squares,
    };
  } else {
    return model;
  }
};

// framework

const start = (data) => {
  let currentModel = data.initialModel;

  const dispatch = (action) => {
    currentModel = data.update(currentModel, action);

    data.renderer(data.view(currentModel, dispatch));
  };

  data.renderer(data.view(currentModel, dispatch))
};

// entry point of applications

start({
  initialModel: initialModel,
  update: update,
  view: view,
  renderer: reactRenderer,
});
