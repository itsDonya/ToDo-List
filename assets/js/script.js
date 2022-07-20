const todoList = document.querySelector(".todo-list");
let todos = [];

// ToDo
class Todo {
    constructor(noteText) {
        this.text = noteText;
        this.isChecked = false;
    }
}

// Number of ToDos
const numberOfTodos = document.querySelector(".number-of-todos");
let todoCount = 0;
function showNumberOfTodos() {
    if(todoCount) {
        numberOfTodos.innerText = `You have ${todoCount} todos left`;
    } else {
        numberOfTodos.innerText = "You have no todos left"
    }
}
showNumberOfTodos();

// Load stuff from Local Storage
if(localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"))
    todos.filter(todo => {
        if(!todo.isChecked) todoCount ++;
    })
    showNumberOfTodos();
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
        todoCount ++;
        showNumberOfTodos();

        // Save to local Storage
        localStorage.setItem("todos", JSON.stringify(todos));
        showItems(todos);
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
function showItems(list) {
    todoList.innerHTML = "";
    list.forEach((todo, index) => {
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

        // Remove ToDo from List
        removeItem(removeBtn, todoItem, todo);
    })
}

function checkItem(checkbox, name, todo) {
    checkbox.addEventListener("change", (e) => {
        if(e.target.checked) {
            name.style.textDecoration = "4px #6e4499 line-through";
            todo.isChecked = true;
            localStorage.setItem("todos", JSON.stringify(todos));
            todoCount --;
            showNumberOfTodos();
        } else {
            name.style.textDecoration = "none";
            todo.isChecked = false;
            todoCount ++;
            showNumberOfTodos();
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    })
}

function removeItem(button, todoItem, todoClass) {
    button.addEventListener("click", () => {
        todos.splice(todos.indexOf(todoClass), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        if(!todoClass.isChecked) {
            todoCount --;
            showNumberOfTodos();
        }
        todoItem.remove();
    })
}

showItems(todos);

// Filters

let filter;
let filterList = [];
const filters = document.querySelectorAll("input[type=radio]");

filters.forEach(filterName => {
    filterName.addEventListener("change", () => {
        filter = filterName.id;
        switch(filterName.id) {
            case "all-todos":
                showItems(todos);
                break;
            case "completed-todos":
                filterCompletedItems();
                break;
            case "uncompleted-todos":
                filterUncompletedItems();
                break;
        }
    })
})

function filterCompletedItems() {
    filterList.length = 0;
    todos.filter(todo => {
        if(todo.isChecked) {
            filterList.push(todo);
            showItems(filterList);
        }
    })
    if(filterList.length === 0) {
        todoList.innerHTML = "";
    }
}

function filterUncompletedItems() {
    filterList.length = 0;
    todos.filter(todo => {
        if(!todo.isChecked) {
            filterList.push(todo);
            showItems(filterList);
        }
    })
    if(filterList.length === 0) {
        todoList.innerHTML = "";
    }
}

// Remove All ToDos
const removeAllBtn = document.querySelector(".remove-all");
removeAllBtn.addEventListener("click", () => {
    todos.length = 0;
    localStorage.setItem("todos", JSON.stringify(todos));
    todoCount = 0;
    showNumberOfTodos();
    todoList.innerHTML = "";
})