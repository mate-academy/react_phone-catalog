import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';
import { DndIcon } from '../../images/icons/DndIcon';

interface SortableItemProps {
  id: string | number;
  value: React.ReactNode;
}

export function SortableItem({ id, value }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div
        {...listeners}
        className="select-none cursor-grab-custom  p-2  relative  w-full  bg-dnd  hover:bg-dnd-hover  dark:bg-dark-dnd  hover:dark:bg-dark-dnd-hover  transition-colors"
      >
        <DndIcon />
      </div>
      {value}
    </Item>
  );
}
