/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2";

const getPokemons = (limit, start) => {
  return fetch(
    `${BASE_URL}/pokemon?limit=${limit ?? 151}&offset=${start ?? 0}`
  )
    .then((response) => response.json())
    .then((pokemons) => {
      //resuelve las promesas que vienen dentro de un array y devuelve una promesa
      //cuando se resuelven todas las promesas del array se resuelve esa promesa
      return Promise.all(
        pokemons.results.map((pokemon) => getPokemon(pokemon.url))
      );
    });
};

const getPokemon = (url) => {
  return fetch(url).then((response) => response.json());
};

const Pokemons = ({ pokemons }) => {
  return (
    <ul className="grid grid-cols-3">
      {Array.isArray(pokemons) &&
        pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <Pokemon pokemon={pokemon} />
          </li>
        ))}
    </ul>
  );
};

const Pokemon = ({ pokemon }) => {
  const { name, sprites } = pokemon;
  return (
    <>
      <p className="text-center">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </p>
      <div className="flex justify-center">
        {pokemon.types.map((type) => (
          <p
            key={type.type.name}
            className="bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold mr-2"
            style={{
              backgroundColor: types[type.type.name],
              color:
                type.type.name === "fighting" ||
                type.type.name === "poison" ||
                type.type.name === "ghost" ||
                type.type.name === "dragon" ||
                type.type.name === "dark"
                  ? "color-coolGray"
                  : "color-gray-800",
            }}
          >
            {type.type.name.charAt(0).toUpperCase() +
              type.type.name.slice(1)}
          </p>
        ))}
      </div>
      <div className="flex justify-center mb-10">
        <img src={sprites.front_default} alt={name} />
      </div>
    </>
  );
};

const types = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons().then((data) => setPokemons(data));
  }, []);

  console.log({ pokemons });

  return (
    <div className="bg-dark text-white flex justify-center items-center">
      <Pokemons pokemons={pokemons} />
    </div>
  );
}

export default App;
