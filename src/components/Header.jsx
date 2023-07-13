import Logo from "../assets/pokemonLabs.svg";
import Ball from "../assets/poke-ball.svg";
import { useNavigate } from "react-router-dom";

function Header({ route = "" }) {
  const navigate = useNavigate();
  return (
    <header className="w-full flex justify-center py-5 relative">
      <img className="w-[50%] tablet:w-fit cursor-pointer" onClick={()=> navigate("/")} src={Logo} loading="eager" />
      <img
        onClick={() => {
          if (route !== "collect") {
            navigate("/collect");
          } else {
            navigate("");
          }
        }}
        className="absolute right-0 bottom-[20%] w-10 tablet:w-12 cursor-pointer active:rotate-180 ease-in duration-100"
        src={Ball}
        loading="lazy"
      />
    </header>
  );
}

export default Header;
