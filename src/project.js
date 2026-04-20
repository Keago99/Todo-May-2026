// project logic here

function createProject(name){
    //code here
    let projectTodos = [];

    const projectID = crypto.randomUUID();

    const getID = () => projectID;

    const getTodos = () => projectTodos;

    const getName = () => name;

    const addTodo = (todo) => {
        projectTodos.push(todo);
    }

    const removeTodo = (todoID) => {
        projectTodos = projectTodos.filter(todo => todo.ID !== todoID)
    }

    return { getID, getTodos, getName, addTodo, removeTodo };
}