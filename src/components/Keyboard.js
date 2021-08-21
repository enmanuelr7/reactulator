import { FaHistory } from 'react-icons/fa';

import Button from './Button';
import PowerButton from './PowerButton';
import NumberButton from './NumberButton';
import DecimalPointButton from './DecimalPointButton';
import BackSpaceButton from './BackSpaceButton';
import OperatorButton from './OperatorButton';
import EqualsButton from './EqualsButton';

const Keyboard = () => {
  return (
    <div className="keyboard">
      <NumberButton data="7" />
      <NumberButton data="8" />
      <NumberButton data="9" />
      <OperatorButton operation="add" />
      <PowerButton />
      <NumberButton data="4" />
      <NumberButton data="5" />
      <NumberButton data="6" />
      <OperatorButton operation="subtract" />
      <Button>
        <FaHistory />
      </Button>
      <NumberButton data="1" />
      <NumberButton data="2" />
      <NumberButton data="3" />
      <OperatorButton operation="multiply" />
      <EqualsButton />
      <NumberButton data="0" />
      <DecimalPointButton />
      <BackSpaceButton />
      <OperatorButton operation="divide" />
    </div>
  );
};

export default Keyboard;
