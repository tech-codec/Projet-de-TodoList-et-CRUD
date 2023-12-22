import { Todo } from "../model/todo";

export interface TodoServiceI {
    addTodo(todo:Todo):void;
    removeTodo(id:string):void;
    getTodo(id:string):Todo;
    updateTodo(todo:Todo):void;
    todoListDone():Todo[];
    todoListNotDone():Todo[];
    save():void;
    load():void;
    clearListTodo():void
}