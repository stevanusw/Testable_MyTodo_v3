this.mytodo = (function (mytodo) {
    var getTodoListUrl = "http://<GetTodoList>",
        insertTodoItemUrl = "http://<InsertTodoItem>",
        callRestService = function (url, data, successCallback, errorCallback) {
            jQuery.ajax({
                type: "POST",
                cache: false,
                cors: true,
                contentType: "application/json",
                url: url,
                data: JSON.stringify(data),
                dataType: "json",
                success: function (result) {
                    successCallback(result);
                },
                error: function () {
                    errorCallback();
                }
            });
        };

    mytodo.MyTodoService = function () {
        var self = this;
        self.getTodoList = function (successCallback, errorCallback) {
            //callRestService(getTodoListUrl, null, successCallback, errorCallback);

            successCallback([
                {
                    title: "a passed item",
                    description: "due date is passed",
                    dueDate: new Date(2014, 8, 15)
                }, {
                    title: "an item",
                    description: "something to do",
                    dueDate: new Date(2014, 9, 15)
                }, {
                    title: "another item",
                    description: "something to say",
                    dueDate: new Date(2014, 9, 16)
                }
            ]);
        };

        self.insertTodoItem = function (todoItem, successCallback, errorCallback) {
            //callRestService(insertTodoItemUrl, todoItem, successCallback, errorCallback);

            successCallback();
        };
    };

    return mytodo;
}(this.mytodo || {}));