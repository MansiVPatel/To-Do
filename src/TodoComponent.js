import React from "react";

export default function PrintTodo(props) {
  const { categoryPrint, todos, handleCheck, handleDelete, handleEdit, id, setTodo, setTodos, setToggle, setIsEdited, setFilterStatus } = props;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header " id={categoryPrint + "heading"}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + categoryPrint + "collapse"} aria-expanded="true" aria-controls={categoryPrint + "collapse"}>
          {categoryPrint}
        </button>
      </h2>
      <div id={categoryPrint + "collapse"} className="accordion-collapse collapse" aria-labelledby={categoryPrint + "heading"} data-bs-parent={"#" + id}>
        <div className="accordion-body">
          <ul className="list-group">
            {todos.map((todo) => {
              if (todo.category === categoryPrint) {
                return (
                  <li key={todo.id} href="#" className="d-flex list-group-item rounded-3 list-group-item-success mb-2 align-items-start align-middle">
                    <div className="p-2 align-self-center"><input type="checkbox" checked={todo.completed} onChange={() => handleCheck(todo.id, todos, setTodos)} className="form-check-input" /></div>
                    <div className="p-2 me-auto align-self-center todo-content word-break--break-all">
                      {todo.title}
                    </div>
                    <div className="align-self-center">
                      <span role="button" onClick={() => handleEdit(todo.id, todos, setTodo, setFilterStatus, setToggle, setIsEdited)} className="badge bg-primary rounded-pill me-1 ms-2 flex-row-reverse p-2">Edit</span>
                    </div>
                    <div className="align-self-center">
                      <span role="button" onClick={() => handleDelete(todo.id, todos, setTodos)} className="badge bg-danger rounded-pill flex-row-reverse p-2">Delete</span>
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
