import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import ButtonGroup from './ButtonGroup';
import InputNew from './InputNew';
import InputOld from './InputOld';

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
            <form onSubmit={addHandler} className="container" style={{ width: '30rem'}}>
              {!arrState && arr.map((el, index) => (
                <InputOld key={index} index={index} setInputState={setInputState} />
              )) }
              {arrState && arrState.map((el, index) => (
                <InputNew key={index} el={el} index={index} />
              ))}
              <ButtonGroup clickHandler={clickHandler} />
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
