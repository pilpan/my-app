import React from 'react';
import InputEmpty from './InputEmpty';

export default function InputOld({
  el, setInputState, index,
}) {
  if (el === 0) {
    return (<InputEmpty key={index} index={index} setInputState={setInputState} />);
  }
  if (
    ((index % 9 === 0 || index % 9 === 1 || index % 9 === 2) && index < 21)
    || ((index % 9 === 6 || index % 9 === 7 || index % 9 === 8) && index < 27)
    || ((index % 9 === 3 || index % 9 === 4 || index % 9 === 5) && (index > 27 && index < 53))
    || ((index % 9 === 0 || index % 9 === 1 || index % 9 === 2) && index > 53)
    || ((index % 9 === 6 || index % 9 === 7 || index % 9 === 8) && index > 53)
  ) {
    return (
      <input
        style={{
          width: '50px',
          height: '50px',
        }}
        className="text-center bg-secondary"
        name={`${index}`}
        id={`${index}S`}
        value={el}
        onFocus={(e) => { setInputState(e.target); }}
      />
    );
  }

  return (
    <input
      style={{
        width: '50px',
        height: '50px',
      }}
      className="text-center text-info bg-light"
      name={`${index}`}
      id={`${index}S`}
      value={el}
      onFocus={(e) => { setInputState(e.target); }}
    />
  );
}
