//todo logic here
function createTodo(title, description, dueDate, priority, existingID = null){
    
    let completed = false

    const getCompleted = () => completed;

    let todoID;

    if (existingID !== null){
        todoID = existingID;
    }
    else{
        todoID = crypto.randomUUID();
    }

    const getID = () => todoID;

    const setID = (newID) =>{
        todoID = newID;
    }

    const getTitle = () => title;

    const setTitle = (newTitle) =>{
        title = newTitle;
    }

    const getDescription = () => description;

    const setDescription = (newDesc) => {
        description = newDesc;
    }

    const getDueDate = () => dueDate;

    const setDueDate = (newDate) => {
        dueDate = newDate;
    }

    const getPriority = () => priority;

    const setPriority = (newPri) => {
        priority = newPri;
    }

    const toggleCompleted = () => { completed = !completed };

    return { getID, setID, getTitle, setTitle, getDescription, setDescription, getDueDate, setDueDate, getPriority, setPriority, getCompleted, toggleCompleted};
}

export { createTodo };