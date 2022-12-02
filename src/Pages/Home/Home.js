import { useContext, useEffect, useState } from "react";
import PokeCard from "../../Components/Card/pokeCard.js";
import { PokeContext } from "../../Context/PokeContext.js";
import Flickity from "react-flickity-component";

import pokemonIniciales from "../../Partials/PokemonIniciales.json";

const Home = () => {
  const { initialData } = useContext(PokeContext);
  const { setInitialData } = useContext(PokeContext);
  const [initialDataHelper, setInitialDataHelper] = useState(initialData);

  const flickityOptions = {
    percentPosition: true,
    prevNextButtons: false,
    pageDots: false,
  };

  useEffect(() => {
    initialData.length === 0 && setInitialDataHelper(initialData);
  }, [initialData]);

  const getPokeGen = (genNumber, pokemonType) => {
    let pokemonWay = [];

    console.log(initialDataHelper)

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
        break;
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
        break;
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
        break;
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
              name={pokemon.name}
              sprites={pokemon.sprites.other.dream_world.front_default}
              hp={pokemon.stats[0].base_stat}
              attack={pokemon.stats[1].base_stat}
              defense={pokemon.stats[2].base_stat}
              specialAttack={pokemon.stats[3].base_stat}
              specialDefense={pokemon.stats[4].base_stat}
              speed={pokemon.stats[5].base_stat}
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
      </div>
    </div>
  );
};

export default Home;
