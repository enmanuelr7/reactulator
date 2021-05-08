import { useContext } from 'react';
import { FaPowerOff } from 'react-icons/fa';

import { AppContext } from '../context/AppState';
import Button from './Button';

const PowerButton = () => {
  const { togglePower } = useContext(AppContext);
  return (
    <Button action={togglePower} children={<FaPowerOff />} />
  );
};

export default PowerButton;
