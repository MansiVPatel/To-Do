import React, { useState, useEffect } from 'react';
import './App.css';
import PrintTodo from './TodoComponent';
import { addTodo, handleCheck, handleDelete, handleEdit, updateFilter } from './TodoFunction';

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

export default function Todo() {
    const [todos, setTodos] = useState(getLocalItems());
    const [todo, setTodo] = useState('');
    const [filterStatus, setFilterStatus] = useState("");
    const [toggle, setToggle] = useState(true);
    const [isEdited, setIsEdited] = useState(null);

    useEffect(() => {
        console.log("Called useEffect");
        localStorage.setItem('lists', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="container text-center mh-100 mw-100">
            <div className="row text-center">
                <h1>To-Do App</h1>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3 todo-list-container">
                    <div className="row create-todo">
                        <div className="row text-center">
                            <h6>What needs to be done?</h6>
                        </div>
                        <form className="form-inline d-flex justify-content-center">
                            <div className="form-group sm-1 w-50">
                                <input
                                    className="form-control"
                                    name="todo"
                                    type="text"
                                    value={todo}
                                    placeholder="Write your todo..."
                                    onChange={(e) => setTodo(e.target.value)}
                                />
                            </div>
                            <select
                                id="category"
                                className="btn btn-secondary mx-sm-1"
                                placeholder="Category"
                                onChange={(e) => updateFilter(e, setFilterStatus)}
                                value={filterStatus}
                            >
                                <option defaultValue="Category">Category</option>
                                <option value="Health">Health</option>
                                <option value="Work">Work</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Important">Important</option>
                                <option value="Others">Others</option>
                            </select>
                            {toggle ?
                                (<button type="button" className="btn btn-success ml-2" onClick={() => addTodo(todo, filterStatus, isEdited, todos, setTodos, setTodo, setFilterStatus, setToggle, setIsEdited, toggle)}>
                                    Add
                                </button>)
                                : (<button type="button" className="btn btn-info ml-2" onClick={() => addTodo(todo, filterStatus, isEdited, todos, setTodos, setTodo, setFilterStatus, setToggle, setIsEdited, toggle)} >
                                    Update
                                </button>)
                            }
                        </form>
                    </div>
                    <div className="row display-todo">
                        <h6>My To-Do Lists :</h6>
                        <div className="accordion" id="accordionExample">
                            <PrintTodo categoryPrint="Health" todos={todos} id="accordionExample" handleCheck={handleCheck} handleEdit={handleEdit} handleDelete={handleDelete} setFilterStatus={setFilterStatus} setToggle={setToggle} setIsEdited={setIsEdited} setTodos={setTodos} setTodo={setTodo} />
                            <PrintTodo categoryPrint="Work" todos={todos} id="accordionExample" handleCheck={handleCheck} handleEdit={handleEdit} handleDelete={handleDelete} setFilterStatus={setFilterStatus} setToggle={setToggle} setIsEdited={setIsEdited} setTodos={setTodos} setTodo={setTodo} />
                            <PrintTodo categoryPrint="Shopping" todos={todos} id="accordionExample" handleCheck={handleCheck} handleEdit={handleEdit} handleDelete={handleDelete} setFilterStatus={setFilterStatus} setToggle={setToggle} setIsEdited={setIsEdited} setTodos={setTodos} setTodo={setTodo} />
                            <PrintTodo categoryPrint="Important" todos={todos} id="accordionExample" handleCheck={handleCheck} handleEdit={handleEdit} handleDelete={handleDelete} setFilterStatus={setFilterStatus} setToggle={setToggle} setIsEdited={setIsEdited} setTodos={setTodos} setTodo={setTodo} />
                            <PrintTodo categoryPrint="Others" todos={todos} id="accordionExample " handleCheck={handleCheck} handleEdit={handleEdit} handleDelete={handleDelete} setFilterStatus={setFilterStatus} setToggle={setToggle} setIsEdited={setIsEdited} setTodos={setTodos} setTodo={setTodo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
