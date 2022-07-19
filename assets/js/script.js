const todoList = document.querySelector(".todo-list");
const todos = [];

// ToDo
class Todo {
    constructor(noteText) {
        this.text = noteText;
    }
}

// Create new todo
const newTodo = document.querySelector(".new-todo-input");
const newTodoBtn = document.querySelector(".new-todo-btn");
// let ToDo;

newTodoBtn.addEventListener("click", () => {
    const name = newTodo.value;
    // Check if input is empty
    if (name) {
        const ToDo = new Todo(name);
        todos.push(ToDo);
        showItems();
    }
    newTodo.value = "";
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
        const todoName = document.createElement("label");
        todoName.setAttribute("for", `todo-${index}`);
        todoName.innerText = todo.text;
        div.appendChild(checkbox);
        div.appendChild(todoName);
        todoItem.appendChild(div);
    
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.innerText = "Remove";
        todoItem.appendChild(removeBtn);

        // Add event to checkbox
        removeItem(checkbox, todoName);
    })
}

function removeItem(checkbox, name) {
    checkbox.addEventListener("change", (e) => {
        if(e.target.checked) {
            name.style.textDecoration = "4px #6e4499 line-through";
        } else {
            name.style.textDecoration = "none";
        }
    })
}

showItems();