/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2";

const getPokemons = (limit, start) => {
  return fetch(
    `${BASE_URL}/pokemon?limit=${limit ?? 151}&offset=${start ?? 0}`
  )
    .then((response) => response.json())
    .then((data) => {
      //resuelve las promesas que vienen dentro de un array y devuelve una promesa
      //cuando se resuelven todas las promesas del array se resuelve esa promesa
      return Promise.all(
        data.results.map((pokemon) => getPokemon(pokemon.url))
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
      <p>{name}</p>
      <img src={sprites.front_default} alt="" />
    </>
  );
};

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons(900).then((data) => setPokemons(data));
  }, []);

  console.log({ pokemons });

  return (
    <div className="bg-dark text-white flex justify-center items-center">
      <Pokemons pokemons={pokemons} />
    </div>
  );
}

export default App;
