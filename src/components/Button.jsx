function Button({text, className, onClick}) {
  return (
    <button onClick={onClick} className={`text-lg w-fit py-3 px-8 rounded-md mx-auto  active:scale-90 ease-in duration-100 ${className}`}>
      {text}
    </button>
  )
}

export default Button