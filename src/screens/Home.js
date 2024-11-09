import {  useEffect, useState } from 'react'; // Import the useState Hook to manage state in our component.
import './Home.css'; // Import the CSS file for styling our app.
import axios from 'axios'; // Import the axios library to make HTTP requests.
import Row from '../components/Row';              // Import the Row component to display each task.
import { useUser } from '../context/useUser'; // Import the custom hook for using the UserContext


const url = 'http://localhost:3001/';

function Home() {
  const { user } = useUser(); // Destructure the user object from the UserContext
  const [task, setTask] = useState(''); // State for current task input
  const [tasks, setTasks] = useState([]); // State for all tasks

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        alert(error.response.data.error ? error.response.data.error : error);
      });
  }, []);

  // Define the addTask function
  const addTask = () => {
     // Retrieve the token
     const headers = { headers: {Authorization: user.token} }
    axios.post(url + 'create', {
      description: task
    },headers)
    .then(response => {
      console.log(response);
      setTasks([...tasks, { id: response.data.id, description: task }]); // Add the new task to the existing list of tasks.
      setTask(''); // Clear the input field after adding the task.
    })
    .catch(error => {
      alert(error.response.data.error ? error.response.data.error : error);
    });
  };

  // Remove task from the list
  const deleteTask = (id) => {
    // Retrieve the token
    const headers = {headers: {Authorization:user.token}}
    axios.delete(url + 'delete/' + id,headers)
      .then(response => {
        const withoutRemoved = tasks.filter(item => item.id !== id);
        setTasks(withoutRemoved);
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error);
      })
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
      <ul>                  {/* Unordered list to display the tasks */}
        {
        Array.isArray(tasks) && tasks.map(item => (           // Loop through each task in the tasks array
          <li key={item.id}>{item.description}      {/* Each task is a list item */}
           
            {/* Button to delete the task */}
            <button className='delete-button' onClick={() => deleteTask(item.id)}>Delete</button>
          </li>
        ))
        }
      </ul>
    </div>
  );
}

export default Home; // Export the App component so it can be used in other files.
