const addBtn = document.getElementById("btn");
const userTodo = document.getElementById("input");
const todoData = document.getElementById("todo-data");

const todos = JSON.parse(localStorage.getItem("todos")) ?? [];

addBtn.addEventListener("click", addTodos);

userTodo.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        addTodos();
    }
})

function addTodos(){
    if(userTodo.value === ""){
        alert("Todo cannot be empty! Try adding some Todo!");
    }
    else{
        if(userTodo.code === "Enter"){
            console.log("enter")
        }
        let newTodo = userTodo.value;
        userTodo.value = ""
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        console.log(todos);
        displayTodos();
    }
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos(){
    todoData.innerText = "";
    todos.forEach((todo, index) => {
        let div = document.createElement("div");
        div.setAttribute("class","tasks");

        let p = document.createElement("p");
        // p.classList.add("para");
        p.setAttribute("class","para");
        p.innerText = todo;

        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.setAttribute("class","delete");

        delBtn.addEventListener("click",()=>{
            todos.splice(index, 1);
            saveTodos();
            displayTodos();
        });

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.setAttribute("class","edit");

        editBtn.addEventListener("click",()=>{
            let input = document.createElement("input");
            let oldVal = p.innerText;
            input.value = p.innerText;
            input.classList.add("todo-input-box");
            div.replaceChild(input, p);

            input.addEventListener("blur",()=>{
                if(input.value.trim() === ""){
                    p.innerText = oldVal;
                }
                else{
                    p.innerText = input.value;
                    todos[index] = input.value;
                    saveTodos();
                }
                div.replaceChild(p, input);
            });
            input.focus()
        }); 

        div.appendChild(p);
        div.appendChild(delBtn);
        div.appendChild(editBtn);

        todoData.appendChild(div);
    });
}

displayTodos();