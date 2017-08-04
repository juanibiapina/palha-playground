import React from 'react'

const ENTER_KEY = 13;

// components
class TodoApp extends React.Component {
  handleNewTodoChange(event) {
    this.props.dispatch({type: "UPDATE_NEW_TODO", text: event.target.value});
  }

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    this.props.dispatch({type: "ADD_TODO"})
  }

  render() {
    return (
      <div>
        <input
          value={this.props.model.newTodo}
          onChange={(event) => this.handleNewTodoChange(event)}
          onKeyDown={(event) => this.handleNewTodoKeyDown(event)}
        />
      </div>
    );
  }
}

// app

export const view = (model, dispatch) => (
  <TodoApp model={model} dispatch={dispatch} />
);

export const initialModel = {
  todos: [],
  newTodo: "",
};

export const update = (model, message) => {
  console.log(model);
  console.log(message);

  if (message.type === "UPDATE_NEW_TODO") {
    return {
      ...model,
      newTodo: message.text,
    };
  } if (message.type === "ADD_TODO") {
    let todos = model.todos;
    todos.push(model.newTodo);

    return {
      ...model,
      todos: todos,
      newTodo: "",
    };
  } else {
    return model;
  }
};
