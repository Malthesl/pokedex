import { usePokemon, useSpecies, type Pokemon } from "./pokemon.ts";
import { PokemonType } from "./PokemonType.tsx";
import { Link } from "react-router";
import { SoundManager } from "./sound.ts";

async function playPokemonSound (pokemon: Pokemon)
{
  await SoundManager.loadSound(pokemon.cries.latest, pokemon.name)
  SoundManager.playSound(pokemon.name)
}

export function PokemonCard (props: { name: string })
{
  const pokemon = usePokemon(props.name);
  const species = useSpecies(pokemon?.id);
  
  return (
    <Link to={"/pokemon/" + props.name} className="no-deco">
      {
        pokemon === null ? <div>Indlæser...</div> :
          <div className="pokemon-card" style={{backgroundColor: `color-mix(in srgb, ${species?.color} 40%, #ddd 60%)`}}
               onMouseEnter={() => playPokemonSound(pokemon)}>
            <img className="pokemon-card-image" src={pokemon.sprites.other.showdown.front_default!} alt="" />
            <h1>{species?.name ?? "Indlæser..."}</h1>
            <p>{species?.flavor_text ?? "Indlæser..."}</p>
            <div className="pokemon-types">
              {
                pokemon.types.map(t => <PokemonType key={t.type.name} name={t.type.name} />)
              }
            </div>
          </div>
      }
    </Link>
  );
}