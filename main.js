//PROYECTO FINAL
const formulario = document.getElementById("formulario");
const input = document.getElementById("iComentario");
const cajaComentario = document.getElementById("cajaComentario");
const btnCancelar = document.getElementById("btnCancelar");
const btnDarkMode = document.getElementById("btnDarkMode");
const iconoLuna = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>`;
const iconoSol = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>`;

if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("dark-mode");
    btnDarkMode.innerHTML = iconoSol; 
} else {
    btnDarkMode.innerHTML = iconoLuna; 
}

btnDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "oscuro");
        btnDarkMode.innerHTML = iconoSol;    
    } else {
        localStorage.setItem("tema", "claro");
        btnDarkMode.innerHTML = iconoLuna;
    }
});

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


