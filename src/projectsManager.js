// manage the main storage and projects in totality

import { createProject } from "./project.js";

let projects = [];
let activeProject = null;

const returnProjects = () => projects;

const setProjects = (newProjects) => {
    projects = newProjects;
}

const setActiveProject = (newActiveProject) =>{
    activeProject = newActiveProject;
}

const returnActiveProject = () => activeProject;

// might include checking if this project exists already, or maybe do it in the modal section, unsure on this one
const addProject = (project) => {
    projects.push(project);
};

// find the project in the projects array and delete it
const deleteProject = (project) =>{
    const index = projects.findIndex(p => p.getID() === project.getID());
    if (index !== -1){
        projects.splice(index, 1);
        return true;
    }
    else{
        return false;
    }
}

export { returnProjects, setProjects, setActiveProject, returnActiveProject, addProject, deleteProject};