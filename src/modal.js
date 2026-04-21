// All code relating to modals go here, but not DOM related
import * as project from "./project.js"
import * as projectsManager from "./projectsManager.js";
import * as todo from "./todo.js";

const modalAddProject = () =>{
    const projectName = document.querySelector("#projectName").value.trim();

    const projects = projectsManager.returnProjects();

    // search through projects
    if(projectName){
        const nameExists = projects.some(project => project.getName() === projectName);
        if(nameExists){
            alert("Project name already exists!");
            return false;
        }
        else{
            const newProject = project.createProject(projectName);
            projectsManager.addProject(newProject);
            return true;
        }
    }
    else{
        alert("project name invalid, please retype project name");
        return false;
    }
}

const modalAddTodo = () =>{
    const todoName = document.querySelector("#todoName").value.trim();

    const todoDescription = document.querySelector("#todoDescription").value.trim();

    const todoDueDate = document.querySelector("#todoDueDate").value;

    const todoPriority = document.querySelector("#todoPriority").value;

    const project = projectsManager.returnActiveProject();

    if (!todoName || !todoDueDate || !todoPriority){
        alert("All fields must be filled in!");
        return;
    }
    else{
        const newTodo = todo.createTodo(todoName, todoDescription, todoDueDate, todoPriority);
        project.addTodo(newTodo);
        console.log(newTodo + "added");
    }
}

export { modalAddProject };