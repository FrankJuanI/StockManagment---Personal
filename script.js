document.addEventListener("DOMContentLoaded", () => {
  const tablaCuerpo = document.querySelector("#tabla-cuerpo");
  const botonAgregar = document.querySelector("#agregar");
  const nombreInput = document.querySelector("#nombre");
  const precioInput = document.querySelector("#precio");
  const descripcionInput = document.querySelector("#descripcion");
  const cantidadInput = document.querySelector("#cantidad");
  const urlInput = document.querySelector("#url");
  const serverUrl = "http://localhost:3000";

  cargarDatos();

  botonAgregar.addEventListener("click", () => {
    const nombre = nombreInput.value.trim();
    const precio = precioInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const cantidad = cantidadInput.value.trim();
    const url = urlInput.value.trim();

    if (!nombre || !precio || !descripcion || !cantidad || !url) {
      alert("Por favor, complete todos los campos.s");
      return;
    }

    fetch(`${serverUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, precio, descripcion, cantidad, url }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo agregar el artículo.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        nombreInput.value = "";
        precioInput.value = "";
        descripcionInput.value = "";
        cantidadInput.value = "";
        urlInput.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  function cargarDatos() {
    fetch(`${serverUrl}/items`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudieron obtener los datos.");
        }
        return response.json();
      })
      .then((data) => {
        tablaCuerpo.innerHTML = "";

        data.forEach((item) => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nombre}</td>
                    <td>${item.precio}</td>
                    <td>${item.descripcion}</td>
                    <td>${item.url}</td>
                `;
          tablaCuerpo.appendChild(fila);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
