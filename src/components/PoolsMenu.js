import React, { useState } from 'react';
import './PoolsMenu.css';

const pools = [
  "Cheer",
  "Basketball",
  "Cross Country",
  "Track",
  "Volleyball",
  "Middle School Basketball",
  "MS Track",
  "Baking",
  "Book",
  "Model UN",
  "Climbing",
  "Yearbook",
  "Mandarin",
  "Quizbowl",
  "Community Service",
  "Debate",
  "Terra",
  "Tor",
  "Titus",
  "Triton",
  "Executive",
  "Grades",
  "Committees",
  "All US",
  "Announcement",
  "Common Wealth"
];

const PoolsMenu = ({ selectPool }) => {
  const [selected, setSelected] = useState('');

  return (
    <div className="pools-menu">
      <h2>Join a Pool</h2>
      <ul>
        {pools.map((pool, index) => (
          <li
            key={index}
            className={selected === pool ? 'selected' : ''}
            onClick={() => {
              setSelected(pool);
              selectPool(pool);
            }}
          >
            {pool}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoolsMenu;
