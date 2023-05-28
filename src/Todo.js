import React, { useState, useEffect, Component } from "react";
import './App.css';
import {TodoItems, CategoryItem} from "./TodoComponents";
// import { collapseToast } from "react-toastify";
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const getLocalitems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else {
        return [];
    }

}

export default function Todo() {
    const [todo, settodo] = useState('');
    const [todos, settodos] = useState(getLocalitems());
    const [toggle, settoggle] = useState(true);
    const [isedited, setisedited] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');


    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(todos))
    }, [todos])

    const addtodo = (e) => {
        if (!todo) {
            alert('Please fill data');
        }
        else if (todo && !filterStatus) {
            alert('Please select category')
        }
        else if (todo && !toggle) {
            settodos(todos.map((t) => {
                if (t.id === isedited) {
                    return { ...t, title: todo, category: filterStatus };
                }
                return t;
            }))
            settoggle(true);
            settodo('');
            setisedited(null);
            setFilterStatus('');
        }
        else {
            const newtodo = { id: new Date().getTime().toString(), title: todo, completed: false, category: filterStatus };
            settodos([...todos, newtodo]);
            settodo('');
            setFilterStatus('');
            toast.success('Task added successfully');
        }
    };

    const handleCheck = (id) => {
        const todoArray = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        })
        settodos(todoArray);
    }

    const handleDelete = (id) => {
        const deleted = todos.filter((t) => { return id !== t.id });
        settodos(deleted);
    }

    const handleEdit = (id) => {
        const newedited = todos.find((d) => {
            return d.id === id
        });

        console.log(newedited);
        settoggle(false);
        settodo(newedited.title);
        setisedited(id);
        setFilterStatus(newedited.category);
    }

    const updateFilter = (e) => {
        setFilterStatus(e.target.value);
    }

    return (
        <div className="container text-center mh-100 mw-100 " >
            <div className="row text-center">
                <h1>To-Do App</h1>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3 todo-list-container">
                    <div className="row create-todo ">
                        <div className="row text-center">
                            <h6>What needs to be done?</h6>
                        </div>
                        <form className="form-inline d-flex justify-content-center">
                            <div className="form-group sm-1 w-50 ">
                                <input
                                    className="form-control"
                                    name="todo"
                                    type="text"
                                    value={todo}
                                    placeholder="Write your todo..."
                                    onChange={(e) => settodo(e.target.value)}
                                />
                            </div>
                            <select
                                id="category"
                                className="btn btn-secondary mx-sm-1"
                                placeholder="Category"
                                onChange={(e) => updateFilter(e)}
                                value={filterStatus}
                            >
                                <option defaultValue="category">Category</option>
                                <option value="health" >Health</option>
                                <option value="work" >Work</option>
                                <option value="shopping">Shopping</option>
                                <option value="important">Important</option>
                                <option value="other">Others</option>
                            </select>
                            {
                                toggle ? <button type="button" className="btn btn-success ml-2 " onClick={addtodo}> Add </button> :
                                    <button type="button" className="btn btn-info ml-2" onClick={addtodo}> Update </button>
                            }
                        </form>
                    </div>
                    <div className="row display-todo">
                        <h6>My To-Do Lists :</h6>
                        <div class="accordion" id="accordionExample">
                            <CategoryItem categoryName={"Health"} todos={todos} id={"accordionExample"} />
                            <CategoryItem categoryName={"Work"} todos={todos}  id={"accordionExample"} />
                            <CategoryItem categoryName={"Important"} todos={todos}  id={"accordionExample"}  />
                            <CategoryItem categoryName={"Shopping"} todos={todos}  id={"accordionExample"}  />
                            <CategoryItem categoryName={"Others"} todos={todos}  id={"accordionExample"} />        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}