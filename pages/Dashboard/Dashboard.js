import "./Dashboard.css";
import { initController } from "../../utils";
import { getData } from "../../global/state/globalState";
import { getInfo } from "../../utils/dataPokemon";


const templateDashboard = () => `
   <div class="dashboardcontainer">
        <ul id="listadojuegos">
            <li class="lis">
                <figure id="pokemonaccess">
                        <img class="juegos" src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Imagenes/icon_pokemon_chula-removebg-previewNUEVA.png?raw=true" alt="pokeball">
                        <img class="letras" src="https://github.com/marionovaro/Ejercicio-25-09/blob/main/Imagenes/letras_pokemon-removebg-preview.png?raw=true" alt="logo pokemon">
                </figure>
            </li>
            <li class="lis">
                <figure id="ahorcadoaccess">
                    <img id="hangmandash" src="https://previews.dropbox.com/p/thumb/ACBGgGWxQDZIouCUtHFyaVbnelb2l_wf1AWBSVAeoBoLdkrNZ3VG20fXlCURZxbFmOKYcrcSuM70myPuJi5R1N1tkkirf4qaScCBhDyHAsR4xbiSObXvESLQDZcO9N1Ge0Vgse-xI5cKfhK59ADmNnsS8yocmlivcxK4s_f8QlFcFYPoqrCNoKEyeTPMOFA5KFIopV3-f680T_Vt08HlqPnGDqGOuILW7R2D3ZrpunR9GedCeURaTDZbegJQFyWEK8vEYjMmioUKPGor_n3iKpgSonQB5jy8NiCezQ7Qo839TS6PfzE8EmFY3GlPhqgQl5E5zU7OktHeboW9HODHHCza/p.png" alt="acceder a juego ahorcado">
                    <h2></h2>
                </figure>
            </li>
            <li class="lis">
                <figure id="rayaaccess">
                    <img id="rayadash" src="https://previews.dropbox.com/p/thumb/ACDZWtFP24JUtP44ciPY4AfnpVFtB78EQukWRo4l4gPiRslxBdEWcP3FrMpiksQK8Vl-S-jVVTPq4hEH5--dj_H05Mu5JN93I4ZnaHRBAQ6971N6DdlwkP5G_xm7JwHITtop7hBevHseNU_xQwA8WxGsPXgmCUDCq9WBLrnNRillmVcx6O0FnvXcpP2_8FAUlIFKHLuJYBrUzM1tn1s0YJDZ_Ao8A1-ce1zIp5r2yupnnyEm4W_BPo66kTMMx93o5KGRr4oysGtkAV-fkfaxww62ajcKxTj1jebQfnQ8n9qEe5dbEAY9mJzJAmJhPQq8Gm118BJA4vIkJJXMhtWxppFx/p.png" alt="acceder a juego 3 en raya">
                    <h2></h2>
                </figure>
            </li>
        </ul>
    </div>
`

const eventListeners = () => {
    const pokemonAccess = document.getElementById("pokemonaccess");
    pokemonAccess.addEventListener("click", () => {
        initController("Pokemon");
    });

    const ahorcadoaccess = document.getElementById("ahorcadoaccess");
    ahorcadoaccess.addEventListener("click", () => {
        initController("Ahorcado");
    })  

    const rayaaccess = document.getElementById("rayaaccess");
    rayaaccess.addEventListener("click", () => {
        initController("3 en Raya");
    })  
};

export const printmyTemplateDashboard = () => {
    document.querySelector("main").innerHTML = templateDashboard();
    document.querySelector("header").style.display = "flex";
    document.querySelector("footer").style.display = "flex";
    eventListeners();
    console.log(getData());
    getInfo()
}