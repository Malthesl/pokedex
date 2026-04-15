import "./App.css";
import { usePokemons } from "./pokemon.ts";
import { useState } from "react";
import { PokemonCard } from "./PokemonCard.tsx";

export function Pokedex ()
{
  const [ page, setPage ] = useState(0);
  const pokemons = usePokemons(page, 20);
  
  return (
    <>
      <div className="pokedex">
        {
          pokemons.map(p => <PokemonCard name={p.name} key={p.url} />)
        }
      </div>
      <button onClick={() => setPage(page - 1)}>Forrige</button>
      <button onClick={() => setPage(page + 1)}>Næste</button>
    </>
  );
}