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
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ?
        { ...task, reminder: !task.reminder } :
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
