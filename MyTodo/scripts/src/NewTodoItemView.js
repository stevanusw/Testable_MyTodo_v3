this.mytodo = (function (mytodo) {
    mytodo.NewTodoItemView = function (eventBus, myTodoService) {
        var self,
            newTodoItemViewModel;

        self = this;
        newTodoItemViewModel = new mytodo.NewTodoItemViewModel(eventBus, myTodoService);

        self.init = function () {
            jQuery('#todoItemDueDate').datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: new Date()
            });

            ko.applyBindings(newTodoItemViewModel, document.getElementById('newItemView'));
        };
    };

    return mytodo;
}(this.mytodo || {}));
