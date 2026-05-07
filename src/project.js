// project logic here

function createProject(name, existingID = null){
    //code here
    let projectTodos = [];

    let projectID;
    
    if (existingID !== null) {
        projectID = existingID;
    } else {
        projectID = crypto.randomUUID();
    }

    const getID = () => projectID;

    const setID = (newID) => {
        projectID = newID;
    }

    const getTodos = () => projectTodos;

    const getName = () => name;

    const rename = (newName) => {
        name = newName;
    }

    const addTodo = (todo) => {
        projectTodos.push(todo);
    }

    const removeTodo = (todo) => {
        projectTodos = projectTodos.filter(t => t.getID() !== todo.getID());
    }

    return { getID, getTodos, getName, addTodo, removeTodo, rename };
}

export { createProject };