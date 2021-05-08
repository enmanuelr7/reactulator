import { useContext } from 'react';

import { AppContext } from '../context/AppState';
import Button from './Button';

const NumberButton = ({ data }) => {
  const { appendNumber } = useContext(AppContext);
  return <Button children={data} action={() => appendNumber(data)} />;
};

export default NumberButton;
