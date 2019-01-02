this.mytodo = (function (mytodo) {
    mytodo.TodoListView= function (eventBus, myTodoService) {
        var self,
            todoListViewModel;

        self = this;
        todoListViewModel = new mytodo.TodoListViewModel(eventBus, myTodoService);

        self.init = function () {
            ko.applyBindings(todoListViewModel, document.getElementById("todoListView"));

            todoListViewModel.loadTodoList();
        };
    };

    return mytodo;
}(this.mytodo || {}));