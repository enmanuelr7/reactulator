import { createContext, useState } from 'react';

// inital state
const initialState = {
  isOn: false,
  displayValue: '',
  operation: null,
  historyIndex: null,
  num1: null,
  shouldClearScreen: false,
};

const DISPLAY_VALUE_MAX_LENGTH = 10;
const DOT = '.';
const ZERO = '0';

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

const toNumber = (data) => {
  return String(+data);
};

// create context
export const AppContext = createContext(initialState);

// provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // actions
  const togglePower = () => {
    if (state.isOn) {
      setState(initialState);
    } else {
      setState({ ...state, isOn: true, displayValue: ZERO });
    }
  };

  const appendNumber = (data) => {
    if (
      state.isOn &&
      (state.displayValue.length < DISPLAY_VALUE_MAX_LENGTH ||
        state.shouldClearScreen)
    ) {
      if (state.shouldClearScreen) {
        setState({
          ...state,
          displayValue: toNumber(data),
          shouldClearScreen: false,
        });
      } else {
        setState({
          ...state,
          displayValue: toNumber(state.displayValue + data),
          shouldClearScreen: false,
        });
      }
    }
  };

  const appendDot = () => {
    if (
      state.isOn &&
      (state.displayValue.length < DISPLAY_VALUE_MAX_LENGTH - 1 ||
        state.shouldClearScreen)
    ) {
      if (state.shouldClearScreen) {
        setState({
          ...state,
          displayValue: ZERO + DOT,
          shouldClearScreen: false,
        });
      } else {
        setState({
          ...state,
          displayValue: state.displayValue.includes(DOT)
            ? state.displayValue
            : state.displayValue + DOT,
          shouldClearScreen: false,
        });
      }
    }
  };

  const backSpace = () => {
    if (state.isOn) {
      if (state.displayValue.length > 1) {
        setState({
          ...state,
          displayValue: toNumber(
            state.displayValue.substr(0, state.displayValue.length - 1)
          ),
        });
      } else {
        setState({
          ...state,
          displayValue: ZERO,
        });
      }
    }
  };

  const operate = (operation, num1, num2) => {
    return operations[operation](num1, num2);
  };

  const setOperation = (operation) => {
    if (state.isOn) {
      if (state.num1) {
        setState({
          ...state,
          operation,
          num1: +toNumber(
            operate(state.operation, state.num1, +state.displayValue)
          ),
          displayValue: toNumber(
            operate(state.operation, state.num1, +state.displayValue)
          ),
          shouldClearScreen: true,
        });
      } else {
        setState({
          ...state,
          operation,
          num1: +toNumber(state.displayValue),
          displayValue: toNumber(state.displayValue),
          shouldClearScreen: true,
        });
      }
    }
  };

  const equals = () => {
    if (state.isOn) {
      setState({
        ...state,
        displayValue: toNumber(
          operate(state.operation, state.num1, +state.displayValue)
        ),
        num1: null,
        operation: null,
      });
    }
  };

  // value
  const value = {
    state,
    togglePower,
    appendNumber,
    appendDot,
    backSpace,
    setOperation,
    equals,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
