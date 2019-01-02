this.mytodo = (function (mytodo) {
    mytodo.MyTodoView = function () {
        var self,
            newTodoItemView,
            todoListView,
            eventBus,
            myTodoService;

        self = this;
        eventBus = new mytodo.EventBus();
        myTodoService = new mytodo.MyTodoService();
        todoListView = new mytodo.TodoListView(eventBus, myTodoService);
        newTodoItemView = new mytodo.NewTodoItemView(eventBus, myTodoService);

        eventBus.onError(function (message) {
            alert(message);
        });

        self.init = function () {
            todoListView.init();
            newTodoItemView.init();
        };
    };

    return mytodo;
}(this.mytodo || {}));