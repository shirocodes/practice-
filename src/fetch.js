document.addEventListener("DOMContentLoaded", function () {
    
    const API_URL = "http://localhost:3000/task";

    //fetching the tasks from the API
    // fetchTasks() needs to be updatable on add, toggle and delete
    async function fetchTasks() {
        try {
            // Fetch tasks from the server (asynchronous operation)
            const response = await fetch(API_URL);

            console.log("not json-object like response:", JSON.stringify(response));

            // Convert the response to JSON (returns a promise, hence `await` is used)
            const tasks = await response.json();
            console.log("json-object like response:", tasks);

            // Populate the list with fetched tasks
            document.getElementById("taskList").innerHTML = tasks.map(task => {
                return `<li>
                   ${task.text} - ${task.completed ? "Completed" : "Not Completed"}
                   <button onclick="toggleTask(${task.id}, ${task.completed})">Toggle</button>
                   <button onclick="deleteTask(${task.id})">Delete</button> 
                </li>`;
            }).join("");
        } catch (error) {
            console.error("Cant fetch the tasks:", error);
        }
    }

    //a PATCH request - handling a complete status
    async function toggleTask(id, completed) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !completed }) // Toggle completion
            });

            // Refresh task list after updating
            fetchTasks();
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    }

    // handling the delete 
    async function deleteTask(id) {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchTasks(); // Refresh task list after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    
    // Handling POST request - Adding new tasks
    
    async function addTask() {
        const taskInput = document.getElementById("taskInput");
        
        if (!taskInput.value.trim()) return; //validating inputs

        // let nextId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
            //This is the approach i was trying to change the IDs status 
            // + i also changed my body to also target the ID.
            //as a result, my fetched tasks incremented instead to about 352 (Check in my console)
        try {
            // Send a new task to the API
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({text: taskInput.value, completed: false })
            });

            // Clear input field after adding task
            taskInput.value = "";
            
            // Refresh task list to show the new task
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    // when the addtask button is clicked - event listener
    document.getElementById("addTask").addEventListener("click", addTask);


    window.toggleTask = toggleTask;
    window.deleteTask = deleteTask;

    fetchTasks();
});
