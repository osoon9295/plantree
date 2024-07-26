'use client';

import React, { useState } from 'react';

type activeCellsObjet = {
  [key: string]: boolean;
};

const Timetable = () => {
  const [activeCells, setActiveCells] = useState<activeCellsObjet>({});
  const [isMouseDown, setIsMouseDown] = useState(false);

  const rows = 24;
  const columns = 6;
  const minutes = [10, 20, 30, 40, 50, 60];
  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const handleMouseDown = (id: string) => {
    setIsMouseDown(true);
    toggleCellColor(id);
  };

  const handleMouseOver = (id: string) => {
    if (isMouseDown) {
      toggleCellColor(id);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const toggleCellColor = (id: string) => {
    const changeColor = (prev: activeCellsObjet) => {
      return { ...prev, [id]: !prev[id] };
    };
    setActiveCells(changeColor);
  };
  console.log(activeCells);

  return (
    <div className="border-2 relative h-full" onMouseUp={handleMouseUp}>
      <h4>Time Table</h4>
      <div className="flex flex-row gap-4 absolute right-1">
        {minutes.map((minute) => {
          return <div key={minute}>{minute}</div>;
        })}
      </div>
      <div className="flex flex-col absolute top-12 text-[9px]">
        {hours.map((hour) => {
          return <div key={hour}>{hour}</div>;
        })}
      </div>
      <table className="w-5/6 h-72 border-collapse absolute top-12 right-1">
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => {
                const id = `${rowIndex}${(colIndex + 1) * 10}`;
                return (
                  <td
                    key={colIndex}
                    id={id}
                    className={`border border-gray-300 p-1.5 text-center ${
                      activeCells[id] ? 'bg-slate-500' : 'bg-white'
                    }`}
                    onMouseDown={() => handleMouseDown(id)}
                    onMouseOver={() => handleMouseOver(id)}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
