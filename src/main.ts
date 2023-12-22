import "../public/style.css"
import { Todo } from "./model/todo"
import { TodoServiceImpl } from "./service/todoServiceImpl"
import { TodoTemplateImpl } from "./template/todoTemplateImpl"

const main = ()=>{
  let todoService = TodoServiceImpl.getInstance()
  let todoTemplate = TodoTemplateImpl.getInstance()

  const form = document.getElementById("form-todo") as HTMLFormElement

  form.addEventListener("submit",(event:SubmitEvent)=>{
    event.preventDefault()
    const inputItem = document.getElementById("todo-entry") as HTMLInputElement

    const newItem:string = inputItem.value.trim()

    if(!newItem.length)return

    let newTodoId:number = todoService.todoList.length
    ?parseInt(todoService.todoList[todoService.todoList.length-1].id+1):1 

    let todo:Todo = new Todo(newTodoId.toString(), newItem)

    todoService.addTodo(todo)
    clearbtn.classList.remove("active")
    donebtn.classList.remove('active')
    notDonebtn.classList.remove('active')
    allbtn.classList.add('active')

    todoTemplate.render(todoService, todoService.todoList)
  })


  const clearbtn = document.getElementById("clear-all-todo") as HTMLButtonElement
  clearbtn.addEventListener("click", ()=>{
    todoService.clearListTodo()
    todoTemplate.clear()
    clearbtn.classList.add("active")
    donebtn.classList.remove('active')
    notDonebtn.classList.remove('active')
    allbtn.classList.remove('active')
    todoTemplate.render(todoService,todoService.todoList)
  })

  const donebtn = document.getElementById("done") as HTMLButtonElement
  donebtn.addEventListener("click", ()=>{
    clearbtn.classList.remove("active")
    donebtn.classList.add('active')
    notDonebtn.classList.remove('active')
    allbtn.classList.remove('active')
    todoTemplate.render(todoService,todoService.todoListDone())
  })

  const notDonebtn = document.getElementById("not-done") as HTMLButtonElement
    notDonebtn.addEventListener("click", ()=>{
    clearbtn.classList.remove("active")
    donebtn.classList.remove('active')
    notDonebtn.classList.add('active')
    allbtn.classList.remove('active')
    todoTemplate.render(todoService,todoService.todoListNotDone())
  })

  const allbtn = document.getElementById("all") as HTMLButtonElement
  allbtn.addEventListener("click", ()=>{
    clearbtn.classList.remove("active")
    donebtn.classList.remove('active')
    notDonebtn.classList.remove('active')
    allbtn.classList.add('active')
    todoTemplate.render(todoService,todoService.todoList)
  })


  todoService.load()
  todoTemplate.render(todoService,todoService.todoList)


}


document.addEventListener("DOMContentLoaded",main)