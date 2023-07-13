import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Details from "./pages/Details";
import Collections from "./pages/Collections";
import CollectContext from "./features/CollectContext";
import { useCallback, useState } from "react";

function App() {
  const [collect, setCollect] = useState([])
  const addData = useCallback((newData) => {
    setCollect((prevData) => [...prevData, newData]);
  }, []);
  return (
    <BrowserRouter>
      <CollectContext.Provider value={{collect, addData}}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/details" element={<Details />} />
          <Route path="/collect" element={<Collections />} />
        </Routes>
      </CollectContext.Provider>
    </BrowserRouter>
  );
}

export default App;
