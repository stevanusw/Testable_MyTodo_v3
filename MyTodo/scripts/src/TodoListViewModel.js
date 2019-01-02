this.mytodo = (function (mytodo) {
    mytodo.TodoListViewModel = function (eventBus, myTodoService) {
        var self;

        self = this;

        eventBus.onNewTodoItemInserted(function (todoItem) {
            self.todoItems.push(new mytodo.ToDoItem(todoItem));
        });

        self.todoItems = ko.observableArray([]);

        self.loadTodoList = function () {
            var loadTodoListSuccess,
                loadTodoListError;

            loadTodoListSuccess = function (todoItems) {
                var i;

                self.todoItems.removeAll();

                for (i = 0; i < todoItems.length; i += 1) {
                    self.todoItems.push(new mytodo.ToDoItem(todoItems[i]));
                }
            };

            loadTodoListError = function () {
                eventBus.postError("Error loading Todo list");
            };

            myTodoService.getTodoList(loadTodoListSuccess, loadTodoListError);
        };
    };

    return mytodo;
}(this.mytodo || {}));