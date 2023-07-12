import { useNavigate } from "react-router-dom";

function CardMain({ data, className }) {

  let types = [];
  const navigate = useNavigate();
  data.types?.map((data) => {
    types.push(data.type.name);
  });

  return (
    <div
      onClick={() => navigate("/details", {state : data})}
      className={`card bg-gray h-[40vh] rounded-lg shadow-md overflow-hidden hover:scale-105 cursor-pointer active:scale-90 ease-in ${className}`}
    >
      <div className="w-full bg-white flex items-center justify-center h-[70%]">
        <img className="w-[60%] h-auto" src={data.image} loading="lazy" />
      </div>
      <div className="text-center py-2">
        <h3 className="text-[35px] font-semibold capitalize ">{data.name}</h3>
        <p className="text-[20px] font-semibold capitalize ">Type : {types?.join(", ")}</p>
      </div>
    </div>
  );
}

export default CardMain;
