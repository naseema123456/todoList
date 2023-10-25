import { Component, TemplateRef } from '@angular/core';
import { Todo } from '../class/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
todoValue: String='';

todoList: Todo[]=[
  {
    content:"Todo 1",
    value:false
  },
  {
    content:"Todo 2",
    value:false
  },
  {
    content:"Todo 3",
    value:false
  }
];
finishedList:Todo[]=[

]
constructor(private modalService:NgbModal){}
changeTodo(i:number){
const item=this.todoList.splice(i,1);
this.finishedList.push(item[0])
}
addTodo() {
  const normalizedTodoValue = this.todoValue.replace(/\s+/g, ' ').trim().toLowerCase();

  if (normalizedTodoValue === '') {
    alert("Cannot add, it's an empty string");
    return;
  }

  if (this.todoList.some(todo => todo.content.replace(/\s+/g, ' ').trim().toLowerCase() === normalizedTodoValue)) {
    alert('This value already exists');
    return;
  }

  this.todoList.push({
    content: this.todoValue,
    value: false
  });

  this.todoValue = ''; // Clear the input field
}

changeFinished(i:number){
  const item=this.finishedList.splice(i,1);
this.todoList.push(item[0])
}
openModal(content:TemplateRef<Element>,i:number, type:String){
  this.modalService.open(content, {ariaLabelledBy:'modal-basic-title'}).result.then(
    (result)=>{
if(type=='todoList'){
  this.todoList.splice(i,1)
}else{
  this.finishedList.splice(i,1)
}
    },(reason)=>{

    }
  )
}
}
