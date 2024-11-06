import React from 'react';

const SuburbDropdown = ({ suburbs, onSelect }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <label htmlFor="suburb" style={{ display: 'block', color: '#4A5568', marginBottom: '0.5rem' }}>
        Select a Suburb:
      </label>
      <select
        id="suburb"
        style={{ border: '1px solid #ccc', padding: '0.5rem', width: '100%', maxWidth: '400px' }}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Please choose a suburb --</option>
        {suburbs.map((suburb) => (
          <option key={suburb} value={suburb}>
            {suburb}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SuburbDropdown;
