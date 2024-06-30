// eslint-disable-next-line react/prop-types
const CustomButton = ({ text, handleClick }) => {
  return (
    <button
      className="bg-white px-3 py-2 rounded-md border border-black"
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
};

export default CustomButton;
