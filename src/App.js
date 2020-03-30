import React, { Component } from 'react';
import List from './List';
import "./styles/App.css";
import "./styles/Button.css";
import shortid from 'shortid';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);
library.add(faPen);

class App extends Component{

    constructor() {
        super();
        this.state = {
            currentTask: {
                id: '',
                value: '',
                isCompleted: false
            },
            tasks: [],
            isEditing: false
        }
    }

    handleInput = event => {
        if (this.state.isEditing) {
            this.setState({
                currentTask: {
                    id: this.state.currentTask.id,
                    value: event.target.value
                }
            });
        } else {
            this.setState({
                currentTask: {
                    id: shortid(),
                    value: event.target.value
                }
            });
        }
    };

    addTask = event => {
        event.preventDefault();
        const newTask = this.state.currentTask;
        if (newTask.value !== "" && !this.state.isEditing) {
            const newTasks = [newTask, ...this.state.tasks];
            console.log(newTask);
            this.setState({
                tasks: newTasks,
                currentTask: {
                    id: '',
                    value: ''
                }
            })
        } else {
            this.setState({
                tasks: this.state.tasks.map(task => {
                    if (task.id === this.state.currentTask.id) {
                        return {
                            ...task,
                            value: this.state.currentTask.value
                        }
                    }
                    else {
                        return task;
                    }
                }),
                currentTask: {
                    id: '',
                    value: ''
                },
                isEditing: false
            })
        }
    };

    deleteTask = id => {
        const filteredTasks = this.state.tasks.filter(task => (task.id !== id));
        this.setState({
            tasks: filteredTasks
        })
    };

    updateTask = task => {

        if (!task.isCompleted) {
            this.setState({
                currentTask: {
                    id: task.id,
                    value: task.value
                },
                isEditing: true
            })
        }

    };

    completeTask = id => {
        this.setState({
            tasks: this.state.tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        isCompleted: true
                    }
                }
                else {
                    return task;
                }
            })
        });

        const completedTask = this.state.tasks.find(task => (task.id === id));
        completedTask.isCompleted = true;

        const temporaryTasks = this.state.tasks.filter(task => (task.id !== id));
        const newTasks = [...temporaryTasks, completedTask];

        this.setState({
            tasks: newTasks
        })

    };

    render() {
        return (
            <div className="App">
                <header>
                    <form className="form" onSubmit={this.addTask}>
                        <br/>
                        <h3>TO-DO LIST</h3>
                        <input
                            type="text"
                            placeholder="Add task..."
                            value={this.state.currentTask.value}
                            onChange={this.handleInput}
                        />
                        <button
                            className={
                                this.state.isEditing ? "btn-edit" : "btn-add"
                            }
                        >
                            {this.state.isEditing ? "Edit Task" : "Add Task"}
                        </button>
                    </form>
                </header>
                {this.state.tasks.map(task => (
                    <List
                        key={task.id}
                        task={task}

                        delete={this.deleteTask}
                        update={this.updateTask}
                        complete={this.completeTask}
                        isCompleted={task.isCompleted}
                    />
                ))}
            </div>
        );
    }
}

export default App;
