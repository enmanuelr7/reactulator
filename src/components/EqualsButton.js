import { useContext } from 'react';
import { FaEquals } from 'react-icons/fa';

import { AppContext } from '../context/AppState';
import Button from './Button';

const EqualsButton = () => {
  const { equals } = useContext(AppContext);
  return <Button equals children={<FaEquals />} action={() => equals()} />;
};

export default EqualsButton;
