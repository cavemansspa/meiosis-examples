/*global window*/
(function(ref) {
  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  ref.events = function(actions) {
    return {
      onNewTodoKeyUp: function(evt) {
        if (evt.keyCode === ENTER_KEY) {
          actions.saveTodo(evt.target.value);
        }
        else {
          actions.newTodo(evt.target.value);
        }
      },
      onEditKeyUp: function(todoId) {
        return function(evt) {
          if (evt.keyCode === ESCAPE_KEY) {
            actions.cancelEdit(todoId);
          }
          else if (evt.keyCode === ENTER_KEY) {
            actions.saveTodo(evt.target.value, todoId);
          }
        };
      },
      onEditBlur: function(todoId) {
        return function(evt) {
          actions.saveTodo(evt.target.value, todoId);
        };
      },
      onToggleTodo: function(todoId) {
        return function(evt) {
          actions.setCompleted(todoId, evt.target.checked);
        };
      },
      onEditTodo: function(todo) {
        return function(_evt) {
          actions.editTodo(todo.title, todo.id);
        };
      },
      onDestroyTodo: function(todoId) {
        return function(_evt) {
          actions.deleteTodoId(todoId);
        };
      },
      onClearCompleted: function(_evt) {
        actions.clearCompleted();
      }
    };
  };
})(window);