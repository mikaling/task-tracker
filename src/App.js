import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Grocery shopping',
      day: 'Mar 3rd at 1:28 PM',
      reminder: false
    },
    {
      id: 2,
      text: 'Work meeting',
      day: 'Mar 6th at 1:08 AM',
      reminder: true
    },
    {
      id: 3,
      text: 'Doctor\'s appointment',
      day: 'Mar 4th at 3:28 PM',
      reminder: false
    },
  ])

  // Delete Task
  const deleteTask = (id) => {
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
      <Header title='Task Tracker' />
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
