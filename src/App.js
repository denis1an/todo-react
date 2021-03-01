import React, {useState} from "react";

import {nanoid} from "nanoid";

import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";


function App(props) {

    const [tasks, setTasks] = useState(props.tasks);

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map(task => {
            if( id === task.id){
                return {...task, completed: !task.completed}
            }
            return task
        });
        setTasks(updatedTasks);
    }

    function addTask(name) {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
    }

    const taskList = tasks.map(task => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
        />
    ));

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} tasks remaining`;

    return (
      <div className="todoapp stack-large">
          <Form addTask={addTask} />
          <div className="filters btn-group stack-exception">
              <FilterButton/>
              <FilterButton/>
              <FilterButton/>
          </div>
          <h2 id="list-heading">{headingText}</h2>
          <ul
            role="list"
            className="todo-list stack-exception"
            aria-labelledby="list-heading"
          >
              {taskList}
          </ul>
      </div>
  );
}

export default App;
