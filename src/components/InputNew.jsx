import React from 'react';

export default function InputNew({ el, index }) {
  return (
    <input
      id={`${index}S`}
      style={{
        width: '50px',
        height: '50px',
      }}
      className="text-center"
      value={el}
      readOnly
    />
  );
}
