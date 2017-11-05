const React = require("react");
const TodoForm = require("./TodoForm");
const FilterLinks = require("./FilterLinks");
const TodoList = require("./TodoList");
const TodosCount = require("./TodosCount");
const constants = require("../constants");
const ALL = constants.ALL;
const ACTIVE = constants.ACTIVE;
const COMPLETED = constants.COMPLETED;

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      currentFilter: ALL,
      todos: []
    };
    this.handleNewTodoItem = this.handleNewTodoItem.bind(this);
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleTodoSearch = this.handleTodoSearch.bind(this);
  }
  handleNewTodoItem() {
    this.setState(function(prevState) {
      let todoItem = {
        todo: prevState.searchTerm,
        id: Date.now().toString(),
        completed: false
      };
      let todos = prevState.todos.concat(todoItem);

      return {
        todos: todos,
        searchTerm: ""
      };
    });
  }
  handleDeleteBtnClick(evt) {
    let id = evt.target.value;
    this.setState(function(prevState) {
      let todos = prevState.todos;
      let index = null;
      for (let i = 0; i < todos.length; ++i) {
        if (todos[i].id === id) {
          index = i;
          break;
        }
      }

      // todos.splice(index, 1);  // Prefer NOT to mutate the state object
      todos = todos.slice(0, index).concat(todos.slice(index + 1));

      return {
        todos: todos
      };
    });
  }
  handleCheckboxClick(evt) {
    let id = evt.target.value;
    this.setState(function(prevState) {
      let todos = prevState.todos;
      let index = null;
      for (let i = 0; i < todos.length; ++i) {
        if (todos[i].id === id) {
          index = i;
          break;
        }
      }

      todos = todos
        .slice(0, index)
        .concat([
          {
            todo: todos[index].todo,
            id: todos[index].id,
            completed: !todos[index].completed
          }
        ])
        .concat(todos.slice(index + 1));

      return {
        todos: todos
      };
    });
  }
  handleFilterChange(evt, currentFilter) {
    evt.preventDefault();

    this.setState(function() {
      return {
        currentFilter: currentFilter
      };
    });
  }
  handleTodoSearch(searchTerm) {
    this.setState(function() {
      return {
        searchTerm: searchTerm
      };
    });
  }
  filterTodos() {
    let todos = this.state.todos;
    let currentFilter = this.state.currentFilter;
    let filteredTodos = [];
    let searchTerm = this.state.searchTerm;

    for (let i = 0; i < todos.length; ++i) {
      let todoItem = todos[i];
      if (todoItem.todo.indexOf(searchTerm) === -1) {
        continue;
      }
      if (currentFilter === COMPLETED && !todoItem.completed) {
        continue;
      } else if (currentFilter === ACTIVE && todoItem.completed) {
        continue;
      }
      filteredTodos.push(todoItem);
    }

    return filteredTodos;
  }
  render() {
    let todos = this.filterTodos();
    return (
      <div>
        <TodoForm
          todoText={this.state.searchTerm}
          onTodoSearch={this.handleTodoSearch}
          onNewTodoItem={this.handleNewTodoItem}
        />
        <FilterLinks
          currentFilter={this.state.currentFilter}
          onFilterChange={this.handleFilterChange}
        />
        <TodoList
          todos={todos}
          onDeleteBtnClick={this.handleDeleteBtnClick}
          onCheckboxClick={this.handleCheckboxClick}
        />
        <TodosCount todosCount={todos.length} />
      </div>
    );
  }
}

module.exports = Todo;
