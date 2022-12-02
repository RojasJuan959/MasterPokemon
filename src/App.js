import Home from "./Pages/Home/Home.js";
import PokeProvider from "./Context/PokeContext.js";

import "./App.css";

function App() {
  return (
    <PokeProvider>
      <div className="App">
        <Home />
      </div>
    </PokeProvider>
  );
}

export default App;
