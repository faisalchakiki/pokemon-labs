import { useContext } from "react";
import Ball from "../assets/poke-ball.svg";
import CardMain from "../components/CardMain";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import CollectContext from "../features/CollectContext";

function Homepage() {
  const navigate = useNavigate();
  const pokeCollect = useContext(CollectContext)

  return (
    <div className="container mx-auto pb-10">
      <Header route="collect" />
      <section className="p-10 space-y-5">
        <div className="flex items-center justify-center gap-3">
          <img
            className="w-12 cursor-pointer active:rotate-180 ease-in duration-100"
            src={Ball}
            loading="lazy"
          />
          <p className="text-[25px] text-shadow font-bold">Saved Pokemon</p>
        </div>
      </section>
      {pokeCollect.collect.length > 1 ? (
        <main className="grid grid-cols-5 gap-10">
        {pokeCollect.collect?.map((data,index) => {
          if (index % 2 === 0) {
            return <CardMain key={data.id} data={data} />;
          } else {
            return (
              <CardMain
                key={data.id}
                data={data}
                className={"bg-green-bright"}
              />
            );
          }
        })}
      </main>
      ) : (
        <div onClick={() => navigate("/")} className="text-center mt-14">
          <button className="bg-green-bright text-black text-lg w-fit py-3 px-8 rounded-md mx-auto">
            NO DATA
            <p>Save Pokemon First !</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Homepage;
