window.onload = () => {
  const tamanhoTela = window.innerWidth;
  let dispositivo = undefined;

  if (tamanhoTela >= 316) {
    dispositivo = "mobileSize";
  }
  if (tamanhoTela >= 760) {
    dispositivo = "tabletSize";
  }
  if (tamanhoTela >= 1360) {
    dispositivo = "pcSize";
  }

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      //cria o link no html para o css
      let css = document.createElement("link");
      css.rel = "stylesheet";
      //define o href do elemento no html
      css.href = `./assets/css/${dispositivo}.css`;
      document.head.appendChild(css);
    }
  };
  //abre o arquivo
  xhr.open("GET", `./assets/css/${dispositivo}.css`);
  xhr.send();
};

const habilidades = document.querySelectorAll(".linguagem");

let lingAtual = "";
let htmlLingAtual = undefined;

habilidades.forEach((linguagem) => {
  let divHabilidade = document.querySelector(".divTextoHabilidade");

  let estado = false;

  //#region MOUSECLICK
  linguagem.addEventListener("click", function (ling) {
    if (!estado || ling.target.id != lingAtual) {
      estado = true;

      if (lingAtual != "" && lingAtual != linguagem.id) {
        htmlLingAtual.style.backgroundImage = `url(./assets/images/${lingAtual}Esc.png`;
      }

      lingAtual = ling.target.id;

      let idLinguagem = linguagem.id;
      let nomeLinguagem = idLinguagem.toUpperCase();

      linguagem.style.backgroundImage = `url(./assets/images/${ling.target.id}.png`;

      let divNomeLinguagem = document.querySelector(".nomeLinguagem");
      divNomeLinguagem.innerHTML = nomeLinguagem;

      divHabilidade.classList.add("visivel");

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          document.querySelector(".descricaoLinguagem").innerHTML =
            xhr.responseText;
        }
      };
      xhr.open("GET", `./assets/textos/${idLinguagem}Eng.txt`);
      xhr.send();
    } else {
      estado = false;

      htmlLingAtual.style.backgroundImage = `url(./assets/images/${ling.target.id}Esc.png`;

      divHabilidade.classList.remove("visivel");
    }

    lingAtual = ling.target.id;
    htmlLingAtual = linguagem;
  });

  //#endregion
});

const icones = document.querySelectorAll(".icone");

// icones.forEach(icon => {
//     icon.addEventListener('click', function() {
//         const idIcone = icon.id
//         let url = undefined

//         if (idIcone == "GitHub") { url = 'https://github.com/Rodrigobr2003'}
//         if (idIcone == "LinkedIn") { url = 'https://www.linkedin.com/feed/'}

//         let xhr = new XMLHttpRequest()

//         xhr.onreadystatechange = function() {
//             if(xhr.readyState === 4 && xhr.status === 200){
//                 window.location.href = xhr.responseURL
//             }
//         }
//         xhr.open("GET", url)
//         xhr.send()
//     })
// });
