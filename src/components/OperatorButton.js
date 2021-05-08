import { useContext } from 'react';
import { FaMinus, FaPlus, FaTimes, FaDivide } from 'react-icons/fa';

import { AppContext } from '../context/AppState';
import Button from './Button';

const OperatorButton = ({ operation }) => {
  let symbol;
  switch (operation) {
    case 'add':
      symbol = <FaPlus />;
      break;
    case 'subtract':
      symbol = <FaMinus />;
      break;
    case 'multiply':
      symbol = <FaTimes />;
      break;
    case 'divide':
      symbol = <FaDivide />;
      break;
    default:
      break;
  }

  const { setOperation } = useContext(AppContext);
  return <Button children={symbol} action={() => setOperation(operation)} />;
};

export default OperatorButton;
