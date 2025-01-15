import React, { useState } from 'react';
import './App.css'; // Ensure this is the correct path to your CSS file


const TaskMaster = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;

    const newTask = {
      id: Date.now(),
      text: task,
      isEditing: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const toggleEdit = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, isEditing: !t.isEditing } : t
    ));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  return (
    <div>
      <header>
        <h1>Task Master By Sharan Shetty</h1>
        <form id="new-task-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            id="new-task-input" 
            placeholder="What do you have planned?" 
            value={task} 
            onChange={handleChange}
          />
          <input 
            type="submit" 
            id="new-task-submit" 
            value="Add task" 
          />
        </form>
      </header>
      <main>
        <section className="task-list">
          <h2>Tasks</h2>
          <div id="tasks">
            {tasks.map(t => (
              <div key={t.id} className="task">
                <div className="content">
                  <input
                    type="text"
                    className="text"
                    value={t.isEditing ? t.text : t.text}
                    readOnly={!t.isEditing}
                    onChange={(e) => {
                      if (t.isEditing) {
                        const updatedTasks = tasks.map(task => 
                          task.id === t.id ? { ...task, text: e.target.value } : task
                        );
                        setTasks(updatedTasks);
                      }
                    }}
                  />
                </div>
                <div className="actions">
                  <button className="edit" onClick={() => toggleEdit(t.id)}>
                    {t.isEditing ? 'Save' : 'Edit'}
                  </button>
                  <button className="delete" onClick={() => handleDelete(t.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TaskMaster;
