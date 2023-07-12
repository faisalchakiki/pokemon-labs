import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Details from "./pages/Details";
import Collections from "./pages/Collections";
import CollectContext from "./features/CollectContext";
import { useState } from "react";

function App() {
  const [collect, setCollect] = useState([])
  return (
    <BrowserRouter>
      <CollectContext.Provider value={{collect, setCollect}}>
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
