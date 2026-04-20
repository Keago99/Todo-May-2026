//todo logic here
function createTodo(title, description, dueDate, priority){
    // code here
    const todoID = crypto.randomUUID();

    const getID = () => todoID;

    const getTitle = () => title;

    const getDescription = () => description;

    const getDueDate = () => dueDate;

    const getPriority = () => priority;



    return { getID, getTitle, getDescription, getDueDate, getPriority };
}