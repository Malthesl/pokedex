import { useState, useEffect } from "react";

const typeColors = {
  normal: [ "white", "black" ],
  fire: [ "red", "white" ],
  water: [ "blue", "white" ],
  electric: [ "yellow", "black" ],
  grass: [ "green", "white" ],
  ice: [ "cyan", "black" ],
  fighting: [ "black", "white" ],
  poison: [ "purple", "white" ],
  ground: [ "brown", "white" ],
  flying: [ "orange", "black" ],
} as { [key: string]: [ string, string ] };

function useType (name: string)
{
  const [ pokemon, setPokemon ] = useState<{
    name: string,
    names: { name: string, language: { name: string } }[]
  } | null>(null);
  
  useEffect(() =>
  {
    fetch("https://pokeapi.co/api/v2/type/" + name)
      .then(response => response.json())
      .then(data => setPokemon(data));
  }, [ name ]);
  
  return pokemon;
}

export function PokemonType (props: { name: string })
{
  const type = useType(props.name);
  
  return (
    type === null ? <div>Loading...</div> :
      <p className="pokemon-type" style={{background: typeColors[props.name]?.[0], color: typeColors[props.name]?.[1]}}>
        {type.names.find(n => n.language.name === "en")?.name || props.name}
      </p>
  );
}