import React from 'react'
import ReactDOM from 'react-dom';

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
    return (
      <div>
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

const Game = (props) => {
    let status;
    if (props.model.winner) {
      status = `Winner: ${props.model.winner}`;
    } else {
      status = `Next player: ${props.model.xIsNext ? "X" : "O"}`;
    }

  return (
    <div className="game">
      <div className="game-board">
        <Board model={props.model} dispatch={props.dispatch}/>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
      </div>
    </div>
  );
};

// app

export const reactRenderer = (view) => {
  ReactDOM.render(
    view,
    document.getElementById('root')
  );
};

export const view = (model, dispatch) => (
  <Game model={model} dispatch={dispatch} />
);

export const initialModel = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const update = (model, action) => {
  console.log(model);
  console.log(action);

  if (action.name === "CHECK_SQUARE") {
    if (model.winner) {
      return model;
    }

    if (model.squares[action.id]) {
      return model;
    }

    const squares = model.squares.slice();
    squares[action.id] = model.xIsNext ? "X" : "O";

    return {
      ...model,
      squares: squares,
      xIsNext: !model.xIsNext,
      winner: calculateWinner(squares),
    };
  } else {
    return model;
  }
};
