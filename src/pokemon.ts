import { useState, useEffect } from "react";

export interface Pokemon
{
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string | null;
    other: {
      showdown: {
        front_default: string | null;
      }
    }
  };
  species: { name: string };
  cries: { latest: string };
}

export function usePokemon (name?: string)
{
  const [ pokemon, setPokemon ] = useState<Pokemon | null>(null);
  
  useEffect(() =>
  {
    if (name != null)
      fetch("https://pokeapi.co/api/v2/pokemon/" + name)
        .then(response => response.json())
        .then(data => setPokemon(data));
    else
      setPokemon(null);
  }, [ name ]);
  
  return pokemon;
}

export function useSpecies (id?: number)
{
  const [ species, setSpecies ] = useState<{ name: string, flavor_text: string, color: string } | null>(null);
  
  useEffect(() =>
  {
    if (id != null)
      fetch("https://pokeapi.co/api/v2/pokemon-species/" + id)
        .then(response => response.json())
        .then(data => setSpecies({
          name: data.names.find((n: any) => n.language.name === "en")?.name,
          flavor_text: data.flavor_text_entries.find((n: any) => n.language.name === "en")
                           ?.flavor_text
                           .replaceAll(/\s/g, " "),
          color: data.color.name
        }));
  }, [ id ]);
  
  return species;
}

export function usePokemons (page: number, pageSize: number)
{
  const [ pokemons, setPokemons ] = useState<{ name: string, url: string }[]>([]);
  
  useEffect(() =>
  {
    setPokemons([]);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${page * pageSize}`)
      .then(response => response.json())
      .then(data => setPokemons(data.results));
  }, [ page, pageSize ]);
  
  return pokemons;
}