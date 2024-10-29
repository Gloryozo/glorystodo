import { useState } from 'react'; // Import the useState Hook to manage state in our component.
import './App.css'; // Import the CSS file for styling our app.

function App() {
  // We create a state variable called 'task' to hold the current task input by the user.
  // 'setTask' is a function that updates the 'task' state.
  const [task, setTask] = useState('');
  
  // We create another state variable called 'tasks' which is an array to hold all the tasks.
  // 'setTasks' is a function that updates the 'tasks' state.
  const [tasks, setTasks] = useState([]);

  // This function adds the current task to the tasks array when called.
  const addTask = () => {
    setTasks([...tasks, task]); // Add the new task to the existing list of tasks.
    setTask(''); // Clear the input field after adding the task.
  }

  // This function deletes a task from the tasks array when called.
  const deleteTask = (deleted) => {
    // Create a new array without the deleted task.
    const withoutRemoved = tasks.filter((item) => item !== deleted);
    setTasks(withoutRemoved); // Update the tasks state with the new array.
  }

  return (
    <div id="container"> {/* Main container for our app */}
      <h1>Glory's Todo App</h1> {/* Title of the app */}
      {/* A simple form to add new tasks */}
      <form>
        <input 
          type="text" 
          placeholder="Add a task" 
          value={task} // Bind the input value to the 'task' state
          onChange={e => setTask(e.target.value)} // Update 'task' state when user types
          onKeyDown={e => {
            // Check if the Enter key is pressed
            if (e.key === 'Enter'){
              e.preventDefault() // Prevent the default form submission
              addTask() // Call the addTask function
            }
          }}
        />
      </form>
      <ul> {/* Unordered list to display the tasks */}
        {tasks.map((item) => ( // Loop through each task in the tasks array
          <li key={item}> {/* Each task is a list item */}
            {item} {/* Display the task */}
            {/* Button to delete the task */}
            <button className='delete-button' onClick={() => deleteTask(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; // Export the App component so it can be used in other files.
