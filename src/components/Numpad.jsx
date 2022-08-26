import React, { useState } from 'react';

export default function Numpad() {
  const arr = new Array(9).fill(new Array(9).fill(0));
  const [arrState, setArrState] = useState();
  const [inputState, setInputState] = useState();
  const newArr = [];
  console.log(arrState);
  const clickHandler = async (e) => {
    e.preventDefault();
    inputState.value = e.target.innerHTML;
  };
  const addHandler = (e) => {
    e.preventDefault();
    const object = Object.fromEntries(new FormData(e.target));
    for (const key in object) {
      if (object[key] === '') {
        newArr.push(0);
      } else newArr.push(Number(object[key]));
    }
    const obj = { input: newArr };
    const temp = JSON.stringify(obj);
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '488f437511msh2d3854838388c55p13692cjsn135921cfebdf',
        'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com',
      },
      body: temp,
    };

    fetch('https://sudoku-solver3.p.rapidapi.com/sudokusolver/', options)
      .then((response) => response.json())
      .then((response) => setArrState(response.answer))
      .catch((err) => console.error(err));
  };
  console.log(arrState);
  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <div className="btn-group-vertical mt-4">
          <form onSubmit={addHandler} className="container text-center">
            {!arrState && arr.map((item, index) => ((
              <div key={`${index}`} className="row">
                {item.map((subItem, sIndex) => <input onFocus={(e) => { setInputState(e.target); }} name={`${index},${sIndex}`} key={`${sIndex}`} id={`${index},${sIndex}`} className="col" />)}
              </div>
            )))}
            {/* {arrState && arrState.map((item, index) => ((
              <div key={`${index}`} className="row">
                {item.map((subItem, sIndex) => <input name={`${index},${sIndex}`} key={`${sIndex}onFocus={(e) => { setArrState(e.target); }}`} id={`${index},${sIndex}`} value={subItem} className="col" />)}
              </div>
            )))} */}

            <div className="btn-group">
              <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">1</button>
              <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">2</button>
              <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">3</button>
            </div>
            <div className="btn-group">
              <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">4</button>
              <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">5</button>
              <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">6</button>
            </div>
            <div className="btn-group">
              <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">7</button>
              <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">8</button>
              <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">9</button>
            </div>
            <button type="submit" className="btn btn-outline-secondary py-3">Решить</button>
          </form>
        </div>
      </div>
    </div>
  );
}
