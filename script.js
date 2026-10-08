const form = document.querySelector("#formCadastro");

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