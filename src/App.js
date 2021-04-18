import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3001/tasks')
    const data = await response.json()

    return data
  }

  // Fetch single task
  const fetchSingleTask = async (id) => {
    const response = await fetch(`http://localhost:3001/tasks/${id}`)
    const data = await response.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {

    const response = await fetch('http://localhost:3001/tasks',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

    // Returns the new task once the POST request is successful
    const data = await response.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }


  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchSingleTask(id)
    // Change reminder value
    const updatedTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    // Create PUT request to update the object on the server
    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await response.json()

    // Set component's state to updated object from server
    setTasks(tasks.map((task) =>
      task.id === id ?
        { ...task, reminder: data.reminder } :
        task))
  }



  return (
    <div className='container'>
      <Header
        title='Task Tracker'
        onAddButtonClick={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
      />
      {
        // Ternary shorthand for conditional formating
        showAddTask && <AddTask onAdd={addTask} />
      }
      { tasks.length > 0 ?
        <Tasks
          onToggle={toggleReminder}
          tasks={tasks}
          onDelete={deleteTask}
        /> :
        'No tasks available.'
      }
    </div>
  )
}

export default App;
