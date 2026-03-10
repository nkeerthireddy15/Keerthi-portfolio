import { Routes, Route } from "react-router-dom";

import Homepage from "./Homepage";
import Portfolio from "./Portfolio";

function App() {
  return (
    <>
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </>
  );
}

export default App;
