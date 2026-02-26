//PROYECTO FINAL
const formulario = document.getElementById("formulario");
const input = document.getElementById("iComentario");
const cajaComentario = document.getElementById("cajaComentario");
const btnCancelar = document.getElementById("btnCancelar");

let nombreGuardado = localStorage.getItem("nombreUsuario"); //Buscar si hay nombre guardado antes
if (nombreGuardado === null || nombreGuardado === "") { //Si no hay nombre, entonces mostrar
    nombreGuardado = prompt("¡Hola! ¿Cuál es tu nombre?");
    localStorage.setItem("nombreUsuario", nombreGuardado); //Guardar nombre en el localStorage
}
document.getElementById("saludoUsuario").innerText = "Hola, " + nombreGuardado;

//Convertir los comentarios en un objeto
let listaComentarios = JSON.parse(localStorage.getItem("misComentarios")) || [
    
];

let idEditando = null;

listaComentarios.forEach(infoComentario => {
    dibujarComentario(infoComentario);
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (idEditando === null) {
    const texto = input.value;
    const fecha = new Date().toLocaleString()
    
        let infoComentario = {
            id: Date.now(), 
            texto: input.value,
            fecha: new Date().toLocaleString()
        };
    listaComentarios.push(infoComentario);
    localStorage.setItem("misComentarios", JSON.stringify(listaComentarios));
    dibujarComentario(infoComentario);
    } else {
        let comentarioAEditar = listaComentarios.find(comentario => comentario.id === idEditando); //Buscar comentario
        comentarioAEditar.texto = input.value; //Actualizar texto con lo que exista en el input
        comentarioAEditar.fecha = new Date().toLocaleString();
        localStorage.setItem("misComentarios", JSON.stringify(listaComentarios)); //Guardar en el localstorage
        
        cajaComentario.innerHTML = ""; //Limpiar pantalla
        listaComentarios.forEach(comentario => {
            dibujarComentario(comentario); //Dibujar todo
        });
        idEditando = null; //Reiniciar el estado
        document.getElementById("btnSubirComentario").innerText= "Enviar";
        btnCancelar.style.display = "none";
    } 
    
    
});

function dibujarComentario(infoComentario) {
    let nuevoComentario = document.createElement('p');
    let btnBorrar = document.createElement('button');
    let btnEditar = document.createElement('button');
    btnBorrar.classList.add("btn-eliminar");
    btnEditar.classList.add("btn-editar");
    btnBorrar.textContent = ('Eliminar');
    btnEditar.textContent = ('Editar');
    nuevoComentario.innerHTML = "<span class='texto-comentario'>" + infoComentario.texto + "</span> <span class='fecha'>" + infoComentario.fecha + "</span>";    
    cajaComentario.appendChild(nuevoComentario);
    nuevoComentario.appendChild(btnBorrar);
    nuevoComentario.appendChild(btnEditar);
    input.value = ("");
    input.style.height = "auto";

    btnBorrar.addEventListener("click", (e) => { 
        e.preventDefault();
        nuevoComentario.remove();
        listaComentarios = listaComentarios.filter(comentarioGuardado => comentarioGuardado.id !== infoComentario.id);
        localStorage.setItem("misComentarios", JSON.stringify(listaComentarios));
    });

    btnEditar.addEventListener("click", (e) => {
        e.preventDefault();
        idEditando = infoComentario.id;
        input.value = infoComentario.texto;
        input.style.height = "auto";
        input.style.height = (input.scrollHeight) + "px";
        btnCancelar.style.display = "inline-block";
        document.getElementById("btnSubirComentario").innerText= "Guardar Cambios";
    });
}
    btnCancelar.addEventListener("click",  (e) => {
        e.preventDefault();
        input.value = "";
        input.style.height = "auto";
        idEditando = null;
        document.getElementById("btnSubirComentario").innerText = "Enviar";
        btnCancelar.style.display = "none";
    });

input.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
});


