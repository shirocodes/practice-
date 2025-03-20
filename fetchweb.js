// document.addEventListener("DOMContentLoaded", function () {
//     // Step 1: Define the API URL (Assuming JSON server is running locally)
//     const API_URL = "http://localhost:3000/task";

//     /**
//      * Step 2: Fetch all tasks from the API and display them in the DOM
//      * This function runs initially and after every update (add, delete, toggle)
//      */
//     async function fetchTasks() {
//         try {
//             // Fetch tasks from the server (asynchronous operation)
//             const response = await fetch(API_URL);
//             console.log("Raw Response:", JSON.stringify(response));

//             // Convert the response to JSON (returns a promise, hence `await` is used)
//             const tasks = await response.json();
//             console.log("Parsed Tasks:", tasks);

//             // Populate the list with fetched tasks
//             document.getElementById("taskList").innerHTML = tasks.map(task => {
//                 return `<li>
//                    ${task.text} - ${task.completed ? "Completed" : "Not Completed"}
//                    <button onclick="toggleTask(${task.id}, ${task.completed})">Toggle</button>
//                    <button onclick="deleteTask(${task.id})">Delete</button> 
//                 </li>`;
//             }).join("");
//         } catch (error) {
//             console.error("Error fetching tasks:", error);
//         }
//     }

//     /**
//      * Step 3: Toggle Task Completion Status (PATCH Request)
//      * @param {number} id - Task ID
//      * @param {boolean} completed - Current completion status
//      */
//     async function toggleTask(id, completed) {
//         try {
//             await fetch(`${API_URL}/${id}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ completed: !completed }) // Toggle completion
//             });

//             // Refresh task list after updating
//             fetchTasks();
//         } catch (error) {
//             console.error("Error toggling task:", error);
//         }
//     }

//     /**
//      * Step 4: Delete Task (DELETE Request)
//      * @param {number} id - Task ID
//      */
//     async function deleteTask(id) {
//         try {
//             await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//             fetchTasks(); // Refresh task list after deletion
//         } catch (error) {
//             console.error("Error deleting task:", error);
//         }
//     }

//     /**
//      * Step 5: Add a New Task (POST Request)
//      */
//     async function addTask() {
//         const taskInput = document.getElementById("taskInput");
        
//         // Validate input: prevent empty tasks
//         if (!taskInput.value.trim()) return;

//         try {
//             // Send a new task to the API
//             await fetch(API_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ text: taskInput.value, completed: false })
//             });

//             // Clear input field after adding task
//             taskInput.value = "";
            
//             // Refresh task list to show the new task
//             fetchTasks();
//         } catch (error) {
//             console.error("Error adding task:", error);
//         }
//     }

//     // Step 6: Attach event listener to the Add Task button
//     document.getElementById("addTask").addEventListener("click", addTask);

//     // Step 7: Expose toggle and delete functions globally for button clicks
//     window.toggleTask = toggleTask;
//     window.deleteTask = deleteTask;

//     // Step 8: Fetch tasks on page load to populate the list
//     fetchTasks();
// });
