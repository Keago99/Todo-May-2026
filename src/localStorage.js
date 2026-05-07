import * as display from "./display.js";
import { createProject } from "./project.js";
import * as projectsManager from "./projectsManager.js";
import { createTodo } from "./todo.js";

const saveProjects = () => {
    const projects = projectsManager.returnProjects();
    const activeProject = projectsManager.returnActiveProject();

    // creating strings for saving in JSON
    const projectData = projects.map(project => ({
        ID: project.getID(),
        name: project.getName(),
        todos: project.getTodos().map(todo => ({
            ID: todo.getID(),
            title: todo.getTitle(),
            description: todo.getDescription(),
            dueDate: todo.getDueDate(),
            priority: todo.getPriority(),
            completed: todo.getCompleted()
        }))
    }));

    localStorage.setItem("projects", JSON.stringify(projectData));

    // Project ID for active project
    const ActiveID = activeProject.getID();
    localStorage.setItem("activeProjectID", ActiveID);
};


const loadProjects = () => {
    const savedProjects = localStorage.getItem("projects");
    const savedActiveID = localStorage.getItem("activeProjectID");

    if(!savedProjects){
        projectsManager.setDefaultProject();
        return;
    }


    const projectData = JSON.parse(savedProjects);

    projectData.forEach(projData => {
        const project = createProject(projData.name, projData.ID);

        projData.todos.forEach(todoData =>{
            const todo = createTodo(
                todoData.title,
                todoData.description,
                todoData.dueDate,
                todoData.priority,
                todoData.existindID
            );
            if (todoData.completed){
                todo.toggleCompleted();
            }

            project.addTodo(todo);
        });

        projectsManager.addProject(project);
    });

    if(savedActiveID){
        console.log(savedActiveID);
        const activeProject = projectsManager.returnProjects().find(p => p.getID() === savedActiveID);
        console.log("it worked, the savedActiveID!");
        console.log(activeProject);
        if(activeProject){
            projectsManager.setActiveProject(activeProject);
            display.renderProjects();
            display.renderTodos(activeProject);
        }
    }
}



export { saveProjects, loadProjects };