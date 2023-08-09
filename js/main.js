const ciudadesPorProvincia = {
  "Buenos Aires": buenosAires,
  "Chubut": chubut,
  "Cordoba": cordoba,
  "Entre Rios": entreRios,
  "La Pampa": laPampa,
  "La Rioja": laRioja,
  "Mendoza": mendoza,
  "San Juan": sanJuan,
  "San Luis": sanLuis,
  "Santa Cruz": santaCruz,
  "Santiago del Estero": santiagoDelEstero,
  "Tierra del Fuego": tierraDelFuego,
};

let prov = document.getElementById("provincias");
let search = document.getElementById("search");

search.addEventListener("click", (e) => {
  e.preventDefault();

  let selectOpt = prov.options[prov.selectedIndex];

  /* Creando modal desde js usando bootstrap */
  let modal = document.createElement("div");
  modal.className = "modal";
  document.body.appendChild(modal);

  let modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog";
  modal.appendChild(modalDialog);

  let modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalDialog.appendChild(modalContent);

  let modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalContent.appendChild(modalHeader);

  let modalH2 = document.createElement("h2");
  modalH2.className = "modal-title";
  modalH2.innerText = `${selectOpt.value}`;
  modalHeader.appendChild(modalH2);

  let btnModal = document.createElement("button");
  btnModal.className = "btn-class";
  btnModal.setAttribute("data-bs-dismiss", "modal");
  btnModal.setAttribute("aria-label", "Close");
  btnModal.innerText = "Cerrar";
  modalHeader.appendChild(btnModal);

  let modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  modalContent.appendChild(modalBody);
  if (selectOpt.value) {
    let inputlugares = document.createElement("input");
    inputlugares.setAttribute("type", "text");
    inputlugares.setAttribute("id", "provCordoba");
    modalBody.appendChild(inputlugares);
    let lugares = document.getElementById("provCordoba");

    let searchButton = document.createElement("button");
    searchButton.className = "btn btn-primary";
    searchButton.innerText = "Buscar Ciudad";
    modalBody.appendChild(searchButton);

    let verButton = document.createElement("button");
    verButton.className = "btn btn-primary";
    verButton.innerText = "mostrar Ciudad";
    modalBody.appendChild(verButton);


    /* Evento mostrar todas las ciudades disponibles - en este punto aclaro que tengo que replicarlo para las demas ciudades pero por falta de tiempo, lo muestro con cordoba que es la que tiene mas ciudades */
    verButton.addEventListener('click', () => {
        let verCiudades = '';
        if(selectOpt.value === 'Cordoba'){  
          cordoba.forEach((ciudades) => {
            verCiudades += `Ciudade de: ${ciudades.ciudad}, Codigo postal: ${ciudades.postalCode} <br>`
          })
          modalBody.innerHTML = verCiudades;
        }else{
          modalBody.innerText = 'En construccion'
        }
    })


    /* Evemto buscar ciudad especifica */
    searchButton.addEventListener("click", () => {

      let ciudadBuscada = lugares.value;
      let ciudadEncontrada;

      if (ciudadesPorProvincia.hasOwnProperty(selectOpt.value)) {
        const provinciaSeleccionada = selectOpt.value;
        const ciudadesProvincia = ciudadesPorProvincia[provinciaSeleccionada];
        ciudadEncontrada = ciudadesProvincia.find(
          (ciudad) =>
            ciudad.ciudad.toLowerCase() === ciudadBuscada.toLowerCase()
        );

        if (ciudadEncontrada) {
          modalBody.innerHTML = `<p>Ciudad: ${ciudadEncontrada.ciudad}</p>`;
          modalBody.innerHTML += `<p>Código Postal: ${ciudadEncontrada.postalCode}</p>`;
        } else {
          modalBody.innerHTML = "<p>Ciudad no encontrada.</p>";
        }
      } else {
        modalBody.innerHTML = "<p>Provincia no encontrada.</p>";
      }
    });
  }

  // Mostrar el modal utilizando Bootstrap
  let bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
});

/* Esta es una seccion de mi proyecto, en el cual lo que busco es tener un buscador interactivo de todos los lugares donde tenemos un lugar de atencion

como es obvio, le falta mucho, pero para no alargar la entrega, lo subo con puntos que, hasta donde entiendo, cumple las consignas

Como ultima aclaración, espero se entienda que cuando encuentre la ciudad especifica, me muestre los puntos de atención que se encuentran en esa ciudad. 

*/