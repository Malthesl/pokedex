import { useParams } from "react-router";
import { usePokemon, useSpecies } from "./pokemon.ts";
import { PokemonType } from "./PokemonType.tsx";

export function PokemonInfo ()
{
  const {name} = useParams();
  const pokemon = usePokemon(name);
  const species = useSpecies(pokemon?.id);
  
  return (
    <>
      {pokemon === null ? <div>Indlæser...</div> :
        <div className="pokemon">
          <img className="pokemon-image" src={pokemon.sprites.front_default!} alt="" />
          <h1>{species?.name ?? "Indlæser..."}</h1>
          <p>{species?.flavor_text ?? "Indlæser..."}</p>
          <div className="pokemon-types">
            {
              pokemon.types.map(t => <PokemonType key={t.type.name} name={t.type.name} />)
            }
          </div>
        </div>
      }
    </>
  );
}