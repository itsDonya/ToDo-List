const todoList = document.querySelector(".todo-list");
let todos = [];

// ToDo
class Todo {
    constructor(noteText) {
        this.text = noteText;
        this.isChecked = false;
    }
}

// Load stuff from Local Storage
if(localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"))
}

// Create new todo
const newTodo = document.querySelector(".new-todo-input");
const newTodoBtn = document.querySelector(".new-todo-btn");

function addItem() {
    const name = newTodo.value;
    // Check if input is empty
    if (name) {
        const ToDo = new Todo(name);
        todos.push(ToDo);
        // Save to local Storage
        localStorage.setItem("todos", JSON.stringify(todos));
        showItems();
    }
    newTodo.value = "";
}

newTodoBtn.addEventListener("click", addItem);
window.addEventListener("keydown", (e) => {
    if(e.key==="Enter") {
        addItem();
    }
})

// Show Todos
function showItems() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const todoItem = document.createElement("li");
        todoItem.className = "todo";
        todoList.appendChild(todoItem);
        
        const div = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `todo-${index}`;
        if(todo.isChecked) checkbox.setAttribute("checked", "checked")
        const todoName = document.createElement("label");
        todoName.setAttribute("for", `todo-${index}`);
        todoName.innerText = todo.text;
        todoName.style.textDecoration = (todo.isChecked) ? "4px #6e4499 line-through" : "none";
        div.appendChild(checkbox);
        div.appendChild(todoName);
        todoItem.appendChild(div);
    
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.innerText = "Remove";
        todoItem.appendChild(removeBtn);

        // Add event to checkbox
        checkItem(checkbox, todoName, todo);
    })
}

function checkItem(checkbox, name, todo) {
    checkbox.addEventListener("change", (e) => {
        if(e.target.checked) {
            name.style.textDecoration = "4px #6e4499 line-through";
            todo.isChecked = true;
            localStorage.setItem("todos", JSON.stringify(todos));
        } else {
            name.style.textDecoration = "none";
            todo.isChecked = false;
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    })
}

showItems();