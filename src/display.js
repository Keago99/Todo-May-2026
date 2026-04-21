import * as projectsManager from "./projectsManager.js";
import * as modal from "./modal.js";

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
        projectDialog.close();
    });
};

const createProjectElement = (project) =>{
    const projectDiv = document.createElement("div");
    projectDiv.className = "project-item";
    projectDiv.textContent = project.getName();
    projectDiv.dataset.projectID = project.getID();

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

const createTodoCard = (todo) =>{
    const cardDiv = document.createElement("div");
    cardDiv.className = "cardDiv";

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

}

const addProjectDialogEvent = () =>{
    const dialogProjectAddBtn = document.querySelector("#dialogProjectAddBtn");

    dialogProjectAddBtn.addEventListener("click", () => {
        modal.modalAddProject();
        renderProjects();
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
}


export { showProjectDialog, closeProjectDialog, addProjectDialogEvent, showTodoDialog, closeTodoDialog };