import "./Ahorcado.css";

const templateAhorcado = () => `
    <div class="juegoahorcadocontainer">
        <div class="ahorcadofigure">
                <img id="dibujoahorcado" src="" alt="">
        </div>
        <form class="inputcontainer" action="#">
            <div class="inputgroup">
                <input type="text" placeholder="Escriba una letra" maxlength="1" id="letra" autofocus>
                <button type="submit" id="buttonsubmit">a ver...</button>
            </div>
            <div class="inputgroup2">
                <div id="resultado"></div>
                <h3 id="numerofallos"></h3>
                <h3 id="palabrasfallos"></h3>
                <div id="logohangmanpage">
                    <img id="titlehangmanimg" src="https://previews.dropbox.com/p/thumb/ACBGgGWxQDZIouCUtHFyaVbnelb2l_wf1AWBSVAeoBoLdkrNZ3VG20fXlCURZxbFmOKYcrcSuM70myPuJi5R1N1tkkirf4qaScCBhDyHAsR4xbiSObXvESLQDZcO9N1Ge0Vgse-xI5cKfhK59ADmNnsS8yocmlivcxK4s_f8QlFcFYPoqrCNoKEyeTPMOFA5KFIopV3-f680T_Vt08HlqPnGDqGOuILW7R2D3ZrpunR9GedCeURaTDZbegJQFyWEK8vEYjMmioUKPGor_n3iKpgSonQB5jy8NiCezQ7Qo839TS6PfzE8EmFY3GlPhqgQl5E5zU7OktHeboW9HODHHCza/p.png" alt"hangman title"/>
                </div>
            </div>
            </form>
    </div>
`

// //? ---------------------------------------------------------------- EVENTLISTENERS
let letraInput 
let cajaResultado 
let dibujoAhorcado 
let numeroFallos
let palabrasFallos
let titulopeque

let vidasRestantes = 11
let arrayPalabrasRandom = ["Manatí", "Mandril", "Mangosta", "Mantarraya", "Mapache", "Mariposa", "Mariquita"]
let posiciones = []
let arrayVacio = []
let letrasMal = []

//? ----------------------------------------------------------------------------- buscamos una palabra random y la ponemos separada por letras en array

const palabraRandom = () => {
    let word = arrayPalabrasRandom[Math.floor(Math.random()*arrayPalabrasRandom.length)];
    word = word.toLowerCase()
    const splitWord = word.split("")
    return splitWord
}
let palabra = palabraRandom();
console.log(palabra);

// ? -------------------------------------------------------------- ARRAY PALABRA TO STRING (HACER CAJA Y MOSTRAR LETRAS)

const palabraToString = () => {
    let stringPalabra = palabra.toString();
    stringPalabra = stringPalabra.replaceAll(",", " ");
    console.log(stringPalabra)
    return stringPalabra
};

const crearArrayVacio = () => {
    for (let a = 0; a < palabra.length; a++) {
        arrayVacio.push("_")
    }
}
console.log(arrayVacio)

const arrayVaciotoString = () => {
    let stringVacio = arrayVacio.toString();
    stringVacio = stringVacio.replaceAll(",", " ");
    console.log(stringVacio) // ---------------------------- esto tiene que ser igual a string palabra para ganar
    return stringVacio
}
const palabrasInyectadas = () => {
    console.log("esto es " + cajaResultado) 
    cajaResultado.textContent = arrayVaciotoString()
    console.log(cajaResultado)   
};

//?----------------------------------------------------------------- función de click

export const clic = () => {
    let valorLetra = letraInput.value // ---------- cogemos la letra introducida
    console.log(valorLetra)

    const element = valorLetra // ------------------------- letra introducida en el input
    let getPositions = palabra.indexOf(element) // -------------------- getPositions es la posicion de la palabra introducida
    while (getPositions !== -1) { // ------------------------------ buscamos las posiciones en caso de que se repita alguna palabra
        posiciones.push(getPositions)
        getPositions = palabra.indexOf(element, getPositions + 1)
    }

//  ---------------------------------------------------------- REEMPLAZAR HUECO POR LETRA SI ES CORRECTA ----------------------------------------------------------------
        if (palabra.includes(valorLetra)) { // -------------- si el array contiene la letra introducida:
            console.log("Well Done!")
            console.log(posiciones)
            for (let a = 0; a < posiciones.length; a++) {
                arrayVacio.splice(posiciones[a], 1, valorLetra);
                palabrasInyectadas();
            }
        } else {
            vidasRestantes -= 1 // ------------------ queda una vida menos
            numeroFallos.textContent = `No es! Te quedan ${vidasRestantes} vidas`
            pintarHorca()
            letrasMal.push(valorLetra)
            console.log(letrasMal)
            palabrasFallos.textContent = letrasMal.toString()
            
        }
        // -------------------------------------------- declaro funcion reload para cuando gane/pierda
        const reload = () => {
            palabraRandom()
            palabra = palabraRandom()
            arrayVacio = []
            posiciones = []
            palabrasFallos.textContent = ""
            palabraToString()
            crearArrayVacio()
            arrayVaciotoString()
            palabrasInyectadas()
            numeroFallos.textContent = "";
            vidasRestantes = 11
            pintarHorca()
        }

        if (arrayVaciotoString() == palabraToString() && vidasRestantes > 0) {
            numeroFallos.textContent = "Lo has salvado! Eres un héroe!"
            palabrasFallos.textContent = ""
            palabrasFallos.style.border = "3px Dotted Green"
            setTimeout(reload, 5000)

        } else if (vidasRestantes <= 0) {
            numeroFallos.textContent = "Ha muerto! Por tu culpa"
            cajaResultado.textContent = palabraToString()
            setTimeout(reload, 5000); // --------------------------------- se recarga 5 segundos despues de mori
            // console.log(reload())
        }

        letraInput.value = "";
        letraInput.focus()
        posiciones = []
};


// ? -------------------------------------------------------------- PINTAR HORCA


const pintarHorca = () => {
    if (vidasRestantes == 11) {
        titulopeque.style.visibility = "hidden"
    } else {titulopeque.style.visibility = "visible"}

    switch (vidasRestantes) {
        case 11:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACBGgGWxQDZIouCUtHFyaVbnelb2l_wf1AWBSVAeoBoLdkrNZ3VG20fXlCURZxbFmOKYcrcSuM70myPuJi5R1N1tkkirf4qaScCBhDyHAsR4xbiSObXvESLQDZcO9N1Ge0Vgse-xI5cKfhK59ADmNnsS8yocmlivcxK4s_f8QlFcFYPoqrCNoKEyeTPMOFA5KFIopV3-f680T_Vt08HlqPnGDqGOuILW7R2D3ZrpunR9GedCeURaTDZbegJQFyWEK8vEYjMmioUKPGor_n3iKpgSonQB5jy8NiCezQ7Qo839TS6PfzE8EmFY3GlPhqgQl5E5zU7OktHeboW9HODHHCza/p.png"
            dibujoAhorcado.style.width = "100%"
            break;
        case 10:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACDrDeeq9Vd3bx-NLA_yb3GLJ48iVhAmenS15iN46pyTTt--kia6AhwC-OaZUyG2W5U1xv3Vf2F_2xzQZ1mu3atKdX7DBcCNYl93EwKxPRMS_Ve1DuQTPS2pwybmEbDAp_EbZX2ODB9YepFbLovpYoLmsDlB_efR5BHBUNDVuJW7tyUYjEWsir1gAhc8CyOZ4f-MpgsoRMdvActruVCxRELPgftcEwZOLZO7BsNwgFZ98-o-4aWdcqr0OnJvSEhjfEyylxTMFfJVd4maoGK35WNDD3KNcZ2woi7SEPxhz56pQ2Yt2eJeEuVopLWLwHA-Gst38tdKKtzvi6Xn5p9ZJh465tfiW3jauvI1AMWXYVYZ8PbLdBa5K1iXEGgOs5-JlHMQI0DsIuS4bNeDC8VKPAJa_IZHILK1ofBGhT9RlmpNcaksTfz5uHger1zRr1QrYdQ3pjJpK6NsqrYJK9hI_bA3/p.png"
            break;
        case 9:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACA4TQYibkaeJdgBkyQUyCQz4WXOVPQ_endVQ4u3RfkXKMQO7CkjRN-Zy3qjPZd-aYdr9otx_E-W-GMpr8AY9dA0FTZ3X68UutgSP-YypBueerV84JkFQjfqcY6eHQ2SuK0JbovbuBS7xVCVzNGHsqw2b75ZruyU0o1xvtDRrvyfsYaHH_oIafmEAgVJvSfyoP-8iIIoRG8fi1pHJ4ONsx09qJSG-mon47bNhqdNuVyNdrM1v_dMNdTAmtjrpLxryYkRTfXYcobIp2PgMTBQZw2WOof6uzSokm7aIbi38LLcjm6GqMXDO8Q5Lmxv_Gudiv0aAEsrKDWyoIOYCL6roNK-J-KFDsJdphBTVpJKeEIw1YE6pZGc-npp3HCmBqMbzwFupiERvbTVp6HrMYQSyE7XvwH3QrR0qlVzMgjNI0A1XD0gG6elt800k8AA9dQpKZUq0HD4DWZYlUo-cJDdyvJm/p.png"
            break;
        case 8:
            dibujoAhorcado.src =  "https://previews.dropbox.com/p/thumb/ACAR6t7ibNgZ1eazEIh-pQtBaT5XOEsHVGtZBZuMXVma_j7JA6qJvsog0Gd6DwVAELt7m-SfyE7wwxNZpXJUlExniyM6nIRx3y99WVG8foZz4rFQMyhK9q2wJbBlVI1DCo5Lp827Wv8FOgPC-Bm5IZipFxyRmzT96L9DayjbulLPR37aYRzR6zJF-aq1YLj2GFTmYQaQcRqaWgM05Ib0qeq5VcJxDV8-P7Nb1jT2dmeuAZIFrmjqrMYS1-0YNDTCpZ5vQ2c6E7Q8KOxry-vyKUQIaLm8dzu9aXFLzDfWqh7d4tBveyoq5e6ddXHUqaXKahVsaV3kTfm2ralR1WVY5mKMfZLURXEYiXWTX4JuF54duty9vrG2rMuTMp112Et8LSvszcG0BVzyEE2vrOPjjxWYBlrizEAhxUCY7mOw4b58GwMDQD4dVN76h9791BvMRj7UqnjLN9RBAKt629RcGDEe/p.png"
            break;
        case 7:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACCgmDnXC-iChBy0V_exITP2S8cOQdlmrdgvfaGPfr_srT9GbkULSkPuBs4OpwBYwERZnA3ocB1hrsaCfAm_9JUhGTfFOhSrU_PQx7hQYcNcTyvo65QX3-6BTPacCkmdBpcZoi_fcfqo8QYp-gSu1IfnRD9ryyfVQ4oSmlOdvYkGYNjEpyabetp6g7J8__KbPzmdaWgvOkBLAPIlfXfSzrlaZFIMtHlWYf8zvsHjz3U-T1mTXpm5s0iz1wCCwizKn2tb23C5_Ge_p3W19ti87Zi97ILj_I9NiJ1sGycCtvjH1Amy8lY9oFVlCRSjdpw_N8XP0824t3H25CwdlIc4epz9gUaEQFfI-4_2OnkKNe1w_C0z6AV5Vm_vb08F47VufTR6IhArvbo6IojPerF_lBT1VqVl_xXy0WbRAARuSaVECz-43ru0SWiBfiVZelf0hnX1oJPpcVCa2wM_ZheaNRgK/p.png" 
            break;
        case 6:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACCc69FYaAiOCzJSBY7FftgHN2oxfsdVBYX0Qw2Ugf0mxAaFbON-oqvPIIB3lBWdQDYvISgHpNMITvGAA6fUY84jfffBX76yR3ouOEVYqSpewnhPOzw158eKbwVGsAPK2MgfymsHXy2j8hygnGCe9tlzwHeOG6R9c3qtJRkvGUhVjHTOC-gctYegzRy4FkCVkNsmhnq6r759Q4UE-RXJsSTHkeGserLy0YOG6CnE9ft_T4G5Mv1o3yMay-RREiTL8aJ42nCMLKXMxnqf1BOnMFbwKGeBJkjmUarIugMJIRrrU0OLZVg1-NODtUnTX98bDd2He_NOyspu9W-ogN-QUqAbUQAcoqwdX8rcVbcCzPovjr-j8zZyezFmqKgSYYaMk_MxblvZOL_9HBdoReYJ7lfCldbW8g063r4ClfMYVaPIwVBdffLFtbR2CXydMCtyVSsAyp8ezCLEpbM3MgMavd2f/p.png"
            break;
        case 5:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACDZ96kFb4oShvVNjP98zRcrS2x1Rj8GSGvZBgAloUxUNzi4y3J1UZdi_vztOmM0N_B9ouaXo1ni0jjPWLlXzi71kmYAvtiQ5gB9ZOe2BE9_-JfLe35XmWZT7pPhEsIDA_d07E9MfRCDHFJcVd-grjVoNaKF11Qpa0kbwY5rpzObJpmI6msoWfEvCae4QoCtroOC0PNYLYbrCELctptvJIfienlEiBe8MpvZpOm3vYRXdvhSIjoAMt3CcDntItN5pSTcavvSar66EP1AVNipJBXp7TErAxUtJ0UmosPhHjIrJFSx1qFBBfnNTkWZGcsXri_CIKTEzzk4pYLH2Xdw6S8hJwZy-I4Ftsmi3Ukue2iesridVvTf2ztXpsgKgzFBShjEa8FVEPK_KJKhsvx6qvS7S05fUEz0pnOvQ2igNGcIjpix55foJcD0hxEjzyOe35X28N6qAoKvFYtmo_NB5WZ-/p.png"
            break;
        case 4:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACCdy-UdPvxTghM1tM42QyOwUYKT7HoTISjXOrNVaZOzonQy3XpL1P3iQmZ27ZnNxD0iuW9f8e3z5r0lz2Aoc_jg8amkYERK3cxxHIxni9gwiow7VkmziXbzIU2tzwUyCrORZFF9DH3jpoRxadc8tupILpy3UytWt8fIOMPrBJboSY0w5DNU_IhIDX1EnWHgkXyvTiUlx7FbZD91nwYyi2RXAqtXnMyvN4XKGqlEv1pMoD0u-I0H21poCYEallwkFfS69SbqXHRmfCPRxvCWGpmrK3Zl5JgDpZDuSWb36QTJGlo5AgFWHxzlA-oiFHFOsDaL7zjAn4Eq80Y65r5z9a7LBjkewcz0wEV1mG5dOk6n-gQ5P6ocdELHaDIgMoiCGjIRx5EAYaUGYvb38iOk1iA95LMZeW5qJ4x0xxjAHTCu7gwUTJySewjOrFHRyuKlTuvDs0U1jm8Ry4anIDcf4BXY/p.png"
            break;
        case 3:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACDkBsDue54fx_sk-dh7K0lX2KpQcuRfkPfGBWn1m0NikuFRe3xvBG-iwa1FLEWJt3oWOz67XzYrYvs9TgYdKXMD1SUuH5ncftfqYkYLzW6zex1cMSGtdsV2SE882_5OBZf6zaGp9QjjnnYop3wbVu38F2lPlgzNQ6LjURIKKf_PaT0gP7TnE2CDPQDNRye0PCEpxUBUEuhPDRsLStAjyhaRfvs4_AJUMJzOuEkIuz6ctLK-zZvzm694z6vobcVfW_u07elXHwxHIMyI_laP8vvngggCIK8n1s75wZWaAz-ZJk1x_vWiR9NZkUdoFost4KSfJHDrwE6VRv60gminoFuXtbumoXp3VKqFzLWD00bM56vYVVYniDlJs65KVgQN45WX_3qgIaNkj83Wv6HBX3iWtRGO8QSueIbuzVvztuESosmUKbapH3Dej4egbaQdVi9Z4On-LdRurzsYgPjpRASl/p.png"
            break;
        case 2:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACB_5kQiFRhIejCtRAOEw5TLLfb3y_vqkhz_On0vla-jVZakPDDfF7RIfpy7z8istK-IaYaTgyqwK9ZVIBoSYXBxhvjDqhpS8eZMhfVZFVdX8v5RUyQgjx1jToYwL2gCf95kvm1YaHFmIUClxUhBW3hf3TI9ZB5ITHQD4CRxiN1cGU4eKOuV-K7Nd8_NykBxSzxNSx2KMgZ8EaVt_qEutEZhXX46ZtBzxSwvYyhW-nhvzXWlIlV-Z2zFFpZbcVnyMC6xO12JNlGdtaDmMnqGR9GQrFeg7X-mTpkfyHXu2eLuWdkY47-f6uHpr0zbzK0Do-mxFGOvw9dZuoskOaRnnKIXbFb01hFgNOud7xGo7JkBv-c8gxgx--CxvyAeLi9vpKJxv_Ga6iAWbhnJG10U9hAm8fPeLgOo9KSutaoyz2ufuNb8i09y6EhVoitA4A0B3rd2OPMhRKsBm2dOMgx5cTMv/p.png"
            break;
        case 1:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACDJt2qE2Fk-tHWttDgIAFF2p8vhC5kI6y5sqhLhzJDz0036qohvZYVAJgTAahqJtcuEmKkFoGBS-kZXWZDst5HQjUNWcCMgxa7hgR26BhAZq_Q5ASWvCXpTDZp4A-p-Ej-HB3_0mMV8U42OUkkonnli3TPYXuyI5GjYXuNMc47NEewUD5LsZll-7NYzxhRVZJQKZ7adeLGBO7BW99VLv4iwe9gtarQD_CtS-Ri5uxUYrCorrcz9-DJPYAySSKu6NGcLyw4dohdGBNTGjEtnhPaDxA4CVum601H9GLNBzNkCGqBqYF43WoazhTZ0Jn4Q827ZwG_54Pg3y6Jchk0G4MeG40mkjcuN3115LQRv1vxYx6p-UJuc4XF9dYgsihGjOC09jPId7PrdUPmT-BfOJSTW1lVarcLyZch8k1wAi-RKYatAAXG98DTq56LvxrvlaeA-_DWdQ5ktt-3_WBwQk_GcbsTtIluyGc-fDa5d3EV8M40YeH6HlBAwT-5Ymm7ZKag4_zydF9RzIXM2TZ80Aeco/p.png"
            break;
        case 0:
            dibujoAhorcado.src = "https://previews.dropbox.com/p/thumb/ACDj53la9S2a_2SNLiNLFJ3OctBrNuqdhkhtqwLKOVwACMO_Xtzj5WQumMj6XMR_34492Op311hxJI2r2WIi5fCHPibATOYDeE6dXxB-vivS6m5YTMuVRxUhpSojuc-NIPt9utnJbGqrjJGoye0rgX3WysR00iFImgXP8qQIaJyFKrg9CyG_XZKl17vvOMHk8-uj07XhvL4iyK2PRzdl8e6Bj5E4t5vAUAkwdoKN39Qrd6ejPUcGbzROCc173sjyKXuGZ8-C9TeDyledjeInKm3yYh1cd5radVkn8K5wkwszNssZALWTyAcaX2101Vli82UCPoHkZWBpkvcvUl3y7JI7U_cdQpfDNfEP1A5OeOPDDzqB71BnOD1FQDMVSqLVxGtQ5dUcfx2tWQ0zhem8qgm4d8amU4Q4CQlXsa6QHRfkDox7dPNRYr0PeKZD03ogW4a8IKMEVSHZVL8zoQJHtxED/p.png"
            break;
    }
    };


const eventListener = () => {
    const boton = document.getElementById("buttonsubmit"); // metemos botón en variable
    boton.addEventListener("click", clic);
}


export const printAhorcadoPage = () => {
    document.querySelector("main").innerHTML = templateAhorcado();
    letraInput = document.getElementById("letra"); // metemos input en variable
    cajaResultado = document.getElementById("resultado"); // caja donde pintamos las barras bajas y las letras acertadas
    dibujoAhorcado = document.getElementById("dibujoahorcado");
    numeroFallos = document.getElementById("numerofallos");
    palabrasFallos = document.getElementById("palabrasfallos");
    titulopeque = document.getElementById("titlehangmanimg");
    palabraToString();
    palabrasInyectadas();
    eventListener();
    pintarHorca()
    crearArrayVacio()
}