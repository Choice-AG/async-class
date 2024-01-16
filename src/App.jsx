import { useState } from "react";
import { useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2";

const Pokemons = ({ pokemons }) => {
  return (
    <div className="">
      {pokemons.map((pokemon) => (
        <div className="my-2" key={pokemon.name}>
          <Pokemon pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

const Pokemon = ({ pokemon }) => {
  return (
    <>
      <p>{pokemon.name}</p>
    </>
  );
};

const getPokemons = (limit, start) => {
  return fetch(`${BASE_URL}/pokemon?limit=${limit ?? 151}&offset=${start ?? 0}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      return data.results;
    });
};

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons().then((data) => setPokemons(data));
  }, []);

  return (
    <div className="bg-dark text-white flex justify-center items-center">
      <Pokemons pokemons={pokemons} />
    </div>
  );
}

export default App;
