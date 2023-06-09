import { toast } from 'react-toastify';

const isValidateTodo = (todo, filterStatus) => {
    if (!todo) {
        alert('Please fill in the data.');
        return false;
    }

    if (todo && !filterStatus) {
        alert('Please select a category.');
        return false;
    }

    return true;
}

export const addTodo = (todo, filterStatus, isEdited, todos, setTodos, setTodo, setFilterStatus, setToggle, setIsEdited, toggle) => {
    console.log('addTodo called with:', { todo, filterStatus, isEdited, todos, toggle });

    if (!isValidateTodo(todo, filterStatus)) {
        return;
    }

    // Todo exists, update it
    if (!toggle) {
        const updatedTodos = todos.map((t) => {
            if (t.id === isEdited) {
                return { ...t, title: todo, category: filterStatus };
            }
            return t;
        });
        console.log('updating todos:', updatedTodos);
        setTodos(updatedTodos);
        setToggle(true);
        setTodo('');
        setIsEdited(null);
        setFilterStatus('');
        return;
    }

    // Todo does not exist. Create a new and store it in local storage
    const newTodo = {
        id: new Date().getTime().toString(),
        title: todo,
        completed: false,
        category: filterStatus
    };
    const updatedTodos = [...todos, newTodo];
    console.log('updating todos:', updatedTodos);
    setTodos(updatedTodos);
    setTodo('');
    setFilterStatus('');
    toast.success('Task added successfully');
};

export const handleCheck = (id, todos, setTodos) => {
    console.log('handleCheck called with:', { id, todos });
    const todoArray = todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    console.log('updating todos:', todoArray);
    setTodos(todoArray);
};

export const handleDelete = (id, todos, setTodos) => {
    console.log('handleDelete called with:', { id, todos });
    const deleted = todos.filter((t) => t.id !== id);
    console.log('updating todos:', deleted);
    setTodos(deleted);
};

export const handleEdit = (id, todos, setTodo, setFilterStatus, setToggle, setIsEdited) => {
    console.log('handleEdit called with:', { id, todos });
    const editedTodo = todos.find((d) => d.id === id);
    console.log('editing todo:', editedTodo);
    setToggle(false);
    setTodo(editedTodo.title);
    setIsEdited(id);
    setFilterStatus(editedTodo.category);
};

export const updateFilter = (e, setFilterStatus) => {
    console.log('updateFilter called with:', e.target.value);
    setFilterStatus(e.target.value);
};