import React from 'react'

import { Http } from './framework';

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

  postTodos() {
    this.props.dispatch({type: "SAVE_TODOS"});
  }

  todos() {
    return this.props.model.todos.map((todo) => (
      <li>{todo}</li>
    ));
  }

  render() {
    return (
      <div>
        <input
          value={this.props.model.newTodo}
          onChange={(event) => this.handleNewTodoChange(event)}
          onKeyDown={(event) => this.handleNewTodoKeyDown(event)}
        />
        <ol>
          {this.todos()}
        </ol>
        <button onClick={() => this.postTodos()}>POST</button>
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

export const update = (model, message, run) => {
  if (message.type === "UPDATE_NEW_TODO") {
    return {
      ...model,
      newTodo: message.text,
    };
  }

  if (message.type === "ADD_TODO") {
    let todos = model.todos;
    todos.push(model.newTodo);

    return {
      ...model,
      todos: todos,
      newTodo: "",
    };
  }

  if (message.type === "SAVE_TODOS") {
    run(Http.send(() => ({ type: "TODOS_SAVED" }), Http.request({
      method: "PUT",
      url: "http://localhost:3000/todos",
      body: model.todos,
    })));
  }

  if (message.type === "TODOS_SAVED") {
    const todos = model.todos;
    todos.push("saved");

    return {
      ...model,
      todos,
    };
  }

  return model;
};
