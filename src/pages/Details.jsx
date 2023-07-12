import { useContext } from "react";
import Arrow from "../assets/arrow-back.svg";
import Button from "../components/Button";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import CollectContext from "../features/CollectContext";

function Homepage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  let types = [];
  state.types?.map((data) => {
    types.push(data.type.name);
  });

  const pokeCollect = useContext(CollectContext);

  return (
    <div className="container mx-auto pb-10">
      <Header />
      <section className="w-[80%] px-8 py-10 mt-8 mx-auto bg-white shadow-md rounded-md">
        <div
          onClick={() => navigate(-1)}
          className="flex gap-3 items-center cursor-pointer"
        >
          <img className="w-6" src={Arrow} loading="lazy" />
          <p className="text-[22px]">Back</p>
        </div>
        <div className="w-full py-4 bg-white flex items-center justify-center">
          <img className="h-[200px]" src={state.image} loading="lazy" />
        </div>
        <main className="w-[95%] mx-auto shadow-lg rounded-md bg-gray py-8 px-5 flex flex-col items-center gap-y-4">
          <h1 className="text-[40px] capitalize ">{state.name}</h1>
          <p className="text-[25px] capitalize ">Type : {types?.join(", ")}</p>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-red-600 text-[25px]">Weight :</p>
              <p className="text-red-600 text-[45px] font-bold">
                {state.weight}
              </p>
            </div>
            <div className="text-center">
              <p className="text-red-600 text-[25px]">Height :</p>
              <p className="text-red-600 text-[45px] font-bold">
                {state.height}
              </p>
            </div>
          </div>
          <input
            className="bg-white min-w-[30%] py-4 px-5 rounded-md text-black text-center outline-none placeholder-black placeholder:text-center mx-auto shadow-md place-content-center"
            placeholder="Name Alias Monster"
          />
          <Button
            onClick={() => {
              pokeCollect.setCollect([state, ...pokeCollect.collect]);
              return navigate("/collect");
            }}
            text={"Save Pokemon"}
            className={"min-w-[25%] bg-green-bright text-black"}
          />
          <Button
            onClick={() => {
              const index = pokeCollect.collect.findIndex((n) => n.id === state.id)
              pokeCollect.collect.splice(index, 1)
            }}
            text={"Delete Pokemon"}
            className={"min-w-[25%] bg-red-bright text-black"}
          />
        </main>
      </section>
    </div>
  );
}

export default Homepage;
