const form = document.querySelector("#formCadastro");
const buscarCep = document.querySelector("#buscarCep");
const Cep = document.querySelector("#cep");

function mensagem(texto, tipo = "sucesso") {
    Toastify({
        text: texto,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: tipo === "sucesso"
                ? "#198754"
                : "#dc3545"
        }
    }).showToast();
}



// escutar o evento do formulario
form.addEventListener("submit", function(event) {
     event.preventDefault();
     console.log(Object.fromEntries(
        [...form.elements]
        .filter(element => element.id)
        .map(element => [element.id, element.value])
    ));
     form.reset();
});

buscarCep.addEventListener("click", async function() {
    const valor = Cep.value.replace(/\D/g,"");
    if(valor.length !== 8) {
        mensagem("Digite um Cep Válido.","erro");
     
        return;
    } try{
        const resposta = await fetch(`https://viacep.com.br/ws/${valor}/json/`);
        const dados = await resposta.json();
         if (!resposta.ok || dados.erro)  
            throw new Error("CEP não encontrado.");   
         document.querySelector("#logradouro").value = dados.logradouro;
         document.querySelector("#bairro").value = dados.bairro;
         document.querySelector("#estado").value = dados.estado; 
         document.querySelector("#cidade").value = dados.localidade; 
         mensagem("CEP Encontrado com Sucesso");        
    } catch (erro) {
       mensagem(erro.message, "erro");

    }

});