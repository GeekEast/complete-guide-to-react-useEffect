import React, { useEffect, useReducer } from 'react';

const initialState = { count: 0 };

const Counter = (props: any) => {
  const { step } = props;
  const reducer = (state, action) => {
    switch (action.type) {
      case 'TICK': return { ...state, count: state.count + step };
      default: throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('render');
  useEffect(() => {
    console.log('componentDidUpdate')
    const id = setInterval(() => {
      dispatch({ type: 'TICK' }); // 读取上一次最新的state交给了userReducer去完成
    }, 1000);
    return () => {
      clearInterval(id);
      console.log('clean');
    }
  }, []); // react 保证dispatch在每次渲染中都是一样的

  return (
    <h1>
      {state.count} <br />
      {/* <button onClick={() => { dispatch({ type: 'STEP', payload: step }) }}>Step Up</button> */}
    </h1>
  )
}

export default Counter;