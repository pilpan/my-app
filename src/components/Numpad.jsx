import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import ButtonGroup from './ButtonGroup';
import InputEmpty from './InputEmpty';
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
function loadgame() {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '488f437511msh2d3854838388c55p13692cjsn135921cfebdf',
        'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com',
      },
    };

    fetch('https://sudoku-board.p.rapidapi.com/new-board?diff=2&stype=list&solu=true', options)
      .then((response) => response.json())
      .then((response) => resolve(response.response['unsolved-sudoku'].reduce((flat, current) => flat.concat(current), [])))
      .catch((err) => reject(err));
  });
}
let game = true;
export default function Numpad() {
  const arr = new Array(81).fill(0);
  const [arrState, setArrState] = useState();
  const [gameArrState, setGameArrState] = useState();
  const [inputState, setInputState] = useState();
  const newArr = [];
  const gameHandler = (e) => {
    e.preventDefault();
    game = false;
    toast.promise(loadgame(), {
      pending: 'Ждем загрузку',
      success: {
        render({ data }) {
          setGameArrState(data);
          return 'Хорошей Игры!👌';
        },
      },
      error: 'Ошибка Ввода!🤯',
    });
  };
  const clickHandler = async (e) => {
    e.preventDefault();
    inputState.value = e.target.innerHTML;
  };
  const addHandler = (e) => {
    e.preventDefault();
    game = true;
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
            <form onSubmit={addHandler} className="container" style={{ width: '30rem' }}>
              {/* game = true */}
              {!arrState && game && arr.map((el, index) => (
                <InputEmpty key={index} index={index} setInputState={setInputState} />
              )) }
              {gameArrState && !game && gameArrState.map((el, index) => (
                <InputOld key={index} el={el} index={index} setInputState={setInputState} />
              )) }
              {arrState && arrState.map((el, index) => (
                <InputNew key={index} el={el} index={index} />
              ))}
              <ButtonGroup clickHandler={clickHandler} gameHandler={gameHandler} />
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
