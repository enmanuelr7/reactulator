const Button = ({ children, equal, action }) => {
  return (
    <button className={`btn ${equal ? 'equal' : ''}`} onClick={action}>
      <div>{children}</div>
    </button>
  );
};

export default Button;
