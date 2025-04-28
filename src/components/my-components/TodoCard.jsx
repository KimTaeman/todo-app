import React from 'react';
import { Button } from './ui/button';
import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';

type TodoCardProps = {
  todo: {
    id: number,
    name: string,
    success: boolean,
  },
  editingId: number | null,
  editingText: string,
  onToggleSuccess: (id: number) => void,
  onEditClick: (todo: { id: number, name: string }) => void,
  onSaveClick: (id: number) => void,
  onDelete: (id: number) => void,
  onEditingTextChange: (text: string) => void,
  onInputKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    id?: number
  ) => void,
};

const TodoCard = ({
  todo,
  editingId,
  editingText,
  onToggleSuccess,
  onEditClick,
  onSaveClick,
  onDelete,
  onEditingTextChange,
  onInputKeyDown,
}: TodoCardProps) => {
  return (
    <div className='flex gap-5 items-center bg-white rounded-2xl p-5'>
      {/* Success Toggle */}
      <span
        onClick={() => onToggleSuccess(todo.id)}
        className='cursor-pointer text-2xl'
      >
        {todo.success ? <FaRegDotCircle /> : <FaRegCircle />}
      </span>

      {/* Todo Text or Edit Input */}
      {editingId === todo.id ? (
        <input
          value={editingText}
          onChange={(e) => onEditingTextChange(e.target.value)}
          onKeyDown={(e) => onInputKeyDown(e, todo.id)}
          className='border-b border-gray-400 outline-none'
          autoFocus
        />
      ) : (
        <h1 className={todo.success ? 'line-through' : ''}>{todo.name}</h1>
      )}

      {/* Buttons */}
      {editingId === todo.id ? (
        <Button
          variant='outline'
          size='sm'
          onClick={() => onSaveClick(todo.id)}
        >
          Save
        </Button>
      ) : (
        <Button variant='outline' size='sm' onClick={() => onEditClick(todo)}>
          Edit
        </Button>
      )}

      <Button variant='outline' size='sm' onClick={() => onDelete(todo.id)}>
        X
      </Button>
    </div>
  );
};

export default TodoCard;
