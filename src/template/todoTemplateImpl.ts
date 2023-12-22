import { Todo } from "../model/todo";
import { TodoServiceImpl } from "../service/todoServiceImpl";
import { TodoTemplateI } from "./todoTemplateI";

export class TodoTemplateImpl implements TodoTemplateI{

    ul:HTMLUListElement

    private static intance:TodoTemplateImpl
    clearButton = document.getElementById("clear-all-todo") as HTMLButtonElement
    todoButtonDone = document.getElementById("done") as HTMLButtonElement
    todoButtonAll = document.getElementById("all") as HTMLButtonElement
    totoButtonNotDone = document.getElementById("not-done") as HTMLButtonElement

    constructor(){this.ul = document.getElementById("todoList") as HTMLUListElement}

    static getInstance():TodoTemplateImpl{
        if(!TodoTemplateImpl.intance){
            TodoTemplateImpl.intance =new TodoTemplateImpl()
        }
        return TodoTemplateImpl.intance
    }

    clear(): void {
        this.ul.innerHTML = ""
    }

    render(todoService: TodoServiceImpl, todoList: Todo[]): void {
        this.clear()

        todoList.forEach(todo=>{
            const li = document.createElement("li") as HTMLLIElement
            li.className ="todo list-group-item d-flex align-items-center is-completed"

            const checkInput = document.createElement("input") as HTMLInputElement
            checkInput.className = "form-check-input"
            checkInput.type = "checkbox"
            checkInput.checked = todo.status
            checkInput.id = todo.id
            checkInput.tabIndex = 0
            li.appendChild(checkInput)
            
            const label = document.createElement("label") as HTMLLabelElement
            label.className = "ms-2 form-check-label"
            label.htmlFor = todo.id
            label.innerHTML = todo.status == true?`<strike>${todo.item}</strike>`:todo.item
            li.appendChild(label)

            checkInput.addEventListener("change",()=>{
                todo.status = !todo.status
                label.innerHTML = todo.status == true?`<strike>${todo.item}</strike>`:todo.item
                todoService.save()
            })

            const editebtn = document.createElement("button") as HTMLButtonElement
            editebtn.className = "ms-auto btn btn-success btn-sm mx-3"
            const editeIcone = document.createElement("i") as HTMLLIElement
            editeIcone.className = "bi-pencil"
            editebtn.appendChild(editeIcone)
            li.appendChild(editebtn)

            const deletebtn = document.createElement("button") as HTMLButtonElement
            deletebtn.className = "btn btn-danger btn-sm"
            const deleteIcone = document.createElement("i") as HTMLLIElement
            deleteIcone.className = "bi-trash"
            deletebtn.appendChild(deleteIcone)
            li.appendChild(deletebtn)

            deleteIcone.addEventListener("click", ()=>{
                let conf = confirm("voulez-vous vraiment supprimé cette tâche?")
                if(conf){
                    todoService.removeTodo(todo.id)
                    this.clearButton.classList.remove("active")
                    this.todoButtonDone.classList.remove('active')
                    this.totoButtonNotDone.classList.remove('active')
                    this.todoButtonAll.classList.add('active')
                    this.render(todoService,TodoServiceImpl.getInstance().todoList)
                }
            })

            const modal = document.getElementById("favDialog") as HTMLDialogElement
            const modalTodoId = document.getElementById("todoId") as HTMLInputElement
            const modalcheck = document.getElementById("check") as HTMLInputElement
            const modaltextarea = document.getElementById("texte") as HTMLTextAreaElement
            const modalUpdatebtn = document.getElementById("update") as HTMLButtonElement

            editebtn.addEventListener("click",()=>{
                let gettodo:Todo = todoService.getTodo(todo.id)
                modalTodoId.value=gettodo.id
                modaltextarea.value = gettodo.item
                modalcheck.checked = gettodo.status
                modal.showModal()
            })

            modalUpdatebtn.addEventListener("click",()=>{
                let todo = new Todo( modalTodoId.value,modaltextarea.value, modalcheck.checked)
                todoService.updateTodo(todo)
                this.clearButton.classList.remove("active")
                this.todoButtonDone.classList.remove('active')
                this.totoButtonNotDone.classList.remove('active')
                this.todoButtonAll.classList.add('active')
                this.render(todoService,TodoServiceImpl.getInstance().todoList)
            })

            this.ul.appendChild(li)

        })
    }

}