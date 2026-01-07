function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-7 rounded-full relative transition
        ${checked ? "bg-blue-600" : "bg-gray-300"}
      `}
    >
      <span
        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition
          ${checked ? "translate-x-5" : ""}
        `}
      />
    </button>
  );
}

export default Toggle;
