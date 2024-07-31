import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import useBottomSheetStore from '@/stores/bottomsheet.store';
import { useDiaryCoverStore } from '@/stores/diarycover.store';

const ItemType = {
  CARD: 'card'
};

type BottomSheetCardProps = {
  id: string;
  title: string;
  content: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onClick: () => void;
};

type DragItem = {
  id: string;
  index: number;
  type: typeof ItemType.CARD;
};

const BottomSheetCard: React.FC<BottomSheetCardProps> = ({ id, title, content, index, moveCard, onClick }) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: ItemType.CARD,
    hover(item: DragItem) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CARD,
    item: (): DragItem => ({ id, index, type: ItemType.CARD }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  const deletePageFromBottomSheet = useBottomSheetStore((state) => state.deletePageFromBottomSheet);

  const handleDelete = () => {
    deletePageFromBottomSheet(id);
  };

  return (
    <div
      ref={ref}
      className={`relative bg-gray-100 rounded-lg shadow-md p-4 w-32 h-40 flex-none cursor-pointer ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold" onClick={onClick}>
        {title}
      </h2>
      <p>{content}</p>
    </div>
  );
};

export default BottomSheetCard;