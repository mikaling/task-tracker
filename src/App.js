import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'task 1',
      day: 'Mar 3rd at 1:28 PM',
      reminder: false
    },
    {
      id: 2,
      text: 'task 2',
      day: 'Mar 6th at 1:08 AM',
      reminder: true
    },
    {
      id: 3,
      text: 'task 3',
      day: 'Mar 4th at 3:28 PM',
      reminder: false
    },
  ])

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }


  return (
    <div className='container'>
      <Header title='Task Tracker' />
      <Tasks tasks={tasks} onDelete={ deleteTask }/>
    </div>
  )
}

export default App;
