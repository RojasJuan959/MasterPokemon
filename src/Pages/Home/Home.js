import { useContext, useEffect, useState } from "react";
import PokeCard from "../../Components/Card/pokeCard.js";
import { PokeContext } from "../../Context/PokeContext.js";
import Flickity from "react-flickity-component";

import Search from "../../Assets/Search.png";
import Pokeball from "../../Assets/pokeball.png";
import pokemonIniciales from "../../Partials/PokemonIniciales.json";

import "./Home.css";

const Home = () => {
  const { initialData } = useContext(PokeContext);
  const [initialDataHelper, setInitialDataHelper] = useState(initialData);
  const [pokeSearch, setPokeSearch] = useState([]);
  const [pokeTeam, setPokeTeam] = useState([]);

  const flickityOptions = {
    prevNextButtons: false,
    pageDots: false,
  };

  useEffect(() => {
    setTimeout(() => {
      setInitialDataHelper(initialData);
      callDraggable();
    }, 1000);
  }, [initialData]);

  useEffect(() => {
    if(pokeTeam.length > 0){
      document.getElementsByClassName('containerPokeTeam')[0].style.visibility = 'visible'
      callDraggable();
    }
  }, [pokeTeam]);

  const answerPokemon = () => {
    let spriteImage;

    if (
      pokeSearch.sprites.other.dream_world.front_default === null ||
      pokeSearch.sprites.other.dream_world.front_default === undefined
    ) {
      spriteImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeSearch.id}.png`;
    } else {
      spriteImage = pokeSearch.sprites.other.dream_world.front_default;
    }

    return (
      <div className="sectionAnswerSearch">
        <PokeCard
          key={pokeSearch.id}
          name={pokeSearch.name}
          sprites={spriteImage}
          hp={pokeSearch.stats[0].base_stat}
          attack={pokeSearch.stats[1].base_stat}
          defense={pokeSearch.stats[2].base_stat}
          specialAttack={pokeSearch.stats[3].base_stat}
          specialDefense={pokeSearch.stats[4].base_stat}
          speed={pokeSearch.stats[5].base_stat}
          type={"NoIdentify"}
        ></PokeCard>
        <div className="catchPokemon">
          <img
            className="pokeInteractionCatch"
            alt="Catch Pokemon"
            src={Pokeball}
            onClick={() => {
              let pokemon = {};
              pokemon.sprites = pokeSearch.sprites.front_default;
              pokemon.name = pokeSearch.name;
              pokemon.abilities = pokeSearch.abilities;
              setPokeTeam((pokeTeam) => [...pokeTeam, pokemon]);
            }}
          ></img>
        </div>
      </div>
    );
  };

  const searchPokemon = () => {
    let pokename = document.getElementsByClassName("inputSearch")[0].value;

    if (pokename === null || pokename === undefined || pokename.length === 0) {
      alert("Escribe el nombre de un Pok??mon para encontrarlo");
      return;
    }

    let url = `https://pokeapi.co/api/v2/pokemon/${pokename.toLowerCase()}`;

    fetch(url, {
      cache: "no-cache",
    })
      .then(async (response) => {
        if (response.status === 200) {
          let res = await response.json();
          setPokeSearch(res);
        } else {
          alert("Sigue buscando, a??n no encuentras al Pok??mon");
          return;
        }
      })
      .catch(() => {});
  };

  const getPokeGen = (genNumber, pokemonType) => {
    let pokemonWay = [],
      spriteImage = "";

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
          if (
            pokemon.sprites.other.dream_world.front_default === null ||
            pokemon.sprites.other.dream_world.front_default === undefined
          ) {
            spriteImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
          } else {
            spriteImage = pokemon.sprites.other.dream_world.front_default;
          }
          return (
            <PokeCard
              key={pokemon.id}
              name={pokemon.name}
              sprites={spriteImage}
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

  const callDraggable = () => {
    let draggables = document.querySelectorAll(".draggable");
    let containers = document.querySelectorAll(".containerPokeTeam");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });

    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        let afterElement = getDragAfterElement(container, e.clientY);
        let draggable = document.querySelector(".dragging");
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });

    const getDragAfterElement = (container, y) => {
      let draggableElements = [
        ...container.querySelectorAll(".draggable:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          let box = child.getBoundingClientRect();
          let offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    };
  };

  return (
    <div className="basePokeCards">
      <p className="sectionTitleMain">Master Pokemon</p>
      <span className="sectionSeparatorMain"></span>
      <p className="sectionTitlePokeGen">Primera Generaci??n</p>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(1, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(1, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(1, "Planta")}
        </div>
      </div>
      <p className="sectionTitlePokeGen">Segunda Generaci??n</p>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(2, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(2, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(2, "Planta")}
        </div>
      </div>

      <p className="sectionTitlePokeGen">Tercera Generaci??n</p>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(3, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(3, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(3, "Planta")}
        </div>
      </div>

      <p className="sectionTitlePokeGen">Cuarta Generaci??n</p>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(4, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(4, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(4, "Planta")}
        </div>
      </div>

      <p className="sectionTitlePokeGen">Quinta Generaci??n</p>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(5, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(5, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(5, "Planta")}
        </div>
      </div>

      <p className="sectionTitlePokeGen">Sexta Generaci??n</p>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(6, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(6, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(6, "Planta")}
        </div>
      </div>

      <p className="sectionTitlePokeGen">Septima Generaci??n</p>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(7, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(7, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(7, "Planta")}
        </div>
      </div>

      <p className="sectionTitlePokeGen">Octava Generaci??n</p>
      <div className="sectionPokeCards">
        <div className="sectionPokeCard1GenFuego">{getPokeGen(8, "Fuego")}</div>
        <div className="sectionPokeCard1GenAgua">{getPokeGen(8, "Agua")}</div>
        <div className="sectionPokeCard1GePlanta">
          {getPokeGen(8, "Planta")}
        </div>
      </div>
      <p className="sectionTitlePokeGen">??Busca y construye tu equipo!</p>
      <div className="sectionSearhPokemon">
        <div className="sectionInteractionSearch">
          <input
            className="inputSearch"
            type={"text"}
            placeholder={"Nombre del Pokemon"}
          ></input>
          <button
            className="buttonAction"
            onClick={() => {
              searchPokemon();
            }}
          >
            <img className="buttonActionImg" alt="Search" src={Search}></img>
          </button>
        </div>
        {pokeSearch.hasOwnProperty("id") === true && answerPokemon()}
      </div>
      <div className="containerPokeTeam">
        {pokeTeam.map((pokemon, index) => (
          <div className="pokeContainer draggable" draggable="true" key={index}>
            <div className="draggaSpriteSection">
              <span className="pokeTeamSpriteSection">
                <img
                  className="pokeTeamSpriteImage"
                  src={pokemon.sprites}
                  alt="PokeTeam"
                ></img>
              </span>
            </div>
            <div className="draggaNameSection">
              <p className="pokeTeamName">{pokemon.name}</p>
              <div className="pokeTeamAbilities">
                {pokemon.abilities.map((abilities) => (
                  <span className="pokeTeamAbility">
                    {abilities.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
