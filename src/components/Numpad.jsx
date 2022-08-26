import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

if (typeof window !== 'undefined') {
  injectStyle();
}
function load(temp) {
  return new Promise((resolve, reject) => {
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
      .then((response) => resolve(response.answer))
      .catch((err) => reject(err));
  });
}
export default function Numpad() {
  const arr = new Array(81).fill(0);
  const [arrState, setArrState] = useState();
  const [inputState, setInputState] = useState();
  const newArr = [];
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
    toast.promise(load(temp), {
      pending: 'Ждем загрузку',
      success: {
        render({ data }) {
          setArrState(data);
          return 'Все получилось!👌';
        },
      },
      error: 'Ошибка Ввода!🤯',
    });
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="btn-group-vertical mt-4">
            <form onSubmit={addHandler} className="container" style={{ width: '500px', height: '550px' }}>
              {!arrState && arr.map((el, index) => (
                <input
                  onFocus={(e) => { setInputState(e.target); }}
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                  className="text-center"
                  name={`${index}`}
                  key={`${index}`}
                  id={`${index}S`}
                />
              )) }
              {arrState && arrState.map((el, index) => (
                <input
                  key={`${index}`}
                  id={`${index}S`}
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                  className="text-center"
                  value={el}
                  readOnly
                />
              ))}
              <div style={{ width: '1rem', height: '28rem' }}>
                <div className="btn-group" style={{ width: '28rem' }}>
                  <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">1</button>
                  <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">2</button>
                  <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">3</button>
                </div>
                <div className="btn-group" style={{ width: '28rem' }}>
                  <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">4</button>
                  <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">5</button>
                  <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">6</button>
                </div>
                <div className="btn-group" style={{ width: '28rem' }}>
                  <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">7</button>
                  <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">8</button>
                  <button type="button" onClick={clickHandler} className="btn btn-outline-secondary py-3">9</button>
                </div>
                <div>
                  <button type="submit" className="btn btn-outline-secondary py-3" style={{ 'margin-left': '11rem' }}>Решить</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
