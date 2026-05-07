import * as projectsManager from "./projectsManager.js";
import * as modal from "./modal.js";
import * as project from "./project.js";
import * as todo from "./todo.js";
import * as localStorage from "./localStorage.js";

const showTodoDialog = () =>{
    const todoDialog = document.querySelector("#todoDialog");

    const addTodoBtn = document.querySelector("#addTodoBtn");

    addTodoBtn.addEventListener("click", () =>{
        if(projectsManager.returnActiveProject() === null){
            alert("please select an active project!");
            return;
        }else{
            todoDialog.showModal();
        }
  
    });
}


const showProjectDialog = () =>{
    const projectDialog = document.querySelector("#projectDialog");
    const addProjectBtn = document.querySelector("#addProjectBtn");

    addProjectBtn.addEventListener("click", () => {
        projectDialog.showModal();
    });
};

const closeProjectDialog = () =>{
    const projectDialog = document.querySelector("#projectDialog");
    const closeDialogBtn = document.querySelector("#dialogProjectCloseBtn");

    closeDialogBtn.addEventListener(("click"), () =>{
        clearProjectDialogInput();
        projectDialog.close();
    });
};

const createProjectElement = (project) =>{
    const projectDiv = document.createElement("div");
    projectDiv.className = "project-item";
    projectDiv.textContent = project.getName();
    projectDiv.dataset.projectID = project.getID();
    

    projectDiv.addEventListener("click", () =>{
        projectsManager.setActiveProject(project);
        document.querySelectorAll(".activeProject").forEach(projDiv => {
            projDiv.classList.remove("activeProject");
        });
        projectDiv.classList.add("activeProject");
        renderTodos(project);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "projectDeleteBtn";
    deleteBtn.innerHTML = "❌";


    deleteBtn.addEventListener("click", (e) =>{
        //prevents the bubbled up chain reaction
        e.stopPropagation();
        const userConfirmed = confirm(`Are you sure you want to delete ${project.getName()}?`);
        if (userConfirmed){
            const cardArea = document.querySelector("#cardArea");
            cardArea.innerHTML = "";
            const projectDeleted = projectsManager.deleteProject(project);
            projectsManager.setActiveProject(null);
            if(projectDeleted){
                console.log("project deleted");
                renderProjects();
            }
            else{
                alert("error!");
            }
        }
        else{
            console.log("user decided not to delete");
        }
    });

    const editButton = document.createElement("button");
    editButton.classList.add("projectDeleteBtn");
    editButton.innerHTML = "🖊️";

    editButton.addEventListener("click", (e) =>{
        e.stopPropagation();
        const newName = prompt("Rename project", project.getName());
        if(newName && newName.trim() !== ""){
            project.rename(newName.trim());
            renderProjects();
        }
    });

    projectDiv.append(editButton,deleteBtn);
    return projectDiv;
}

const createTodoElement = (todo) => {
    const todoCard = document.createElement("div");
    todoCard.className = "todoCard";

    const title = document.createElement("div");
    title.className = "todoTitle";
    title.textContent = todo.getTitle();

    const description = document.createElement("div");
    description.className = "todoDescription";
    description.textContent = todo.getDescription();

    const dueDate = document.createElement("div");
    dueDate.className = "todoDueDate";
    dueDate.textContent = todo.getDueDate();

    const priority = document.createElement("div");
    priority.className = "todoPriority";
    priority.textContent = todo.getPriority();

    const completed = document.createElement("div");
    completed.className = "todoCompleted";
    const todoComplete = todo.getCompleted();
    // short if statment to change completed to something more presentable
    if (todoComplete === false){
        completed.textContent = "Not completed";
    }
    else{
        completed.textContent = "Completed";
    }

    const completedButton = document.createElement("button");
    completedButton.classList.add("todoCompletedButton");
    completedButton.innerText = "✅";

    completed.append(completedButton);

    completedButton.addEventListener("click", (e) => {
        e.stopPropagation();
        todo.toggleCompleted();
        const currentProject = projectsManager.returnActiveProject();
        renderTodos(currentProject);
    })

    const buttonSection = document.createElement("div");
    buttonSection.classList.add("todoButtonSection");
    
    const editButton = document.createElement("button");
    editButton.classList.add("todoEditButton");
    editButton.innerText = "Edit Todo 🖋️";

    editButton.addEventListener("click", (e) =>{
        e.stopPropagation();
        const todoEditDialog = document.querySelector("#todoEditDialog");

        document.querySelector("#todoEditName").value = todo.getTitle();

        document.querySelector("#todoEditDescription").value = todo.getDescription();

        document.querySelector("#todoEditDueDate").value = todo.getDueDate();

        document.querySelector("#todoEditPriority").value = todo.getPriority();

        todoEditDialog.dataset.editTodoID = todo.getID();

        todoEditDialog.showModal();
    });

    const deleteTodoButton = document.createElement("button")
    deleteTodoButton.classList.add("deleteTodoButton");
    deleteTodoButton.innerText = "Delete ❌";

    deleteTodoButton.addEventListener("click", (e) =>{
        e.stopPropagation();
        const currentProject = projectsManager.returnActiveProject();
        currentProject.removeTodo(todo);
        renderTodos(currentProject);
    });

    buttonSection.append(editButton, deleteTodoButton);

    todoCard.append(title, description, dueDate, priority, completed, buttonSection);
    
    return todoCard;
}


const renderProjects = () =>{
    const projectArea = document.querySelector("#projectArea");
    let projects = projectsManager.returnProjects();
    const activeProject = projectsManager.returnActiveProject();

    projectArea.innerHTML = "";

    projects.forEach(project => {
        const projectDiv =createProjectElement(project);
        if (project === activeProject){
            projectDiv.classList.add("activeProject");
        }
        projectArea.append(projectDiv)
    });

}

const renderTodos = (project) =>{
    const cardArea = document.querySelector("#cardArea");
    cardArea.innerHTML = "";
    let todos = project.getTodos();

    todos.forEach(todo => {
        const todoCard = createTodoElement(todo);
        cardArea.append(todoCard);
    });
    console.log(`rendered todo of ${project.getName()}`);
}

const clearProjectDialogInput = () => {
    const projectDialogInput = document.querySelector("#projectName");

    projectDialogInput.value = "";
}

const addProjectDialogEvent = () =>{
    const dialogProjectAddBtn = document.querySelector("#dialogProjectAddBtn");
    const dialogProject = document.querySelector("#projectDialog");

    dialogProjectAddBtn.addEventListener("click", () => {
        modal.modalAddProject();
        renderProjects();
        clearProjectDialogInput();
        localStorage.saveProjects();
        dialogProject.close();

    })
}

const closeTodoDialog = () =>{
    const todoDialog = document.querySelector("#todoDialog");
    const closeDialogBtn = document.querySelector("#dialogTodoCloseBtn");

    closeDialogBtn.addEventListener("click", () => {
        todoDialog.close();
    })
}

const addTodoDialog = () =>{
    const todoDialog = document.querySelector("#todoDialog");

    const currentProject = projectsManager.returnActiveProject();

    const name = document.querySelector("#todoName").value.trim();

    const desc = document.querySelector("#todoDescription").value.trim();

    const date = document.querySelector("#todoDueDate").value.trim();

    const priority = document.querySelector("#todoPriority").value.trim();

    if (!name || !desc || !date || !priority){
        alert("Please fill in all missing fields");
        return false;
    }
    else{
        const newTodo = todo.createTodo(name, desc, date, priority);
        currentProject.addTodo(newTodo);
        todoDialog.close();
        clearTodoDialog();
        renderTodos(currentProject);
        return true;
    }
}

const EditTodoDialog = () => {
    const todoEditDialog = document.querySelector("#todoEditDialog");

    const title = document.querySelector("#todoEditName").value.trim();

    const description = document.querySelector("#todoEditDescription").value.trim();

    const dueDate = document.querySelector("#todoEditDueDate").value;

    const priority = document.querySelector("#todoEditPriority").value;

    const todoID = todoEditDialog.dataset.editTodoID;
    console.log(todoID,"is the ID");
    if(!todoID){
        alert("Todo not found, how did this happen!?");
        return false;
    }

    const currentProject = projectsManager.returnActiveProject();
    const todos = currentProject.getTodos();
    const todoEdit = todos.find(t => t.getID() === todoID);

    todoEdit.setTitle(title);
    todoEdit.setDescription(description);
    todoEdit.setDueDate(dueDate);
    todoEdit.setPriority(priority);
    renderTodos(currentProject);
    todoEditDialog.close();

    delete todoEditDialog.dataset.editTodoID;
    return true;
}

const clearTodoDialog = () => {
    document.querySelector("#todoName").value = "";
    document.querySelector("#todoDescription").value = "";
    document.querySelector("#todoDueDate").value = "";
    document.querySelector("#todoPriority").value = "Medium 🟡";  // default
}

const addTodoDialogEvent = () => {
    const dialog = document.querySelector("#todoDialog");
    const addBtn = document.querySelector("#dialogTodoAddBtn");

    addBtn.addEventListener("click", () =>{
        const addedTodo = addTodoDialog();
        if(addedTodo){
            console.log("todo added");
            localStorage.saveProjects();
        }
        else{
            console.log("todo not added");
        }
    });
}

const closeEditTodoDialog = () => {
    const todoEditDialog = document.querySelector("#todoEditDialog");

    todoEditDialog.close()
}

const closeEditTodoDialogEvent = () =>{
    const closeButton = document.querySelector("#dialogEditsClose");
    closeButton.addEventListener("click", closeEditTodoDialog);
}

const editTodoDialogBtnEvent = () => {
    const editTodoButton = document.querySelector("#dialogSaveEdits");

    editTodoButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const edited = EditTodoDialog();

        if (edited){
            localStorage.saveProjects();
        }
    })
}

//composite function that will be exported to index.js on launch
const displayStartup = () => {
    showProjectDialog();
    closeProjectDialog();
    addProjectDialogEvent();
    showTodoDialog();
    closeTodoDialog();
    addTodoDialogEvent();
    closeEditTodoDialogEvent();
    editTodoDialogBtnEvent();
}

export { showProjectDialog, closeProjectDialog, addProjectDialogEvent, showTodoDialog, closeTodoDialog, displayStartup, renderProjects,renderTodos };