import React, { createContext, useState, useEffect } from "react";
import PokeInit from "../Partials/PokemonIniciales.json";

export const PokeContext = createContext();

const PokemonIniciales = {};

export const PokeProvider = ({ children }) => {
  const [initialData, setInitialData] = useState(PokemonIniciales);
  let arrayAcumulator = [];

  useEffect(() => {
    PokeInit.map((position) =>
      position.Fuego.map((pokeName) => getPokemons(pokeName))
    );
    PokeInit.map((position) =>
      position.Agua.map((pokeName) => getPokemons(pokeName))
    );
    PokeInit.map((position) =>
      position.Planta.map((pokeName) => getPokemons(pokeName))
    );
    setInitialData(arrayAcumulator);
  }, []);

  const getPokemons = (pokeName) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url, {
      cache: "no-cache",
    })
      .then(async (response) => {
        if (response.status === 200) {
          let res = await response.json();
          arrayAcumulator.push(res);
        }
      })
      .catch(() => {});
  };

  return (
    <PokeContext.Provider
      value={{
        initialData,
        setInitialData,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
};

export default PokeProvider;