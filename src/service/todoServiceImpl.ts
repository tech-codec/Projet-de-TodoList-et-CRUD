import { Todo } from "../model/todo";
import { TodoServiceI } from "./todoServiceI";

export class TodoServiceImpl implements TodoServiceI{

    private static instance:TodoServiceImpl

    constructor(private _todoList:Todo[]=[]){}

    get todoList():Todo[]{
        return this._todoList
    }

    set todoList(todoList:Todo[]){
        this._todoList= todoList
    }

    static getInstance():TodoServiceImpl{
        if(!TodoServiceImpl.instance){
            TodoServiceImpl.instance = new TodoServiceImpl()
        }
        return TodoServiceImpl.instance
    }

    addTodo(todo: Todo): void {
        this._todoList.push(todo)
        this.save()
    }


    removeTodo(id: string): void {
        this._todoList = this._todoList.filter(t=>t.id!=id)
        this.save()
    }

    getTodo(id: string): Todo {
        let todo = new Todo(id,"")
        this._todoList.forEach(t=>t.id==id?todo=t:todo)
        return todo
    }


    updateTodo(todo: Todo): void {
        this.removeTodo(todo.id)
        this._todoList.push(todo)
        this.save()
    }


    todoListDone(): Todo[] {
        return this._todoList.filter(t=>t.status==true)
    }


    todoListNotDone(): Todo[] {
        return this._todoList.filter(t=>t.status==false)
    }

    save(): void {
        localStorage.setItem("todoList",JSON.stringify(this._todoList))
    }


    load(): void {
        const todoListLocalstorage = localStorage.getItem("todoList")

        if(typeof todoListLocalstorage!="string")return

        const getTodoList:Todo[]= JSON.parse(todoListLocalstorage)

        getTodoList.forEach(t=>{
            let todo = new Todo(t.id,t.item)
            this.addTodo(todo)
        })
    }

    clearListTodo(): void {
        this._todoList=[]
        this.save()
    }

}