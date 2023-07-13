function Button({text, className, onClick}) {
  return (
    <button onClick={onClick} className={`text-md tablet:text-lg w-fit py-2 px-5 my-1 tablet:py-3 tablet:px-8 rounded-md mx-auto  active:scale-90 ease-in duration-100 ${className}`}>
      {text}
    </button>
  )
}

export default Button