import { setData } from "../global/state/globalState";
import { getPokemonById } from "../services/pokemon.service";
import { Paginacion } from "./paginacion";
import { typePokemon } from "./typePokemon";

let dataGlobal
export const getData2 = async () => {
    const allPokemon = [];
    for (let i = 1; i < 151; i++) {
      allPokemon.push(await getPokemonById(i));
    }
    return mappeoData(allPokemon);
}
const mappeoData = (arrayamapear) => {
    const allPokemonMap = arrayamapear.map((pokemon) => ({
      name: pokemon.name,
      image: pokemon.sprites.other.dream_world.front_default,
      type: pokemon.types,
      id: pokemon.id,
    }))
 
    const types = typePokemon(allPokemonMap); //? types almacena todos los tipos en array
    dataGlobal = {
        pokemonData: allPokemonMap,
        type: types,
  };
  return dataGlobal;
}

//! ------------------------------------------------------------------ PEDRO -------------------------------------
export const filterPokemon = (filterDataInputButton, position) => {
  switch (position) {
    case "type":
      {
        const filterData = dataGlobal.pokemonData.filter((pokemon) =>
          pokemon.type[0].type.name
            .toLowerCase()
            .includes(filterDataInputButton.toLowerCase())
        );

        if (filterData.length === 0) {
          const filterData = dataGlobal.pokemonData.filter((pokemon) =>
            pokemon.type[1]?.type.name
              .toLowerCase()
              .includes(filterDataInputButton.toLowerCase())
          );

          Paginacion(filterData, 3);
        } else {
          Paginacion(filterData, 3);
        }
      }
      break;

    case "name":
      {
        const filterData = dataGlobal.pokemonData.filter((pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(filterDataInputButton.toLowerCase())
        );

        if (filterDataInputButton == "") {
          Paginacion(filterData, 25);
        } else {
          Paginacion(filterData, 5);
        }
      }
      break;
  }
};
//! -------------------------------------------------------------------------------------------------------------

export const getInfo = async () => {
  console.log("actualizando info... 👌🔍");
    const data = await getData2();
    // console.log(data)
    setData(data, "Pokemon");
};

getInfo();