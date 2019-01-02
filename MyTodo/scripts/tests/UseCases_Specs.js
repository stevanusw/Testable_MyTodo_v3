/* global mytodo */

describe('Given the user that wants to insert a new todo item', function () {
    var newTodoItemViewModel,
        todoListViewModel,
        eventBus,
        myTodoService,
        onNewTodoItemInsertedHandler;

    //context setup
    beforeEach(function () {
        // mocking eventBus and remote service
        eventBus = jasmine.createSpyObj('eventBus', ['postNewTodoItemInserted', 'onNewTodoItemInserted', 'postError']);

        // faking event subscription to save event handler reference for further use
        eventBus.onNewTodoItemInserted.and.callFake(function (handler) {
            onNewTodoItemInsertedHandler = handler;
        });

        myTodoService = jasmine.createSpyObj('myTodoService', ['insertTodoItem']);

        // view models initializations
        newTodoItemViewModel = new mytodo.NewTodoItemViewModel(eventBus, myTodoService);
        newTodoItemViewModel.title('Title');
        newTodoItemViewModel.description('Description');
        newTodoItemViewModel.dueDate('04/06/20014');

        todoListViewModel = new mytodo.TodoListViewModel(eventBus, myTodoService);
        todoListViewModel.todoItems([
            new mytodo.ToDoItem({
                title: 'A title',
                description: 'A description',
                dueDate: new Date('02/06/2014')
            })
        ]);

        // event subscription verification
        expect(eventBus.onNewTodoItemInserted).toHaveBeenCalled();
        expect(eventBus.onNewTodoItemInserted.calls.count()).toEqual(1);
    });

    it('when a new todo item is inserted, then the form should reset, the item remotely inserted, and the item list updated', function () {
        var dueDate,
            newTodoItem;

        // mocking remote service insert method (successful)
        myTodoService.insertTodoItem.and.callFake(function (item, successCallback, errorCallback) {
            successCallback();
        });

        dueDate = new Date(newTodoItemViewModel.dueDate());

        newTodoItem = {
            title: 'Title',
            description: 'Description',
            dueDate: dueDate
        };

        // item insertion
        newTodoItemViewModel.insertNewTodoItem();

        // form reset verification
        expect(newTodoItemViewModel.title()).toEqual('');
        expect(newTodoItemViewModel.description()).toEqual('');
        expect(newTodoItemViewModel.dueDate()).toEqual('');

        // remote service call verification
        expect(myTodoService.insertTodoItem).toHaveBeenCalled();
        expect(myTodoService.insertTodoItem.calls.count()).toEqual(1);
        expect(myTodoService.insertTodoItem.calls.argsFor(0).length).toEqual(3);
        expect(myTodoService.insertTodoItem.calls.argsFor(0)[0]).toEqual(newTodoItem);

        // event verification
        expect(eventBus.postError).not.toHaveBeenCalled();
        expect(eventBus.postNewTodoItemInserted).toHaveBeenCalled();
        expect(eventBus.postNewTodoItemInserted.calls.count()).toEqual(1);
        expect(eventBus.postNewTodoItemInserted.calls.argsFor(0).length).toEqual(1);
        expect(eventBus.postNewTodoItemInserted.calls.argsFor(0)[0]).toEqual(newTodoItem);

        // faking event propagation
        onNewTodoItemInsertedHandler(newTodoItem);

        // item list verification
        expect(todoListViewModel.todoItems().length).toEqual(2);
        expect(todoListViewModel.todoItems()[1]).toEqual(jasmine.any(mytodo.ToDoItem));
        expect(todoListViewModel.todoItems()[1].title()).toEqual(newTodoItem.title);
        expect(todoListViewModel.todoItems()[1].description()).toEqual(newTodoItem.description);
        expect(todoListViewModel.todoItems()[1].dueDate()).toEqual(newTodoItem.dueDate);
    });

    it('when a new item is inserted, and remote service throws an error, then the form doesn\'t reset, and an error is raised', function () {
        var dueDate,
            newTodoItem;

        // mocking remote service insert method (with error)
        myTodoService.insertTodoItem.and.callFake(function (item, successCallback, errorCallback) {
            errorCallback('Error');
        });

        dueDate = new Date(newTodoItemViewModel.dueDate());

        newTodoItem = {
            title: 'Title',
            description: 'Description',
            dueDate: dueDate
        };

        // item insertion
        newTodoItemViewModel.insertNewTodoItem();

        // form verification
        expect(newTodoItemViewModel.title()).toEqual('Title');
        expect(newTodoItemViewModel.description()).toEqual('Description');
        expect(newTodoItemViewModel.dueDate()).toEqual('04/06/20014');

        // remote service call verification
        expect(myTodoService.insertTodoItem).toHaveBeenCalled();
        expect(myTodoService.insertTodoItem.calls.count()).toEqual(1);
        expect(myTodoService.insertTodoItem.calls.argsFor(0).length).toEqual(3);
        expect(myTodoService.insertTodoItem.calls.argsFor(0)[0]).toEqual(newTodoItem);

        // event verification
        expect(eventBus.postNewTodoItemInserted).not.toHaveBeenCalled();
        expect(eventBus.postError).toHaveBeenCalled();
        expect(eventBus.postError.calls.count()).toEqual(1);
    });
});