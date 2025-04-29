import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { IoIosAdd } from "react-icons/io";
import TodoCard from "./components/my-components/TodoCard.jsx";
import { Axios } from "../axiosInstance.ts";
import {
  createTodo,
  getTodo,
  updateTodoName,
  deleteTodo,
  updateTodoStatus,
} from "./api/todo.ts";

import "./App.css";

const App = () => {
  const testConnection = async () => {
    try {
      const data = await Axios.get("/");
      console.log(data.data);
    } catch (e) {
      console.log(`Error fetching backend server: ${e}`);
    }
  };

  const fetchTodoData = async () => {
    const data = await getTodo();
    if (data.success) {
      console.log(data.data.data);
      setTodo(data.data.data);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  useEffect(() => {
    fetchTodoData();
  }, []);

  type Todo = {
    id: number;
    name: string;
    success: boolean;
  };

  const [todo, setTodo] = useState<Todo[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [newTodoText, setNewTodoText] = useState<string>("");

  // Handle adding new todo
  const handleAddTodo = async () => {
    if (newTodoText.trim() === "") return;

    const result = await createTodo(newTodoText);
    if (result.success) {
      setTodo((prev) => [...prev, result.data.data]);
      setNewTodoText("");
    }
  };

  // Start editing a todo
  const handleEditClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.name);
  };

  // Save edited todo
  const handleSaveClick = async (id: number) => {
    // Make the API call to update the todo on the server
    const updatedTodo = await updateTodoName(id, editingText);

    if (updatedTodo) {
      // Update the todo in the local state if the update is successful
      setTodo((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, name: editingText } : todo
        )
      );
      setEditingId(null);
      setEditingText("");
    } else {
      // Handle error if needed, for example, show a message to the user
      alert("Failed to save the edited todo.");
    }
  };

  // Handle input key events (Enter to save or add)
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id?: number
  ) => {
    if (e.key === "Enter") {
      if (editingId !== null && id !== undefined) {
        handleSaveClick(id);
      } else {
        handleAddTodo();
      }
    }
  };

  // Toggle success status
  const toggleSuccess = async (id: number) => {
    const toggle = await updateTodoStatus(id);
    if (toggle) {
      setTodo((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, success: !todo.success } : todo
        )
      );
    } else {
      alert("Failed to update status");
    }
  };

  // Delete a todo
  const handleDelete = async (id: number) => {
    const removeTodo = await deleteTodo(id);
    if (removeTodo) {
      setTodo((prev) => prev.filter((todo) => todo.id !== id));
    } else {
      // Handle error if needed, for example, show a message to the user
      alert("Failed to delete the edited todo.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-blue-300 flex flex-col gap-5 items-center justify-center p-10 w-100 h-100 rounded-2xl">
        {/* Add Todo Section */}
        <div className="flex bg-white rounded-2xl px-10 py-2 gap-2">
          <Button variant="outline" size="sm" onClick={handleAddTodo}>
            <IoIosAdd />
          </Button>
          <input
            type="text"
            className="px-2 py-1 rounded-md"
            placeholder="Add new todo..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => handleInputKeyDown(e)}
          />
        </div>

        {/* Todo List */}

        <div className="flex flex-col gap-5">
          {todo.map((todo) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              success={todo.success}
              name={todo.name}
              handleSuccessToggle={() => toggleSuccess(todo.id)}
              handleSave={() => handleSaveClick(todo.id)}
              handleEdit={() => handleEditClick(todo)}
              handleDelete={() => handleDelete(todo.id)}
              editingId={editingId}
              editingText={editingText}
              handleInputChange={(e) => setEditingText(e.target.value)}
              handleKeyDown={(e) => handleInputKeyDown(e, todo.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
