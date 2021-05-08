import { useContext } from 'react';

import { AppContext } from '../context/AppState';
import { FaMinus, FaPlus, FaTimes, FaDivide } from 'react-icons/fa';

const Display = () => {
  const {
    state: { isOn, displayValue, operation, historyIndex },
  } = useContext(AppContext);
  let operator;
  switch (operation) {
    case 'add':
      operator = <FaPlus />;
      break;
    case 'subtract':
      operator = <FaMinus />;
      break;
    case 'multiply':
      operator = <FaTimes />;
      break;
    case 'divide':
      operator = <FaDivide />;
      break;
    default:
      operator = '';
      break;
  }

  return (
    <div className={`display ${isOn ? 'on' : ''}`}>
      <div className="info">
        <span className="history">{historyIndex}</span>
        <span className="operator">{operator}</span>
      </div>
      <div className="main">{displayValue}</div>
    </div>
  );
};

export default Display;
