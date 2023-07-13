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
      className={`card bg-gray h-[250px] tablet:h-[300px] laptop:h-[350px] rounded-lg shadow-md overflow-hidden hover:scale-105 cursor-pointer active:scale-90 ease-in ${className}`}
    >
      <div className="w-full bg-white flex items-center justify-center h-[70%] tablet-md:h-[70%]">
        <img className="w-[60%] h-auto" src={data.image} loading="lazy" />
      </div>
      <div className="text-center py-2 px-2">
        <p className="text-[18px] tablet:text-[28px] desktop:text-[35px] font-bold tablet:font-semibold capitalize">{data.aliasName !== undefined && data.aliasName !== "" ? data.aliasName : data.name }</p>
        <p className="text-[14px] tablet:text-[18px] desktop:text-[20px] font-semibold capitalize ">Type : {types?.join(", ")}</p>
      </div>
    </div>
  );
}

export default CardMain;
