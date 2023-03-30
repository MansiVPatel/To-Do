import React, { useState, useEffect } from "react";
import './App.css';


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

  useEffect(() => {

    localStorage.setItem('lists', JSON.stringify(todos))

  }, [todos])

  const addtodo = (e) => {
    if (!todo) {
      alert('please fill data');
    }
    else if (todo && !toggle) {
      settodos(todos.map((t) => {
        if (t.id === isedited) {
          return { ...t, title: todo };
        }
        return t;
      }))
      settoggle(true);
      settodo('');
      setisedited(null);
    }
    else {
      const newtodo = { id: new Date().getTime().toString(), title: todo, completed: false, };
      settodos([...todos, newtodo]);
      settodo('');
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
    newedited.completed(false);
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
            <form class="form-inline d-flex justify-content-center">
              <div class="form-group mx-sm-1 w-50 ">
                <input
                  class="form-control"
                  name="todo"
                  type="text"
                  value={todo}
                  placeholder="Write your todo..."
                  onChange={(e) => settodo(e.target.value)}
                />
              </div>
              {
                toggle ? <button type="button" className="btn btn-success " onClick={addtodo}> Add </button> :
                  <button type="button" className="btn btn-info " onClick={addtodo}> Update </button>
              }
            </form>
          </div>
          <div className="row display-todo">
            <h6>My To-Do Lists :</h6>
            <ul className="todo-container container list-group" >
              {todos.map((todo) => (
                <li key={todo.id} href="#" className="d-flex list-group-item rounded-3 list-group-item-success mb-2 align-items-start align-middle">
                  <div className="p-2 align-self-center"><input type="checkbox" checked={todo.completed} onChange={() => handleCheck(todo.id)} className="form-check-input" /></div>
                  <div className="p-2 me-auto align-self-center todo-content word-break--break-all">
                    {todo.title}
                  </div>
                  <div className="align-self-center">
                    <span role="button" onClick={() => handleEdit(todo.id)} class="badge bg-primary rounded-pill me-1 ms-2 flex-row-reverse p-2">Edit</span>
                  </div>
                  <div className="align-self-center">
                    <span role="button" onClick={() => handleDelete(todo.id)} class="badge bg-danger rounded-pill flex-row-reverse p-2">Delete</span>
                  </div>
                </li>
              ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}