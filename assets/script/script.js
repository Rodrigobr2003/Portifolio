const idioma = document.querySelector(".lingua");

window.onload = () => {
  const tamanhoTela = window.innerWidth;
  let dispositivo = undefined;

  let prlx1 = document.querySelector(".parallax-1");
  let prlx2 = document.querySelector(".parallax-2");
  let prlx3 = document.querySelector(".parallax-3");

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

  console.log("Idioma ID:", idioma.id);

  if (idioma.id == "pt") {
    prlx1.style.backgroundImage = "url(./assets/images/parallax1PT.png)";
    prlx2.style.backgroundImage = "url(./assets/images/parallax2PT.png)";
    prlx3.style.backgroundImage = "url(./assets/images/parallax3PT.png)";
  }

  if (idioma.id == "eng") {
    prlx1.style.backgroundImage = "url(./assets/images/parallax1.png)";
    prlx2.style.backgroundImage = "url(./assets/images/parallax2.png)";
    prlx3.style.backgroundImage = "url(./assets/images/parallax3.png)";
  }
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

      if (idioma.id == "pt") {
        xhr.open("GET", `./assets/textos/${idLinguagem}.txt`);
      }

      if (idioma.id == "eng") {
        xhr.open("GET", `./assets/textos/${idLinguagem}Eng.txt`);
      }

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

//#region MAIL TO
const inputsEmail = document.querySelectorAll(".inputEmail");

let subject = "";
let body = "";
let email = "rodrigobr2003@hotmail.com";

inputsEmail.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.classList.contains("inputSubj")) subject = input.value;
    if (input.classList.contains("inputBody")) body = input.value;

    let mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    document.getElementById("emailLink").setAttribute("href", mailtoLink);
  });
});
//#endregion

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
