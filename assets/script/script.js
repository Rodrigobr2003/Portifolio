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

//#region PROJETOS
const projetos = document.querySelectorAll(".projeto");

let prjAtual = null;
let htmlProjAtual = null;

const divTextosProjeto = document.querySelector(".textosProjeto");

projetos.forEach((projeto) => {
  projeto.addEventListener("click", function (event) {
    const projetoClicado = event.currentTarget;
    const conteudoProjeto = projetoClicado.children[1];

    if (prjAtual === projetoClicado) {
      fecharProjeto(projetoClicado);
      prjAtual = null;
      htmlProjAtual = null;
      return;
    }

    if (htmlProjAtual) {
      fecharProjeto(htmlProjAtual);
    }

    prjAtual = projetoClicado;
    htmlProjAtual = projetoClicado;

    conteudoProjeto.style.opacity = "1";
    conteudoProjeto.style.maxHeight = "500px";
  });
});

// Função para fechar um projeto
function fecharProjeto(projeto) {
  const conteudoProjeto = projeto.children[1];

  conteudoProjeto.style.opacity = "0";
  conteudoProjeto.style.maxHeight = "0px";

  setTimeout(() => {
    if (projeto === prjAtual) return; // Evita ocultar a seção se já tiver sido aberta novamente
    divTextosProjeto.classList.remove("visivel");
  }, 300); // Ajuste o tempo conforme necessário para coincidir com a transição CSS
}

//#endregion

//#region HABILIDADES
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
//#endregion

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
