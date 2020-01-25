import React, { useReducer, useEffect } from 'react';
// import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import './index.scss';

const getViewBox = ({ svg }) => {
  return `0 0 ${svg.viewPortWidth} ${svg.viewPortHeight}`;
}

const getPercentage = (number) => {
  return number > 100 ? 100 : (number < 0 ? 0 : number);
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STOKES': return { ...state, strokeDasharray: action.payload }
    default: throw new Error();
  }
}

interface Props {
  number: number;
  strokeWidth?: number;
  width: number;
  height: number;
  strokeColor: string;
  isTextShown: boolean
  children?: any
}
const App = ({ number, strokeWidth, width, height, strokeColor, isTextShown, children }: Props) => {
  const configure = {
    viewPortWidth: 100,
    viewPortHeight: 100,
    circleStrokeWidth: !!strokeWidth ? strokeWidth : 5
  }
  const initialState = {
    circle: {
      cx: configure.viewPortWidth / 2,
      cy: configure.viewPortHeight / 2,
      r: configure.viewPortWidth / 2 - configure.circleStrokeWidth,
      strokeWidth: configure.circleStrokeWidth
    },
    svg: {
      width: width || configure.viewPortWidth,
      height: height || configure.viewPortHeight,
      viewPortWidth: configure.viewPortWidth,
      viewPortHeight: configure.viewPortHeight,
    },
    strokeDasharray: '0 1000'
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const percentage = getPercentage(number);
    const perimeter = Math.PI * 2 * state.circle.r;
    const path = Math.floor(perimeter * percentage / 100);
    const fPerimeter = Math.ceil(perimeter);
    setTimeout(() => dispatch({ type: 'SET_STOKES', payload: `${path} ${fPerimeter}` }));
  }, [number, state.circle.r])

  return (
    <div className="my-progress-container">
      <div>
        <svg className="my-progress-bar" viewBox={getViewBox(state)} width={state.svg.width} height={state.svg.height}>
          <circle className="circle-bg" {...state.circle}></circle>
          <circle className="circle-path" {...state.circle} style={{ 'strokeDasharray': state.strokeDasharray, 'stroke': strokeColor || '#5116d0' }}></circle>
          {
            isTextShown &&
            <text
              className="progress-text"
              x={state.circle.cx}
              y={state.circle.cy}>{getPercentage(number)} %</text>
          }
        </svg>
      </div>
      <div className="my-progress-content">
        {children}
      </div>
    </div>
  );
}

export default App;
