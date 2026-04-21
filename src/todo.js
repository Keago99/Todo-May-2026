//todo logic here
function createTodo(title, description, dueDate, priority){
    
    let completed = false

    const getCompleted = () => completed;

    const todoID = crypto.randomUUID();

    const getID = () => todoID;

    const getTitle = () => title;

    const getDescription = () => description;

    const getDueDate = () => dueDate;

    const getPriority = () => priority;

    const toggleCompleted = () => { completed = !completed };

    return { getID, getTitle, getDescription, getDueDate, getPriority, getCompleted, toggleCompleted};
}

export { createTodo };