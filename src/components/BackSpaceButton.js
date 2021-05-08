import { useContext } from 'react';
import { FaBackspace } from 'react-icons/fa';

import { AppContext } from '../context/AppState';
import Button from './Button';

const BackSpaceButton = () => {
  const { backSpace } = useContext(AppContext);
  return <Button children={<FaBackspace />} action={backSpace} />;
};

export default BackSpaceButton;
