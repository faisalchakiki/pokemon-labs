import { useContext, useState } from "react";
import Arrow from "../assets/arrow-back.svg";
import Button from "../components/Button";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import CollectContext from "../features/CollectContext";
import Swal from "sweetalert2";

function Details() {
  const [aliasName, setAliasName] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  let types = [];
  state.types?.map((data) => {
    types.push(data.type.name);
  });

  const pokeCollect = useContext(CollectContext);
  const responsiveButton = pokeCollect.collect.findIndex(
    (n) => n.id === state.id
  );
  console.log(pokeCollect)

  return (
    <div className="container mx-auto pb-10 px-4 tablet:px-2">
      <Header />
      <section className="tablet:w-[80%] px-8 py-10 mt-8 mx-auto bg-white shadow-md rounded-md">
        <div
          onClick={() => navigate(-1)}
          className="flex gap-3 items-center cursor-pointer"
        >
          <img className="w-5 tablet:w-6" src={Arrow} loading="lazy" />
          <p className="text-[18px] tablet:text-[22px]">Back</p>
        </div>
        <div className="w-full py-4 bg-white flex items-center justify-center">
          <img
            className="h-[170px] tablet:h-[200px]"
            src={state.image}
            loading="lazy"
          />
        </div>
        <main className="w-[95%] mx-auto shadow-lg rounded-md bg-gray py-8 px-5 flex flex-col items-center gap-1 tablet:gap-y-4">
          <h1 className="text-[30px] tablet:text-[40px] font-bold capitalize ">
            {state.name}
          </h1>
          <p className="text-[18px] tablet:text-[25px] capitalize ">
            Type : {types?.join(", ")}
          </p>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-red-600 text-[17px] tablet:text-[25px]">
                Weight :
              </p>
              <p className="text-red-600 text-[20px] tablet:text-[45px] font-bold">
                {state.weight}
              </p>
            </div>
            <div className="text-center">
              <p className="text-red-600 text-[17px] tablet:text-[25px]">
                Height :
              </p>
              <p className="text-red-600 text-[20px] tablet:text-[45px] font-bold">
                {state.height}
              </p>
            </div>
          </div>
          <input
            onChange={(e) => setAliasName(e.target.value)}
            className="bg-white tablet:min-w-[30%] py-2 my-2 tablet:py-4 tablet:px-5 rounded-md text-black text-center outline-none placeholder-black placeholder:text-center shadow-md place-content-center"
            placeholder="Name Alias Monster (optional)"
          />
          {responsiveButton < 0 ? (
            <Button
              onClick={() => {
                const newData = { ...state, aliasName };
                pokeCollect.addData(newData)
                console.log(pokeCollect)
                Swal.fire("Pokémon saved to Poké Ball", "", "success");
                setTimeout(() => {
                  return navigate("/collect");
                }, 2000);
              }}
              text={"Save Pokemon"}
              className={"min-w-[25%] bg-green-bright text-black"}
            />
          ) : (
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    const index = pokeCollect.collect.findIndex(
                      (n) => n.id === state.id
                    );
                    pokeCollect.collect.splice(index, 1);
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                    setTimeout(() => {
                      return navigate("/collect");
                    }, 1000);
                  }
                });
              }}
              text={"Delete Pokemon"}
              className={"min-w-[25%] bg-red-bright text-black"}
            />
          )}
        </main>
      </section>
    </div>
  );
}

export default Details;
