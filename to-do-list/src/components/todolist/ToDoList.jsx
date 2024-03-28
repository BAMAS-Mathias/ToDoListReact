import React, { useState } from 'react'
import Task from '../task/Task'
import './ToDoList.css'
import AddTaskButton from './addTaskButton/AddTaskButton'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ToDoList = () => {
    let taskListFromStorage = JSON.parse(window.localStorage.getItem('TO-DO-LIST'));
    if(!taskListFromStorage) taskListFromStorage = [];
    let [toDoList, setToDoList] = useState(taskListFromStorage)

    const [addTask, setAddTask] = useState('');
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState('')
    const [dateValue, setDate] = useState();

    window.localStorage.setItem("TO-DO-LIST", JSON.stringify(toDoList))

    const createTask = () => {
        let maxId = 1; 
        toDoList.map((element, index) => {
            if(maxId <= element.id) {maxId = element.id+1}
        });

        const date = new Date();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric'};
        const formattedDate = date.toLocaleDateString('fr-FR', options);
        let newTask = {id: maxId, title: addTask, checked: false, date: formattedDate};
        setToDoList([...toDoList, newTask]);
        setAddTask('')
        window.localStorage.setItem("TO-DO-LIST", JSON.stringify(toDoList))
    }

    function deleteTask(id){
        setToDoList(toDoList.filter(task => task.id !== id))
    }

    function openCalendar(id){
        setCalendarOpen(!calendarOpen)
        setSelectedTask(id);
    }

    function updateTask(taskId, title, checked){
        const updateTaskMap = toDoList.map((element, index) => {
            if(element.id === taskId){
                element.title = title;
                return element;
            }else{
                return element;
            }
        })
        setToDoList(updateTaskMap)
    }

    const updateTaskDate = (taskId, title, newDate) => {
        setToDoList(toDoList.map(task => (task.id === taskId ? { ...task, date: newDate } : task)));
        setCalendarOpen(false); 
    };
    

    const cancelUpdate = () => {}


    return(
        <>
            <div id='to-do-list'>
                <h1>To-Do-List</h1>
                <div id='add-task-input'>
                    <input type='text' value={addTask} onChange={(e) => {setAddTask(e.target.value)}}/>
                    {<AddTaskButton onClick={createTask}/>}
                </div>
                {toDoList.map((element, index) =>              
                     (
                        <Task 
                            key={index}
                            id={element.id}
                            title={element.title}
                            date={element.date}
                            checked={element.checked}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            openCalendar={openCalendar}
                        /> 
                    )
                )}
            </div>
            {calendarOpen && 
            <Calendar onChange={(event) => {
                const selectedDate = new Date(event);
                const options = { day: '2-digit', month: '2-digit', year: 'numeric'};
                const formattedDate = selectedDate.toLocaleDateString('fr-FR', options);
                updateTaskDate(selectedTask, "test", formattedDate);
                setDate(formattedDate);
              }} />}
              <footer><p>BAMAS Mathias</p></footer>
        </>        
    )
}








export default ToDoList