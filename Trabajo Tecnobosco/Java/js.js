var myArray = [0, 1, 2, 3, 4, 5];
var newArray = myArray.splice(3, 1);
console.log(myArray)

var guardados = []
function generar1() {
    var nuevo = {

        correo: "",
        name: "",
        telefono: "",
        contraseña: "",
    }


    var correo = document.getElementById("correo").value;
    var name = document.getElementById("name").value;
    var telefono = document.getElementById("telefono").value;
    var contraseña = document.getElementById("contraseña").value;
    var recontraseña = document.getElementById("recontraseña").value;

    if (correo == "" || name == "") {
        alert("Error faltan datos")
    } else {

        if (contraseña != recontraseña) {
            document.getElementById("respuesta1").value = "Error, las contraseñas no son iguales";
        } else {

            var encontrar = true;

            for (var i = 0; i < guardados.length; i++) {
                if (correo == guardados[i].correo) {
                    encontrar = false;
                    break;
                }
            }

            if (encontrar) {
                nuevo.correo = correo;
                nuevo.name = name;
                nuevo.telefono = telefono;
                nuevo.contraseña = contraseña;

                guardados.push(nuevo);
                console.log(guardados);

                var txt = JSON.stringify(guardados);
                localStorage.setItem("datos", txt);

                alert("Se ha registrado nuevo usuario ");
                alert("Regresa a Inicio De Sesion e ingresa tu NUEVO usuario")
                localStorage.setItem("sesion", 'out');
                window.location = "index.html";
            } else {
                document.getElementById("respuesta1").value = "Error correo ya usado";
            }
        }
    }
}

function iniciar() {

    var txt = localStorage.getItem("datos");

    if (txt != null) {
        guardados = JSON.parse(txt);
    } else {
        guardados = [];
    }
}

function iniciarT() {

    var txt = localStorage.getItem("patron");

    if (txt != null) {
        tareas = JSON.parse(txt);
        //ver_tareas();
    } else {
        tareas = [];
    }
}

function continuar1() {
    var correo1 = document.getElementById("correo1").value;
    var contraseña1 = document.getElementById("contraseña1").value;
    var txt = localStorage.getItem("datos");
    var marca = false;

    if (txt != null) {
        guardados = JSON.parse(txt);

        for (var i = 0; i < guardados.length; i++) {
            if (correo1 == guardados[i].correo && contraseña1 == guardados[i].contraseña) {
                localStorage.setItem("sesion", 'out');
                window.location = "crear_tareas.html";
                marca = true;
                break;
            }
        }
        if (marca) {
            localStorage.setItem("sesion", 'out');
            window.location = "crear_tareas.html";
        } else {
            document.getElementById("respuesta3").value = "Correo o Contraseña Incorrecta, (asegurate que las casillas no esten vacias"
        }

    }
}

function recuperar1() {
    var name2 = document.getElementById("name2").value;
    var telefono2 = document.getElementById("telefono2").value;
    var correo2 = document.getElementById("correo2").value;
    var marca = false;
    var txt = localStorage.getItem("datos");

    if (txt != null) {
        guardados = JSON.parse(txt);

        for (var i = 0; i < guardados.length; i++) {
            if (name2 == guardados[i].name && telefono2 == guardados[i].telefono && correo2 == guardados[i].correo) {
                marca = true;
                break;
            }
        }
        if (marca) {
            alert("Tu contraseña es:  " + guardados[i].contraseña + "  " + "vuelve al inicio de sesión");
            localStorage.setItem("sesion", 'out');
            window.location = "index.html";
        } else {
            document.getElementById("respuesta2").value = "La informacion es erronea";
        }
    }
}

var tareas = [];
var tareas_pendientes = [];
var tareas_completadas = [];

function guardar_tareas() {
    iniciarT();

    //var txt = localStorage.getItem("datos100");
    var nombre = document.getElementById("nombre").value;
    var nombre_profesor = document.getElementById("nombre_profesor").value;
    var plazo = document.getElementById("plazo").value;
    var mensaje = document.getElementById("mensaje").value;
    var grado = document.getElementById("grado").value;

    var min = 1718;
    var max = 3429;

    var x = Math.floor(Math.random() * (max - min + 1) + min);



    if (nombre == "" || mensaje == "") {
        alert("¡falta nombre del estudiante o descripción de la observación!")
    } else {

        var encontar = true;

        for (var i = 0; i < tareas.length; i++) {
            if (0 == 1) {
                encontar = false;
                break;
            }
        }
        if (encontar) {
            var nuevo = {
                nombre_profesor: "",
                nombre: "",
                grado: "",
                plazo: "",
                mensaje: "",
                codigo: ""
            }
            nuevo.nombre_profesor = nombre_profesor;
            nuevo.nombre = nombre;
            nuevo.grado = grado;
            nuevo.plazo = plazo;
            nuevo.mensaje = mensaje;
            nuevo.codigo = x;

            tareas.push(nuevo);
            console.log(tareas);


            var txt = JSON.stringify(tareas);
            localStorage.setItem("patron", txt);

            document.getElementById("nombre_profesor").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("grado").value = "";
            document.getElementById("plazo").value = "";
            document.getElementById("mensaje").value = "";
        }
    }
}

function ver_tareas() {
    var tabla = document.getElementById("tab3");

    for (var i = 0; i < tareas.length; i++) {
        var fila = document.createElement("tr");
        var actual = tareas[i]
        for (var clave in actual) {
            var celda = document.createElement("td");
            celda.innerHTML = actual[clave];
            fila.appendChild(celda)
        }
        tabla.appendChild(fila)
    }
}

function cargar_tabla() {
    iniciarT();
    ver_tareas();
}

function guardar_seleccionado() {
    var seleccionado = document.getElementById("seleccionado1").value;
    var pos;

    for (var i = 0; i < tareas.length; i++) {
        if (seleccionado == tareas[i].codigo) {
            tareas_pendientes.push(tareas[i]);
            pos = i;
            var txt = JSON.stringify(tareas_pendientes);
            localStorage.setItem("datos3", txt);

            window.location = "realizando.html";

            tareas.splice(pos, 1);
            var txt = JSON.stringify(tareas);
            localStorage.setItem("patron", txt);
        }
        else {
            alert("Codigo Incorrecto")
        }
    }
}

function realizando_carga() {
    var tabla = document.getElementById("tab4");
    var txt = localStorage.getItem("datos3");

    if (txt != null) {
        tareas_pendientes = JSON.parse(txt);

        for (var i = 0; i < tareas_pendientes.length; i++) {
            var fila = document.createElement("tr");
            var actual = tareas_pendientes[i]
            for (var clave in actual) {
                var celda = document.createElement("td");
                celda.innerHTML = actual[clave];
                fila.appendChild(celda)
            }
            tabla.appendChild(fila)
        }
    } else {
        tareas_pendientes = [];
    }
}

function mover_completadas() {
    var seleccionado = document.getElementById("seleccionado1").value;
    var pos;

    for (var i = 0; i < tareas.length; i++) {
        if (seleccionado == tareas[i].codigo) {
            tareas_completadas.push(tareas[i]);
            pos = i;
            var txt = JSON.stringify(tareas_completadas);
            localStorage.setItem("datos5", txt);

            window.location = "completadas.html";


            tareas.splice(pos, 1);
            var txt = JSON.stringify(tareas);
            localStorage.setItem("patron", txt);
            break;
        }
        else {
            alert("Codigo Incorrecto")
        }
    }
}

function cargar_completados() {
    var tabla = document.getElementById("tab5");
    var txt = localStorage.getItem("datos5");

    if (txt != null) {
        tareas_completadas = JSON.parse(txt);

        for (var i = 0; i < tareas_completadas.length; i++) {
            var fila = document.createElement("tr");
            var actual = tareas_completadas[i]
            for (var clave in actual) {
                var celda = document.createElement("td");
                celda.innerHTML = actual[clave];
                fila.appendChild(celda)
            }
            tabla.appendChild(fila)
        }
    } else {
        tareas_completadas = [];
    }
}

function movertareas_completadas() {
    var seleccionado = document.getElementById("seleccionado2").value;
    var pos;

    for (var i = 0; i < tareas_pendientes.length; i++) {
        if (seleccionado == tareas_pendientes[i].codigo) {
            tareas_completadas.push(tareas_pendientes[i]);
            pos = i;
            var txt = JSON.stringify(tareas_completadas);
            localStorage.setItem("datos5", txt);

            window.location = "completadas.html";

            tareas_pendientes.splice(pos, 1);
            var txt = JSON.stringify(tareas_pendientes);
            localStorage.setItem("datos3", txt);
        }
        else {
            alert("Codigo Incorrecto")
        }
    }
}

function borrar_tarea1() {
    var seleccionado = document.getElementById("seleccionado1").value;
    var pos;

    for (var i = 0; i < tareas.length; i++) {
        if (seleccionado == tareas[i].codigo) {
            pos = i;
            localStorage.setItem("patron", txt);

            window.location = "pendientes.html";

            tareas.splice(pos, 1);
            var txt = JSON.stringify(tareas);
            localStorage.setItem("patron", txt);
        }
        else {
            alert("Codigo Incorrecto")
        }
    }
}

function borrar_tarea2() {
    var seleccionado = document.getElementById("seleccionado2").value;
    var pos;

    for (var i = 0; i < tareas_pendientes.length; i++) {
        if (seleccionado == tareas_pendientes[i].codigo) {
            pos = i;
            localStorage.setItem("datos3", txt);

            window.location = "realizando.html";

            tareas_pendientes.splice(pos, 1);
            var txt = JSON.stringify(tareas_pendientes);
            localStorage.setItem("datos3", txt);
        }
        else {
            alert("Codigo Incorrecto")
        }
    }

}

function borrar_tarea3() {
    var seleccionado = document.getElementById("seleccionado3").value;
    var pos;

    for (var i = 0; i < tareas_completadas.length; i++) {
        if (seleccionado == tareas_completadas[i].codigo) {
            pos = i;
            localStorage.setItem("datos5", txt);

            window.location = "completadas.html";

            tareas_completadas.splice(pos, 1);
            var txt = JSON.stringify(tareas_completadas);
            localStorage.setItem("datos5", txt);
        }
        else {
            alert("Codigo Incorrecto")
        }
    }

}
