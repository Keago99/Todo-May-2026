import * as projectsManager from "./projectsManager.js";
import * as modal from "./modal.js";
import * as project from "./project.js";

const showTodoDialog = () =>{
    const todoDialog = document.querySelector("#todoDialog");

    const addTodoBtn = document.querySelector("#addTodoBtn");

    addTodoBtn.addEventListener("click", () =>{
        todoDialog.showModal();
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
        projectDiv.classList.toggle("activeProject");
        console.log(`the active project is ${project.getName()}`);
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
            const projectDeleted = projectsManager.deleteProject(project);
            projectsManager.setActiveProject(null);
            console.log(`The active project is ${projectsManager.returnActiveProject()}`);
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

    projectDiv.append(deleteBtn);
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
    priority.textContent = getPriority();

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

    todoCard.append(title, description, dueDate, priority, completed);
    
    return todoCard;
}


const renderProjects = () =>{
    const projectArea = document.querySelector("#projectArea");
    let projects = projectsManager.returnProjects();

    projectArea.innerHTML = "";

    projects.forEach(project => {
        const projectDiv =createProjectElement(project);
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

    const name = document.querySelector("#todoName");

    const desc = document.querySelector("#todoDescription");

    const date = document.querySelector("#todoDueDate");

    const priority = document.querySelector("#todoPriority");

    if (!name || !desc || !date || !priority){
        alert("Please fill in all missing fields");
        return;
    }
    else{
        const newTodo = project.createProject(name, desc, date, priority);
        currentProject.addTodo(newTodo);
        console.log(currentProject.getTodos())
    }
}

//composite function that will be exported to index.js on launch
const displayStartup = () => {
    showProjectDialog();
    closeProjectDialog();
    addProjectDialogEvent();
    showTodoDialog();
    closeTodoDialog();
}

export { showProjectDialog, closeProjectDialog, addProjectDialogEvent, showTodoDialog, closeTodoDialog, displayStartup };