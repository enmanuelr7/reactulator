import { useContext } from 'react';
import { FaHistory } from 'react-icons/fa';

import { AppContext } from '../context/AppState';
import Button from './Button';

const HistoryButton = () => {
  const { historyAction } = useContext(AppContext);
  return <Button children={<FaHistory />} action={historyAction} />;
};

export default HistoryButton;
