import axios from "axios";
import React, { useEffect, useState } from "react";

function Todo() {
    const [todo, setTodo] = useState([]);
    const [addTodo, setAddTodo] = useState({});
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchTodo = async () => {
            try {
              const response = await axios.get('http://localhost:3001/getTodoList');
              setTodo(response.data);
            } catch (error) {
              setError("Error fetching employees");
              console.error("Employee fetching error", error);
            }
          };
          fetchTodo();
        }, []);
        const handleDelete = async (_id) => {
            try {
              await axios.delete(`http://localhost:3000/deleteTodoList/${_id}`);
              setTodo(preEmployee => preEmployee.filter((todo) => todo._id !== _id));
            } catch (error) {
              console.error("Error deleting employee:", error);
            }
          };
        const handleEdit = async (_id) => {
            try {
              await axios.delete(`http://localhost:3000/deleteTodoList/${_id}`);
              setTodo(preEmployee => preEmployee.filter((todo) => todo._id !== _id));
            } catch (error) {
              console.error("Error deleting employee:", error);
            }
          };
    
    return (
        <div>
            {todo.map((todo) => (
                <div key={todo.id}>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <p>{todo.status}</p>
                    <button onClick={() => handleEdit(todo.id)}>Edit</button>
                    <button onClick={() => handleDelete(todo.id)}>Delete</button>

                </div>
            ))}
        </div>
    );
}

export default Todo;