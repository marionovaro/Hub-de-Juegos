// import "./CardPokemon.css"

// const template = ({name, image, type}) => `
// <figure class=${type}>
//     <figure class="secondcontainer">
//         <div class="shape"></div>
//         <div class="fotocontainer">
//         <img class=${name} src=${image} alt=${name}/>
//         </div>
//     </figure>
//     <div class="containername">
//         <h3>${name}</h3>
//     </div>
// </figure>
// `;

// export const printCardPokemon = (pokemon) => {
//     document.getElementById("galleryContainer").innerHTML += template(pokemon);
// }

// ! -------------------------------------------------------------------------- PEDRO --------------------------

import { getUserData, setUserData } from "../../global/state/globalState";
import "./CardPokemon.css";

export const CardsPokemons = (data) => {
  const appUser = getUserData();
  console.log(appUser);

  document.getElementById("galleryPokemon").innerHTML = "";
  console.log(appUser);
  data.map((pokemon) => {
    console.log(pokemon.id.toString());
    const classCustomType = `"figurePokemon ${pokemon.type[0].type.name}"`;
    const templateFigure = ` <figure class=${classCustomType} id=${pokemon.id}>
      <img src=${pokemon.image} alt=${pokemon.name} />
      <h2>${pokemon.name}</h2>
      <span class="material-symbols-outlined  ${
        appUser.fav?.includes(pokemon.id.toString()) ? "like" : ""
      }"> favorite </span>
    </figure>`;
    document.getElementById("galleryPokemon").innerHTML += templateFigure;
    addListeners(data);
  });
};

const addListeners = (data) => {
  const appUser = getUserData();
  const spanAll = document.querySelectorAll("span");
  spanAll.forEach((span) => {
    span.addEventListener("click", (e) => {
      console.log("entro");

      if (appUser.fav?.includes(e.target.parentNode.id)) {
        const appUser = getUserData();
        console.log(appUser);
        const newFavArray = [];

        appUser.fav.forEach((id) => {
          if (e.target.parentNode.id != id) newFavArray.push(id);
        });

        setUserData({
          ...appUser,
          fav: newFavArray,
        });

        span.classList.toggle("like");
      } else {
        const appUser = getUserData();
        appUser.fav?.push(e.target.parentNode.id);
        setUserData(appUser);
        span.classList.toggle("like");
      }
    });
  });
};
// ! -------------------------------------------------------------------------------------------------------------