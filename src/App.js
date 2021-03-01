import React, {useState} from "react";

import {nanoid} from "nanoid";

import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";


const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

    const filterList = FILTER_NAMES.map(name => (

        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));


    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map(task => {
            if( id === task.id){
                return {...task, completed: !task.completed}
            }
            return task
        });
        setTasks(updatedTasks);
    }

    function editTask(id, newName) {
        const  editedTaskList = tasks.map(tasks => {
            if(id === tasks.id) {
                return {...tasks, name: newName}
            }
            return tasks;
        })
        setTasks(editedTaskList);
    }

    function deleteTask(id){
        const remainingTask = tasks.filter(tasks => id !== tasks.id);
        setTasks(remainingTask);
    }

    function addTask(name) {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
    }

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
        />
    ));

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} tasks remaining`;

    return (
      <div className="todoapp stack-large">
          <Form addTask={addTask} />
          <div className="filters btn-group stack-exception">
              {filterList}
          </div>
          <h2 id="list-heading">{headingText}</h2>
          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
              {taskList}
          </ul>
      </div>
  );
}

export default App;
