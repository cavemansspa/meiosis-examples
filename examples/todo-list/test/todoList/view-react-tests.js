import test from "ava";
import $ from "jquery";

import { render } from "react-dom";

import { todoListView } from "../../todoList/view-react";
import { todoList } from "../../todoList";

const id = "test";
const sel = "#" + id;
let element = null;

$.fn.triggerEvent = function(eventType) {
  const event = document.createEvent("HTMLEvents");
  event.initEvent(eventType, true, true);
  $(this)[0].dispatchEvent(event);
};

test.beforeEach(function() {
  if ($(sel).length === 0) {
    document.write("<div id='" + id + "'></div>");
    element = document.getElementById(id);
  }
});

test("renders the list of todos", t => {
  const model = todoList.initialModel();
  model.todos = [
    {id: 1, priority: 1, description: "Item 1"},
    {id: 2, priority: 2, description: "Item 2"}
  ];
  const view = todoListView(model);
  render(view, element);

  t.is($(element).find("tbody tr").length, model.todos.length);
});
