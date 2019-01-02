this.mytodo = (function (mytodo) {
    mytodo.ToDoItem = function (todoItem) {
        var self;

        self = this;

        self.title = ko.observable(todoItem.title);
        self.description = ko.observable(todoItem.description);
        self.dueDate = ko.observable(todoItem.dueDate);
        self.done = ko.observable(false);
        self.formattedDueDate = ko.computed(function () {
            return self.dueDate().toLocaleDateString();
        });
        self.isLate = ko.computed(function () {
            return (self.dueDate() < new Date()) && !self.done();
        });
    };

    return mytodo;
}(this.mytodo || {}));
