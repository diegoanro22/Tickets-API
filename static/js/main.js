document.addEventListener('DOMContentLoaded', () => {
    // Le damos color de fondo a la página y algo de padding
    document.body.style.backgroundColor = "#f0f0f0";
    document.body.style.margin = "0";
    document.body.style.padding = "20px";

    // Contenedor principal
    const container = document.createElement('div');
    container.id = "main-container";
    container.style.maxWidth = "100%";
    container.style.margin = "0 auto";
    container.style.fontFamily = "Arial, sans-serif";
    // Añadimos un fondo blanco, borde redondeado y sombra
    container.style.backgroundColor = "#1D2739";
    container.style.borderRadius = "8px";
    container.style.padding = "20px";
    container.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    document.body.appendChild(container);

    // Iniciar vista de lista
    renderListView();
});

// =========================
// VISTA DE LISTA DE INCIDENTES
// =========================
function renderListView() {
    const container = document.getElementById("main-container");
    container.innerHTML = "";

    // Barra de búsqueda + botón "Crear Incidente"
    const searchContainer = document.createElement('div');
    searchContainer.style.display = "flex";
    searchContainer.style.justifyContent = "space-between";
    searchContainer.style.alignItems = "center";
    searchContainer.style.marginBottom = "20px";

    // Search input
    const inputSearch = document.createElement('input');
    inputSearch.type = "text";
    inputSearch.placeholder = "Buscar...";
    inputSearch.style.width = "70%";
    inputSearch.style.padding = "10px";
    inputSearch.style.border = "1px solid #ccc";
    inputSearch.style.borderRadius = "4px";
    searchContainer.appendChild(inputSearch);

    // Botón "Crear Incidente"
    const createIncidentButton = document.createElement('button');
    createIncidentButton.textContent = "Crear Incidente";
    createIncidentButton.style.padding = "10px 15px";
    createIncidentButton.style.border = "none";
    createIncidentButton.style.borderRadius = "4px";
    createIncidentButton.style.backgroundColor = "#7F6CB5";
    createIncidentButton.style.color = "#fff";
    createIncidentButton.style.cursor = "pointer";
    createIncidentButton.addEventListener('click', renderCreateIncidentView);
    searchContainer.appendChild(createIncidentButton);

    container.appendChild(searchContainer);

    // Contenedor para la lista
    const listContainer = document.createElement('div');
    listContainer.id = "list-container";
    container.appendChild(listContainer);

    // Cargar todos los incidentes
    fetchAllIncidents().then(incidents => {
        displayIncidentList(incidents, listContainer);
    });

    // Filtro en tiempo real
    inputSearch.addEventListener('input', () => {
        const searchTerm = inputSearch.value.toLowerCase();
        fetchAllIncidents().then(incidents => {
            const filtered = incidents.filter(incident => incident.description.toLowerCase().includes(searchTerm));
            displayIncidentList(filtered, listContainer);
        });
    });
}

// =========================
// FETCH DE TODOS LOS INCIDENTES
// =========================
async function fetchAllIncidents() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/incidents/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;  // La respuesta es directamente un array de incidentes
    } catch (error) {
        console.error(error);
        return [];
    }
}

// ==============================
// MOSTRAR LISTA DE INCIDENTES
// ==============================
function displayIncidentList(incidents, containerEl) {
    containerEl.innerHTML = "";
    incidents.forEach(incident => {
        const incidentCard = document.createElement('div');
        incidentCard.style.backgroundColor = "#fff";
        incidentCard.style.border = "1px solid #ccc";
        incidentCard.style.padding = "15px";
        incidentCard.style.borderRadius = "8px";
        incidentCard.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
        incidentCard.style.marginBottom = "20px";

        incidentCard.innerHTML = `
            <h1 style="margin-top: 0; font-size: 1.8em;">${incident.reporter}</h1>
            <p style="color: #555; margin: 10px 0;">${incident.description}</p>
            <p style="color: #555; margin: 10px 0;">Estado: ${incident.status}</p>
            <p style="color: #555; margin: 10px 0;">Fecha: ${incident.created_at}</p>
        `;

        // Botón de Editar
        const editButton = document.createElement('button');
        editButton.textContent = "Editar";
        editButton.style.padding = "5px 10px";
        editButton.style.border = "none";
        editButton.style.borderRadius = "4px";
        editButton.style.backgroundColor = "#f0ad4e";
        editButton.style.color = "#fff";
        editButton.style.marginRight = "10px";
        editButton.style.cursor = "pointer";
        editButton.addEventListener('click', () => {
            renderEditIncidentView(incident);
        });

        // Botón de Borrar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Borrar";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "4px";
        deleteButton.style.backgroundColor = "#d9534f";
        deleteButton.style.color = "#fff";
        deleteButton.style.cursor = "pointer";
        deleteButton.addEventListener('click', async () => {
            const confirmed = confirm("¿Seguro que deseas borrar este incidente?");
            if (confirmed) {
                await deleteIncident(incident.incident_id);
                renderListView();  // Actualizar la vista después de borrar
            }
        });

        incidentCard.appendChild(editButton);
        incidentCard.appendChild(deleteButton);

        containerEl.appendChild(incidentCard);
    });
}

// =============================
// VISTA PARA EDITAR UN INCIDENTE
// ============================= 
function renderEditIncidentView(incident) {
    const container = document.getElementById("main-container");
    container.innerHTML = "";

    // Botón para volver a la vista de lista
    const backButton = document.createElement('button');
    backButton.textContent = "← Volver";
    backButton.style.marginBottom = "20px";
    backButton.style.padding = "10px 15px";
    backButton.style.border = "none";
    backButton.style.borderRadius = "4px";
    backButton.style.backgroundColor = "#d9534f";
    backButton.style.color = "#fff";
    backButton.style.cursor = "pointer";
    backButton.addEventListener('click', () => {
        renderListView();
    });
    container.appendChild(backButton);

    // Formulario para editar
    const form = document.createElement('form');
    form.style.backgroundColor = "#fff";
    form.style.padding = "20px";
    form.style.borderRadius = "8px";
    form.style.marginTop = "20px";
    form.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    form.innerHTML = `
        <h1 style="margin-top: 0;">Editar Incidente</h1>
        <div style="margin-bottom: 10px;">
            <label>Descripción:</label><br>
            <textarea name="description" required
            style="width:100%; padding: 10px; border:1px solid #ccc; border-radius:4px;">${incident.description}</textarea>
        </div>
        <div style="margin-bottom: 10px;">
            <label>Estado:</label><br>
            <select name="status" required
            style="width:100%; padding: 10px; border:1px solid #ccc; border-radius:4px;">
                <option value="Pendiente" ${incident.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                <option value="En proceso" ${incident.status === 'En proceso' ? 'selected' : ''}>En proceso</option>
                <option value="Resuelto" ${incident.status === 'Resuelto' ? 'selected' : ''}>Resuelto</option>
            </select>
        </div>
        <button type="submit"
                style="padding: 10px 15px; border:none; border-radius:4px; background-color:#7F6CB5; color:#fff;">
            Guardar Cambios
        </button>
    `;
    container.appendChild(form);

    // Manejar envío de formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const description = formData.get('description').trim();
        const status = formData.get('status');
    
        if (description === "") {
            alert("La descripción no puede estar vacía");
            return;
        }
    
        // Asegúrate de conservar el `reporter` que ya estaba
        const updatedIncident = {
            incident_id: incident.incident_id,
            description,
            status,
            reporter: incident.reporter,  // Asegúrate que este valor es válido (ej: "Diego Rosales")
            created_at: incident.created_at
        };
    
        console.log("Datos enviados:", updatedIncident);
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/incidents/${incident.incident_id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedIncident)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert("Incidente actualizado exitosamente");
            renderListView();
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el incidente");
        }
    });
    
}


// =============================
// ELIMINAR INCIDENTE
// =============================
async function deleteIncident(incidentId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/incidents/${incidentId}/`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        alert("Error al eliminar el incidente");
    }
}

// =============================
// VISTA PARA CREAR UN INCIDENTE
// ============================= 
function renderCreateIncidentView() {
    const container = document.getElementById("main-container");
    container.innerHTML = "";

    // Botón para volver a la vista de lista
    const backButton = document.createElement('button');
    backButton.textContent = "← Volver";
    backButton.style.marginBottom = "20px";
    backButton.style.padding = "10px 15px";
    backButton.style.border = "none";
    backButton.style.borderRadius = "4px";
    backButton.style.backgroundColor = "#d9534f";
    backButton.style.color = "#fff";
    backButton.style.cursor = "pointer";
    backButton.addEventListener('click', () => {
        renderListView();
    });
    container.appendChild(backButton);

    // Formulario
    const form = document.createElement('form');
    form.style.backgroundColor = "#fff";
    form.style.padding = "20px";
    form.style.borderRadius = "8px";
    form.style.marginTop = "20px";
    form.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    form.innerHTML = `
        <h1 style="margin-top: 0;">Crear Nuevo Incidente</h1>
        <div style="margin-bottom: 10px;">
            <label>Descripción:</label><br>
            <textarea name="description" required
            style="width:100%; padding: 10px; border:1px solid #ccc; border-radius:4px;"></textarea>
        </div>
        <div style="margin-bottom: 10px;">
            <label>Autor:</label><br>
            <input type="text" name="reporter" required
            style="width:100%; padding: 10px; border:1px solid #ccc; border-radius:4px;" placeholder="Tu nombre">
        </div>
        <button type="submit"
                style="padding: 10px 15px; border:none; border-radius:4px; background-color:#7F6CB5; color:#fff;">
            Crear Incidente
        </button>
    `;
    container.appendChild(form);

    // Manejar envío de formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const description = formData.get('description').trim();
        const status = formData.get('status');
        const reporter = formData.get('reporter').trim();

        // Validación
        if (description === "" || reporter === "") {
            alert("La descripción y el autor no pueden estar vacíos");
            return;
        }

        const newIncident = { description, status:"Pendiente", reporter, created_at: new Date().toISOString() };
        try {
            const response = await fetch('http://127.0.0.1:8000/api/incidents/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIncident)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert("Incidente creado exitosamente");
            renderListView();
        } catch (error) {
            console.error(error);
            alert("Error al crear el incidente");
        }
    });
}
