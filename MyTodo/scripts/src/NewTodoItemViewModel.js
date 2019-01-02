this.mytodo = (function (mytodo) {
    mytodo.NewTodoItemViewModel = function (eventBus, myTodoService) {
        var self;

        self = this;

        self.title = ko.observable('');
        self.description = ko.observable('');
        self.dueDate = ko.observable('');

        self.canInsertNewTicket = ko.computed(function () {
           return self.title() && self.description() && self.dueDate();
        });

        self.insertNewTodoItem = function () {
            var insertTodoItemSuccess,
                insertTodoItemError,
                newTodoItem;

            newTodoItem = {
                title: self.title(),
                description: self.description(),
                dueDate: new Date(self.dueDate())
            };

            insertTodoItemSuccess = function () {
                eventBus.postNewTodoItemInserted(newTodoItem);

                self.title('');
                self.description('');
                self.dueDate('');
            };

            insertTodoItemError = function () {
                eventBus.postError('Error inserting new Todo item');
            };

            myTodoService.insertTodoItem(newTodoItem, insertTodoItemSuccess, insertTodoItemError);
        };
    };

    return mytodo;
}(this.mytodo || {}));

