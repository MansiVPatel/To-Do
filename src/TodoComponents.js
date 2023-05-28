import React, { Component } from 'react';

class TodoItems extends Component {
    render() {
        var todos = this.props.todos;
        var category = this.props.category
        return (
            <ul className="todo-container container list-group" >
                {
                    todos.map(todo => {
                        if (todo.category === category)
                        return(
                            <li key={todo.id} href="#" className="d-flex list-group-item rounded-3 list-group-item-success mb-2 align-items-start align-middle">
                                <div className="p-2 align-self-center">
                                    <input type="checkbox" checked={todo.completed} /*onChange={() => handleCheck(todo.id)}*/ className="form-check-input" /></div>
                                <div className="p-2 me-auto align-self-center todo-content word-break--break-all">
                                    {todo.title}
                                </div>
                                <div className="align-self-center">
                                    <span role="button" /*onClick={() => handleEdit(todo.id)}*/ class="badge bg-primary rounded-pill me-1 ms-2 flex-row-reverse p-2">Edit</span>
                                </div>
                                <div className="align-self-center">
                                    <span role="button" /*onClick={() => handleDelete(todo.id)}*/ class="badge bg-danger rounded-pill flex-row-reverse p-2">Delete</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

class CategoryItem extends Component {
    render() {
        var headerID = this.props.categoryName + "Header";
        var collapseID = this.props.categoryName + "Collapse";
        return (
        <div class="accordion-item">
            <h2 class="accordion-header" id={headerID}>
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + collapseID} aria-expanded="true" aria-controls={collapseID}>
                    {this.props.categoryName}
                </button>
            </h2>
            <div id={collapseID} className="accordion-collapse collapse" aria-labelledby={headerID} data-bs-parent={"#" + this.props.id}>
                <div class="accordion-body">
                    <TodoItems todos={this.props.todos} category={this.props.categoryName.toLowerCase()}/>
                </div>
            </div>
        </div>
        )
    }
}

export {
    TodoItems,
    CategoryItem
}
