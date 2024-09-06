interface Task{
    id:number,
    text:String,
    completed:boolean
}

const input = document.getElementById('add') as HTMLInputElement;
const btn=document.getElementById('btn') as HTMLButtonElement;
const lists=document.getElementById('lists') as HTMLUListElement;

btn.addEventListener("click",add);

let tasks:Task[]=loadItems();

function render(){
    lists.innerHTML=''
    tasks.forEach((value)=>{
        const li =document.createElement('li')
        const span=document.createElement('span')
        span.textContent+=value.text;
        span.className= value.completed?"completed":"spantext";
        li.append(span);
        const DeleteButton=document.createElement('button')
        DeleteButton.textContent='Delete'
        DeleteButton.type='button'
        DeleteButton.className='dltbtn'
        DeleteButton.onclick=()=>deleteitem(value.id)
        li.append(DeleteButton);

        const MarkButton=document.createElement('button')
        MarkButton.textContent='Mark as done'
        MarkButton.type='button'
        MarkButton.className='mrkbtn'
        MarkButton.onclick=()=>Markitem(value.id)
        li.append(MarkButton);
        lists.append(li);

    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function Markitem(id:number){
    tasks.forEach((task)=>{
        if(task.id===id){
            task.completed=!task.completed;
        }
    })
    render();
}
function deleteitem(id:number){
tasks=tasks.filter((item)=>{
    return item.id!=id;
})
render();
}

function add(){
    const val=input.value;
    if(val){

        const newTask:Task={
            id:Date.now(),
            text:val,
            completed:false
        }
        tasks.push(newTask);
        render();
        input.value="";
    }
    if(val==''){
        alert('Enter item')
    }
}


function loadItems():Task[]{
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        return JSON.parse(storedTasks);
    }
    return [];  

}

render();