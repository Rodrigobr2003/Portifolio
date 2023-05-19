const habilidades = document.querySelectorAll('.linguagem')

habilidades.forEach(linguagem => {
    let divHabilidade = document.querySelector('.divTextoHabilidade') 

    //#region MOUSEOVER
    linguagem.addEventListener('mouseover', function() {
        let idLinguagem = linguagem.id
        let nomeLinguagem = idLinguagem.toUpperCase()

        let divNomeLinguagem = document.querySelector('.nomeLinguagem')
        divNomeLinguagem.innerHTML = nomeLinguagem

        divHabilidade.classList.add('visivel')
         
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.querySelector(".descricaoLinguagem").innerHTML = xhr.responseText;
            }
        };
        xhr.open("GET", `./assets/textos/${idLinguagem}.txt`);
        xhr.send();

    })
    //#endregion

    //#region MOUSEOUT
    linguagem.addEventListener('mouseout', function () {
        divHabilidade.classList.remove('visivel')
    })
    //#endregion
});