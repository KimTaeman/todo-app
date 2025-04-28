import React from 'react';
import { Button } from '../ui/button';
import { FaRegCircle } from 'react-icons/fa';
import { FaRegDotCircle } from 'react-icons/fa';
const TodoCard = ({
  id,
  success,
  name,
  handleSuccessToggle,
  handleSave,
  handleEdit,
  handleDelete,
  editingId,
  editingText,
  handleInputChange,
  handleKeyDown,
}) => {
  return (
    <div key={id} className='flex gap-5 items-center bg-white rounded-2xl p-5'>
      {/* Success Toggle */}
      <span onClick={handleSuccessToggle} className='cursor-pointer text-2xl'>
        {success ? <FaRegDotCircle /> : <FaRegCircle />}
      </span>

      {/* Todo Text or Edit Input */}
      {editingId === id ? (
        <input
          value={editingText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className='border-b border-gray-400 outline-none'
        />
      ) : (
        <h1 className={success ? 'line-through' : ''}>{name}</h1>
      )}

      {/* Buttons */}
      {editingId === id ? (
        <Button variant='outline' size='sm' onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button variant='outline' size='sm' onClick={handleEdit}>
          Edit
        </Button>
      )}

      <Button variant='outline' size='sm' onClick={handleDelete}>
        X
      </Button>
    </div>
  );
};
export default TodoCard;
