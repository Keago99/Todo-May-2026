// All code relating to modals go here, but not DOM related
import * as project from "./project.js"
import * as projectsManager from "./projectsManager.js";

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

export { modalAddProject };