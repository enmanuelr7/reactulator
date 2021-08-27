import { createContext, useState, useEffect } from 'react';

// inital state
const initialState = {
  isOn: false,
  displayValue: '',
  operation: null,
  historyIndex: null,
  num1: null,
  shouldClearScreen: false,
  error: false,
};

const DISPLAY_VALUE_MAX_LENGTH = 10;
const DOT = '.';
const ZERO = '0';
const ERROR_MSG = 'ERROR';

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

const operate = (operation, num1, num2) => {
  return operations[operation](num1, num2);
};

const formatNumber = (number) => {
  if (
    isNaN(number) ||
    [Infinity, -Infinity].some((value) => value === number) ||
    String(Math.ceil(number)).length > DISPLAY_VALUE_MAX_LENGTH
  ) {
    return ERROR_MSG;
  }

  if (String(number).length > DISPLAY_VALUE_MAX_LENGTH) {
    if (!String(number).includes(DOT)) {
      return ERROR_MSG;
    }
    const wholePartLength = String(Math.trunc(number)).length;
    return number.toFixed(DISPLAY_VALUE_MAX_LENGTH - wholePartLength -1)
  }


  return String(number);
};

// create context
export const AppContext = createContext(initialState);

// provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (state.displayValue === ERROR_MSG && !state.error) {
      setState({
        ...state,
        error: true,
      });
    }
  }, [state]);

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
      !state.error &&
      (state.displayValue.length < DISPLAY_VALUE_MAX_LENGTH ||
        state.shouldClearScreen)
    ) {
      if (state.shouldClearScreen) {
        setState({
          ...state,
          displayValue: data,
          shouldClearScreen: false,
        });
      } else {
        setState({
          ...state,
          displayValue:
            state.displayValue === ZERO ? data : state.displayValue + data,
          shouldClearScreen: false,
        });
      }
    }
  };

  const appendDot = () => {
    if (
      state.isOn &&
      !state.error &&
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
    if (state.isOn && !state.error && !state.shouldClearScreen) {
      if (state.displayValue.length > 1) {
        setState({
          ...state,
          displayValue: state.displayValue.substr(
            0,
            state.displayValue.length - 1
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

  const setOperation = (operation) => {
    if (state.isOn && !state.error) {
      if (state.shouldClearScreen) {
        setState({
          ...state,
          operation,
        });
      } else if (state.num1) {
        setState({
          ...state,
          operation,
          num1: +formatNumber(
            operate(state.operation, state.num1, +state.displayValue)
          ),
          displayValue: formatNumber(
            operate(state.operation, state.num1, +state.displayValue)
          ),
          shouldClearScreen: true,
        });
      } else {
        setState({
          ...state,
          operation,
          num1: +state.displayValue,
          displayValue: formatNumber(+state.displayValue),
          shouldClearScreen: true,
        });
      }
    }
  };

  const equals = () => {
    if (state.isOn && state.operation && !state.error) {
      setState({
        ...state,
        displayValue: formatNumber(
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
