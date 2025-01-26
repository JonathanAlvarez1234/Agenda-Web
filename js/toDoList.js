document.addEventListener("DOMContentLoaded", () => {
    const tareaInput = document.getElementById("tareaInput");
    const agregarTaInput = document.getElementById("agregarTa");
    const listaTInput = document.getElementById("listaT");
    const selectorPrioridad = document.getElementById("prioridad");

    agregarTaInput.addEventListener("click", () => {
        const tareaValor = tareaInput.value.trim();
        const prioridad = selectorPrioridad.value;

        if (tareaValor) {
            addTarea(tareaValor, prioridad)
                .then((tarea) => {
                    tareaInput.value = "";
                    console.log(`Tarea agregada: ${tarea}`);
                })
                .catch((error) => {
                    console.log(`Error al agregar la tarea: ${error}`);
                });
        }
    });

    listaTInput.addEventListener("click", (event) => {
        const { target } = event;

        if (target.classList.contains("complete-btn")) {
            toggleCompleteTask(target.closest("li"), target);
        }

        if (target.classList.contains("eliminar-btn")) {
            deleteTask(target.closest("li"));
        }

        if (target.classList.contains("editar-btn")) {
            editTask(target.closest("li"));
        }
    });

    const addTarea = (tarea, prioridad) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isSucces = Math.random() > 0.1;

                if (isSucces) {
                    resolve(tarea);

                    const listItem = document.createElement("li");
                    listItem.classList.add(prioridad === "urgente" ? "urgente" : "normal");
                    listItem.innerHTML = `
                        <span>${tarea}</span>
                        <button class="complete-btn">Completar</button>
                        <button class="editar-btn">Editar</button>
                        <button class="eliminar-btn">Eliminar</button>
                    `;
                    listaTInput.appendChild(listItem);
                    if (prioridad === "urgente") {
                        listaTInput.insertBefore(listItem, listaTInput.firstChild); // Agregar al inicio
                    } else {
                        listaTInput.appendChild(listItem); // Agregar al final
                    }
                } else {
                    reject("No se pudo agregar la tarea a la base de datos");
                }
            }, 1000);
        });
    };

    const toggleCompleteTask = (listItem, botonCompletar) => {
        listItem.classList.toggle("completado");
        const botonEliminar = listItem.querySelector(".eliminar-btn");
        const botonEditar = listItem.querySelector(".editar-btn");

        listItem.classList.contains("completado")
            ? ((botonCompletar.disabled = true), (botonCompletar.style.display = "none"))
            : ((botonCompletar.disabled = false), (botonCompletar.style.display = "inline-block"));

        botonEliminar.style.display = "inline-block";
        botonEditar.style.display = listItem.classList.contains("completado") ? "none" : "inline-block";
    };

    const deleteTask = (listItem) => {
        listItem.remove();
    };

    const editTask = (listItem) => {
        const tareaSpan = listItem.querySelector("span");
        const textoActual = tareaSpan.textContent;

        const editarInput = document.createElement("input");
        editarInput.type = "text";
        editarInput.value = textoActual;

        const botonGuardar = document.createElement("button");
        botonGuardar.textContent = "Guardar";

        listItem.innerHTML = "";

        listItem.appendChild(editarInput);
        listItem.appendChild(botonGuardar);

        botonGuardar.addEventListener("click", () => {
            const nuevoValor = editarInput.value.trim();

            if (nuevoValor) {
                tareaSpan.textContent = nuevoValor;
                listItem.innerHTML = `
                    <span>${nuevoValor}</span>
                    <button class="complete-btn">Completar</button>
                    <button class="editar-btn">Editar</button>
                    <button class="eliminar-btn">Eliminar</button>
                `;
            }
        });
    };

    const botonR = document.getElementById("botonRegresar");

    botonR.addEventListener(("click"), () =>{
        window.location.href = "../contactos.html";
    })
});
