import { useContext } from 'react';
import { BsDot } from 'react-icons/bs';

import { AppContext } from '../context/AppState';
import Button from './Button';

const DecimalPointButton = ({ data }) => {
  const { appendDot } = useContext(AppContext);
  return <Button children={<BsDot />} action={() => appendDot(data)} />;
};

export default DecimalPointButton;
