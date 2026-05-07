Todo List App ✅

This project was a learning exercise and a revision of the Todo List project from The Odin Project. It's a fully functional todo application that lets you organize tasks into projects, with full create, read, update, and delete (CRUD) capabilities.

I built this to practice and solidify core JavaScript concepts, including:

    Modular architecture using ES6 modules

    Factory functions for creating projects and todos

    LocalStorage for data persistence across page reloads

    Separation of concerns (UI logic vs. application state)

    Dynamic DOM manipulation without frameworks

✨ Features

    Projects – Create, rename, and delete projects. An active project is always selected.

    Todos – Add, edit, delete, and mark todos as complete.

    Todo details – Each todo includes a title, description, due date, and priority (Low / Medium / High).

    Persistence – All projects and todos are saved to localStorage. Refresh the page without losing your data.

    Clean UI – A dark-themed interface with responsive layout, custom fonts, and emoji icons for intuitive controls.

🛠️ Technologies Used

    HTML5

    CSS3 (Flexbox, Grid, custom properties)

    JavaScript (ES6+)

    Webpack (module bundler)

    LocalStorage API

📚 What I Learned

This project highlighted both my strengths and the areas I need to improve. Key takeaways:

    Architecture matters – Planning how data flows between modules (localStorage.js, projectsManager.js, display.js) saved hours of debugging.

    Rehydration is tricky – Storing objects in localStorage is easy; restoring their methods required careful factory design.

    Small bugs cascade – One missing ID property broke active project restoration across the whole app.

    Finishing is a skill – Knowing when to stop adding features and call the project "done" is as important as writing the code.
