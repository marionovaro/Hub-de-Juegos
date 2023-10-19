// import { printTemplateSpinner } from "../../components/Spinner/spinner"

// printPokemonPage = () => {
//     document.querySelector("main").innerHTML = templatePokemon()
//     printTemplateSpinner
// }

// ! ------------------------------------------------------------ PEDRO --------------------------------------------

import {
    printTemplateSpinner, CardsPokemons, PrintButton, PrintSpinner} from "../../components";
  import { getData } from "../../global/state/globalState";
  import { Paginacion, filterPokemon } from "../../utils";
  import "./Pokemon.css";
  const template = () => `
    <div id="pokemon">
      <div id="containerFilter">
        <div id="spinnerButtonFilter"></div>
        <div id="filterButton"></div>
        <input
          type="text"
          id="inputPokemon"
          placeholder="Look up your fav Pokemon,  𝘎𝘰𝘵𝘵𝘢 𝘤𝘢𝘵𝘤𝘩 '𝘦𝘮 𝘢𝘭𝘭"
        />
      </div>
      <div id="paginacion"></div>
      <div id="spinner"></div>
      <div id="galleryPokemon"></div>
    </div>
  `;
  
  const dataService = async () => {
    const getDataPokemon = await getData("Pokemon");   
    
    const { pokemonData, type } = getDataPokemon;
 
    CardsPokemons(pokemonData);
    document.getElementById("spinner").innerHTML = "";
    PrintButton(type);
    document.getElementById("spinnerButtonFilter").innerHTML = "";
    addListeners();
    Paginacion(pokemonData, 25);
  };
  
  const addListeners = () => {
  
    const inputPokemon = document.getElementById("inputPokemon");
    inputPokemon.addEventListener("input", (e) => {
      filterPokemon(e.target.value, "name");
    });
  };
  
  export const printPokemonPage = () => {
    document.querySelector("main").innerHTML = template();
    printTemplateSpinner();
    PrintSpinner();
    dataService();
    // console.log(dataService())
  };
  
//   ! ----------------------------------------------------------------------------------------------------------