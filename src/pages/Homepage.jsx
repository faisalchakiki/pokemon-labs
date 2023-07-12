import Search from "../assets/search.svg";
import Header from "../components/Header";
import CardMain from "../components/CardMain";
import Button from "../components/Button";
import axios from "axios";
import { useEffect, useState } from "react";

function Homepage() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        response.data.results.map((detailMonster) => {
          axios.get(detailMonster.url).then((result) => {
            const filter = {
              id: result.data.id,
              name: result.data.name,
              height: result.data.height,
              weight: result.data.weight,
              image: result.data.sprites.other.dream_world.front_default,
              types: result.data.types,
            };
            return setDatas((datas) => [...datas, filter]);
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const loadMore = () => {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/?offset=${datas.length}&limit=20`)
    .then((response) => {
      response.data.results.map((detailMonster) => {
        axios.get(detailMonster.url).then((result) => {
          const filter = {
            id: result.data.id,
            name: result.data.name,
            height: result.data.height,
            weight: result.data.weight,
            image: result.data.sprites.other.dream_world.front_default,
            types: result.data.types,
          };
          return setDatas((datas) => [...datas, filter]);
        });
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <div className="container mx-auto pb-10">
      <Header />
      <section className="p-10 space-y-5">
        <div className="relative w-[30%] mx-auto">
          <input
            className="bg-white py-2 pl-5 pr-12 rounded-md text-black outline-none placeholder-black mx-auto shadow-md w-full"
            placeholder="Search Pokemon"
          />
          <img
            className="absolute right-4 top-[20%] w-7"
            src={Search}
            loading="lazy"
          />
        </div>
        <div className="relative w-[30%] mx-auto">
          <select
            className="w-[50%] py-2 pl-5 pr-12 rounded-md shadow-md outline-none cursor-pointer"
            name="type"
            id="type"
          >
            <option value="" disabled selected>
              Select Type
            </option>
            <option value="grass">Grass</option>
            <option value="air">Air</option>
            <option value="normal">Normal</option>
            <option value="fire">Fire</option>
          </select>
        </div>
      </section>
      <main className="grid grid-cols-5 gap-10">
        {datas?.map((data,index) => {
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
      {datas.length <= 300 && (
        <div className="text-center mt-14">
        <Button onClick={() => loadMore()} text={"Load More"} className={"text-white bg-red-bright "} />
      </div>
      )}
    </div>
  );
}

export default Homepage;
