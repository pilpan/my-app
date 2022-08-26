import React from 'react';

export default function ButtonGroup({ clickHandler }) {
  return (
    <div style={{ width: '1rem', height: '28rem' }}>
      <div className="btn-group" style={{ width: '28rem' }}>
        <button type="button" onClick={clickHandler} className="btn btn-outline-dark py-3">1</button>
        <button type="button" onClick={clickHandler} className="btn btn-outline-dark py-3">2</button>
        <button type="button" onClick={clickHandler} className="btn btn-outline-dark py-3">3</button>
      </div>
      <div className="btn-group" style={{ width: '28rem' }}>
        <button type="button" onClick={clickHandler} className="btn btn-outline-dark py-3">4</button>
        <button type="button" onClick={clickHandler} className="btn btn-outline-dark py-3">5</button>
        <button type="button" onClick={clickHandler} className="btn btn-outline-dark py-3">6</button>
      </div>
      <div className="btn-group" style={{ width: '28rem' }}>
        <button type="button" onClick={clickHandler} className="btn btn-outline-dark py-3">7</button>
        <button type="button" onClick={clickHandler} className="btn btn-outline-dark py-3">8</button>
        <button type="button" onClick={clickHandler} className="btn btn-outline-dark py-3">9</button>
      </div>
      <div>
        <button type="submit" className="btn btn-outline-primary py-3" style={{ 'margin-left': '11rem' }}>Решить</button>
      </div>
    </div>
  );
}
