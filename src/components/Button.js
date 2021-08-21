const Button = ({ children, equals, action }) => {
  return (
    <button className={`btn ${equals ? 'equals' : ''}`} onClick={action}>
      <div>{children}</div>
    </button>
  );
};

export default Button;
