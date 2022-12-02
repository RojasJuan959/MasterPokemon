import Home from "./Pages/Home/Home.js";
import PokeProvider from "./Context/PokeContext.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <PokeProvider>
        <Home />
      </PokeProvider>
    </div>
  );
}

export default App;
