import { Todo } from "../model/todo";
import { TodoServiceImpl } from "../service/todoServiceImpl";

export interface TodoTemplateI{
    clear():void;
    render(todoService:TodoServiceImpl, todoList:Todo[]):void
}