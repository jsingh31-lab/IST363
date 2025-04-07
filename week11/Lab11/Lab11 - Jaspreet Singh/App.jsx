//Jaspreet Singh
//IST363
//Lab011
import { useState } from "react";

function App() {
  //Part 1 - object list
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete Lab 11', completed: false },
    { id: 2, text: 'Review JSX Events and State', completed: false }
  ]);

  //Part 4 - Tracking the new task input
  const [newTask, setNewTask] = useState('');


// Part 3 - Function for completed tasks.
  function markComplete(id) {
    const updatedTasks =[];

    for(let i=0; i < tasks.length; i++) {
      let currentTask = tasks[i];

      if (currentTask.id === id) {
        const updatedTask = {
          id: currentTask.id,
          text: currentTask.text,
          completed: true
        };
        updatedTasks.push(updatedTask);
      } else {
        updatedTasks.push(currentTask);
      }
    }
    setTasks(updatedTasks);
  }

  // Part 4 - Adding a New Task
  function addTask(event) {
    event.preventDefault();

    if (newTask !== "") {
      const newTaskItem = {
        id: tasks.length + 1,
        text: newTask,
        completed: false
      };

      const updatedList = tasks;
      updatedList.push(newTaskItem);
      setTasks(updatedList);
      setNewTask(""); 
    }
  }

  return (
    //Part 2 - Displaying Task List
    <div>
       <h1>To-Do List</h1>

      <form onSubmit={addTask}>
        <input type="text" value={newTask} onChange={function(event) {
          setNewTask(event.target.value);
        }}/>
        <button type="submit">Add Task</button>
      </form>

      <ul>
      {tasks.map(task => (
        <li key={task.id} style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
          {task.text}
          {!task.completed && (<button onClick={() => markComplete(task.id)}
            style={{color: 'red'}}>X</button>)}
          </li>
      ))}
      </ul>
    </div>
  );
}

export default App;
