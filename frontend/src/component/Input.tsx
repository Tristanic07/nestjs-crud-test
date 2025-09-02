import { FaTrashAlt } from "react-icons/fa";

export interface InputProps {
    id: number;
    taskBody: string;
    isDisabled: boolean;
}

function Input({id, taskBody, isDisabled} : InputProps) {

    const handleDeleteTask = async (taskID: number) => {
        try {
        const response = await fetch(`http://localhost:3000/tasks/deleteTask/${taskID}`, {method: 'DELETE'})

        console.log(response);

        if (!response.ok) {
            throw new Error('Failed deleting tasks.');
        }
    
        } catch (error) {
        
        }
  }

    return(
        <div className='flex items-center h-15 rounded-full border-2 mb-2 bg-gray-200'>
            <img  className='border-2 h-full w-15 rounded-l-full mr-5' alt="test"/>
            <input type="text" className='flex-grow border-b-2 border-amber-700'
                // onChange={(e) => setInputTask(e.target.value)}
                value={taskBody}
                // {isDisabled? "disabled" : ""}
                
            />
            <div className='ml-5'>
                { isDisabled ? 
                    (
                        <button 
                            className='h-10 w-10 rounded-full bg-blue-900 text-gray-100'
                            // onClick={() => addTask(inputTask)}
                        >
                            +
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button 
                                className='flex justify-center items-center h-10 w-10 rounded-full bg-blue-900 text-gray-100'
                                onClick={() => handleDeleteTask(id)}
                            >
                                <FaTrashAlt />
                            </button>

                            <button 
                                className='h-10 w-10 rounded-full bg-blue-900 text-gray-100'
                                // onClick={() => addTask(inputTask)}
                            >
                                +
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Input;