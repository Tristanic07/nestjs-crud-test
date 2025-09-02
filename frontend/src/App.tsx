import { useEffect, useState } from 'react'
import './App.css'
import Input from './component/Input';


function App() {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState([{
    id: 0,
    taskBody: ""
  }]);

  useEffect(() => {
      getTasks();
  },[]);

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {method: 'GET'})

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to fetch tasks.');
      }

      const data = await response.json();
      
      // Update the state with the fetched data
      setTasks(data);
  
    } catch (error) {
      
    }
  }
  
  const addTask = async (task: string) => {

    if(!task){
      throw new Error('Task must not be empty.');
    }

    try {
      const response = await fetch("http://localhost:3000/tasks/addTask",{
          method: 'POST',
           headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskBody: task }),
        })

        if (!response.ok) {
        throw new Error('Error Adding task.');
      }
        
        getTasks();

        setInputTask("");
        // document.getElementById("myText").value = "";

    } catch (error) {
      
    }
  }

  return (
    <div className='w-200'>
      <div className='border-b-2 border-b-amber-700'>
        <h1 className='text-7xl font-light text-blue-900'>Goals for today</h1>
      </div>
      <div className='gap-2 mt-5 h-120 overflow-y-auto'>

        <div className='flex items-center h-15 rounded-full border-2 mb-2 bg-gray-200'>
              <img  className='border-2 h-full w-15 rounded-l-full mr-5' alt="test"/>
              <input type="text" className='flex-grow border-b-2 border-amber-700 outline-none'
                onChange={(e) => setInputTask(e.target.value)}
                // value={task.taskBody}
                // disabled
                placeholder='Enter new task here!'
                id='input-task'
                />
              <div className='ml-5'>
                <button 
                  className='h-10 w-10 rounded-full bg-blue-900 text-gray-100'
                  onClick={() => addTask(inputTask)}
                  >
                    +
                  </button>
              </div>
            </div>
        
        {
          tasks.map((task) => (
            <Input id={task.id} taskBody={task.taskBody} isDisabled={false} />
          ))
        }
      </div>
      <div className='flex justify-end border-t-2 border-t-amber-700 pt-2'>
        <button className='rounded-full h-10 w-20 text-sm bg-blue-950 text-white'>Edit</button>
      </div>

    </div>
  )
}

export default App
