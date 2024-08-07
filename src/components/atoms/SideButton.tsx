import { SideButtonProps } from '@/types/main';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

const SideButton: React.FC<SideButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 bg-transparent border-none outline-none hover:bg-gray-600 rounded transition duration-300"
    >
      <AiOutlineMenu className="text-[40px] text-green-400" />
    </button>
  );
};

export default SideButton;
