import Search from "../assets/search.svg";
import Header from "../components/Header";
import CardMain from "../components/CardMain";
import Button from "../components/Button";
import axios from "axios";
import { useEffect, useState } from "react";

function Homepage() {
  const [datas, setDatas] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    getTypes();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50")
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
            setLoading(false);
            return setDatas((datas) => [...datas, filter]);
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const loadMore = () => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${datas.length}&limit=50`)
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
            setLoading(false);
            return setDatas((datas) => [...datas, filter]);
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getTypes = () => {
    setLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => {
        response.data.results.map((detailMonster) => {
          axios.get(detailMonster.url).then((result) => {
            setLoading(false);
            return setTypes((datas) => [
              ...datas,
              { id: result.data.id, name: result.data.name },
            ]);
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const searchAction = (e) => {
    if (search === "") {
      getData();
    }
    e.preventDefault();
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then((response) => {
        console.log(response);
        const filter = {
          id: response.data.id,
          name: response.data.name,
          height: response.data.height,
          weight: response.data.weight,
          image: response.data.sprites.other.dream_world.front_default,
          types: response.data.types,
        };
        setLoading(false);
        return setDatas(() => [filter]);
      })
      .catch((error) => {
        console.log(error.message);
        return setDatas(() => []);
      });
  };

  const filterType = (selected, callback) => {
    if (loading) {
      filterType(selected, callback);
    } else {
      callback(selected);
    }
  };

  const actionFilterType = async (selected) => {
    const resFilter = [];
    await datas.reduce((_acc, item) => {
      item.types.map((value) => {
        if (value.type.name == selected) {
          resFilter.push(item);
        }
      });
    }, []);
    if (resFilter.length < 1) {
      return setDatas(() => []);
    } else {
      return setDatas(() => resFilter);
    }
  };
  return (
    <div className="container mx-auto pb-10 px-4 tablet:px-2">
      <Header />
      <section className="py-8 px-8 space-y-5">
        <div className="relative tablet:w-[80%] laptop:w-[70%] desktop:w-[30%] mx-auto">
          <form onSubmit={searchAction}>
            <input
              onClick={(e) => setSearch(e.target.value)}
              className="bg-white py-2 pl-5 pr-12 rounded-md text-black outline-none placeholder-black mx-auto shadow-md w-full"
              placeholder="Search Pokemon"
            />
          </form>
          <img
            className="absolute right-4 top-[20%] w-7"
            src={Search}
            loading="lazy"
          />
        </div>
        <div className="relative tablet:w-[80%] laptop:w-[70%] desktop:w-[30%] mx-auto">
          <select
            onChange={(e) => {
              e.preventDefault()
              let { value } = e.target;
              setDatas(() => []);
              getData();
              return filterType(value, actionFilterType);
            }}
            className="tablet:w-[50%] py-2 pl-5 pr-12 rounded-md shadow-md outline-none cursor-pointer capitalize"
            name="type"
            id="type"
          >
            <option value="" disabled selected>
              Select Type
            </option>
            {types?.map((type) => (
              <option
                label={type.name}
                key={type.id}
                value={type.name}
              >
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </section>
      <main className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 monitor:grid-cols-5 gap-5 tablet:gap-10">
        {datas?.map((data, index) => {
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
      {datas.length === 0 && (
        <div className="text-center mt-14">
          <button className="bg-green-bright text-black text-lg w-fit py-3 px-8 rounded-md mx-auto">
            NO DATA
            <p>The search must be complete and correct !</p>
          </button>
        </div>
      )}
      {datas.length <= 300 && datas.length !== 0 && (
        <div className="text-center mt-14">
          <Button
            onClick={() => loadMore()}
            text={"Load More"}
            className={"text-white bg-red-bright "}
          />
        </div>
      )}
    </div>
  );
}

export default Homepage;
