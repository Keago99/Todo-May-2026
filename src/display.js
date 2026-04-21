import * as projectsManager from "./projectsManager.js";

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
    // Line below might be unecessary
    deleteBtn.dataset.ID = project.getID();


    deleteBtn.addEventListener("click", (e) =>{
        //prevents the bubbled up chain reaction
        e.stopPropagation();
        const projectDeleted = projectsManager.deleteProject(project);
        if(projectDeleted){
            console.log("project deleted");
            renderProjects();
            return true;
        }
        else{
            alert("error!");
            return false;
        }
    });

    projectDiv.append(deleteBtn);
    return projectDiv;
}

const createTodoCard = (todo) =>{

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


export { showProjectDialog, closeProjectDialog };