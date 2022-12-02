import { useContext, useEffect, useState } from "react";
import PokeCard from "../../Components/Card/pokeCard.js";
import { PokeContext } from "../../Context/PokeContext.js";
import Flickity from "react-flickity-component";

import pokemonIniciales from "../../Partials/PokemonIniciales.json";

import './Home.css'

const Home = () => {
  const { initialData } = useContext(PokeContext);
  const [initialDataHelper, setInitialDataHelper] = useState(initialData);

  const flickityOptions = {
    prevNextButtons: false,
    pageDots: false,
  };

  useEffect(() => {
    setTimeout(() => {
      setInitialDataHelper(initialData);
    }, 1000);
  }, [initialData]);

  const getPokeGen = (genNumber, pokemonType) => {
    let pokemonWay = [];

    

    if (pokemonType === "Fuego") {
      for (let i = 0; i < pokemonIniciales.length; i++) {
        if (pokemonIniciales[i].Id === genNumber) {
          for (let j = 0; j < pokemonIniciales[i].Fuego.length; j++) {
            for (let k = 0; k < initialDataHelper.length; k++) {
              if (
                initialDataHelper[k].name.includes(
                  pokemonIniciales[i].Fuego[j].toString()
                )
              )
              
                pokemonWay.push(initialDataHelper[k]);
            }
          }
        }
      }
    } else if (pokemonType === "Agua") {
      for (let i = 0; i < pokemonIniciales.length; i++) {
        if (pokemonIniciales[i].Id === genNumber) {
          for (let j = 0; j < pokemonIniciales[i].Agua.length; j++) {
            for (let k = 0; k < initialDataHelper.length; k++) {
              if (
                initialDataHelper[k].name.includes(
                  pokemonIniciales[i].Agua[j].toString()
                )
              )
                pokemonWay.push(initialDataHelper[k]);
            }
          }
        }
      }
    } else {
      for (let i = 0; i < pokemonIniciales.length; i++) {
        if (pokemonIniciales[i].Id === genNumber) {
          for (let j = 0; j < pokemonIniciales[i].Planta.length; j++) {
            for (let k = 0; k < initialDataHelper.length; k++) {
              if (
                initialDataHelper[k].name.includes(
                  pokemonIniciales[i].Planta[j].toString()
                )
              )
                pokemonWay.push(initialDataHelper[k]);
            }
          }
        }
      }
    }

    return (
      <Flickity
        className={"carouselPokeWay"}
        elementType={"div"}
        options={flickityOptions}
      >
        {pokemonWay.map((pokemon) => {
          return (
            <PokeCard
              key={pokemon.id}
              name={pokemon.name}
              sprites={pokemon.sprites.other.dream_world.front_default}
              hp={pokemon.stats[0].base_stat}
              attack={pokemon.stats[1].base_stat}
              defense={pokemon.stats[2].base_stat}
              specialAttack={pokemon.stats[3].base_stat}
              specialDefense={pokemon.stats[4].base_stat}
              speed={pokemon.stats[5].base_stat}
              type={pokemonType}
            ></PokeCard>
          );
        })}
      </Flickity>
    );
  };

  return (
    <div className="basePokeCards">
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(1, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(1, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(1, "Planta")}
        </div>
      </div>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(2, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(2, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(2, "Planta")}
        </div>
      </div>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(3, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(3, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(3, "Planta")}
        </div>
      </div>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(4, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(4, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(4, "Planta")}
        </div>
      </div>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(5, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(5, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(5, "Planta")}
        </div>
      </div>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(6, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(6, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(6, "Planta")}
        </div>
      </div>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(7, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(7, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(7, "Planta")}
        </div>
      </div>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(8, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(8, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(8, "Planta")}
        </div>
      </div>
    </div>
  );
};

export default Home;
