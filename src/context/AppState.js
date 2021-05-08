import { createContext, useState } from 'react';

// inital state
const initialState = {
  isOn: false,
  displayValue: '',
  operation: null,
  historyIndex: null,
};

const DISPLAY_VALUE_MAX_LENGTH = 10;

// create context
export const AppContext = createContext(initialState);

// provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const toNumber = (data) => {
    return String(Number.parseFloat(data));
  };

  // actions
  const togglePower = () => {
    if (state.isOn) {
      setState(initialState);
    } else {
      setState({ ...state, isOn: true, displayValue: '0' });
    }
  };

  const appendNumber = (data) => {
    if (state.isOn && state.displayValue.length < DISPLAY_VALUE_MAX_LENGTH) {
      setState({ ...state, displayValue: toNumber(state.displayValue + data) });
    }
  };

  const appendDot = () => {
    if (
      state.isOn &&
      state.displayValue.length < DISPLAY_VALUE_MAX_LENGTH &&
      !state.displayValue.includes('.')
    ) {
      setState({ ...state, displayValue: state.displayValue + '.' });
    }
  };

  const backSpace = () => {
    if (state.isOn && state.displayValue.length > 1) {
      setState({
        ...state,
        displayValue: toNumber(
          state.displayValue.substr(0, state.displayValue.length - 1)
        ),
      });
    } else {
      setState({
        ...state,
        displayValue: '0',
      });
    }
  };

  const setOperation = (operation) => {
    if (state.isOn) {
      setState({ ...state, operation });
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
