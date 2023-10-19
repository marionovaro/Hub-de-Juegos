import { printmyTemplateDashboard, Login } from "../pages";
import { printTemplateHeader, printTemplateFooter } from "../components";
import { getUser } from "../global/state/globalState";
import { printPokemonPage } from "../pages/Pokemon/Pokemon";
import { printAhorcadoPage } from "../pages/Ahorcado/Ahorcado";
import { print3enRaya } from "../pages/3Raya/Raya";

export const initController = (paginaRender) => {
    switch(paginaRender) {
        case undefined:
            localStorage.getItem(getUser().name) ? printmyTemplateDashboard() : Login()
        case "Dashboard":
            printmyTemplateDashboard();
            break;
        case "Pokemon":
            printPokemonPage();
            break;
        case "Login":
            Login()
            break;
        case "Ahorcado":
            printAhorcadoPage();
            break;
        case "3 en Raya":
            print3enRaya();
            break;
    } 
}