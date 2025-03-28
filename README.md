<!DOCTYPE html>
<html lang="es">
<body>
  <h1>Tickets-API</h1>
  <p>Para la creación de la API usé <strong>Django</strong> y para la parte de base de datos usaré <strong>PostgreSQL</strong>.</p>

  <h2>Requisitos Previos</h2>
  <ul>
    <li>Mínimo python 3.9 instalado</li>
    <li>Git instalado</li>
  </ul>

  <h2>Pasos de Instalación y Configuración</h2>
  <ol>
    <li>
      <strong>Clonar el repositorio:</strong>
      <pre><code>git clone https://github.com/diegoanro22/Tickets-API.git
cd Tickets-API</code></pre>
    </li>
    <li>
      <strong>Crear y activar un entorno virtual:</strong>
      <ul>
        <li>
          <em>Crear el entorno virtual:</em>
          <pre><code>python -m virtualenv venv</code></pre>
        </li>
        <li>
          <em>Activar el entorno virtual:</em>
          <ul>
            <li>
              En Windows (PowerShell):
              <pre><code>.\venv\Scripts\Activate</code></pre>
            </li>
            <li>
              En macOS/Linux:
              <pre><code>source venv/bin/activate</code></pre>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <strong>Instalar las dependencias:</strong>
      <pre><code>pip install -r requirements.txt</code></pre>
      <p>Esto instalará Django, Django REST Framework, coreapi y otras dependencias necesarias.</p>
    </li>
    <li>
      <strong>Aplicar las migraciones:</strong>
      <pre><code>python manage.py makemigrations
python manage.py migrate</code></pre>
    </li>
    <li>
      <strong>Crear un superusuario (opcional):</strong>
      <pre><code>python manage.py createsuperuser</code></pre>
    </li>
    <li>
      <strong>Ejecutar el servidor de desarrollo:</strong>
      <pre><code>python manage.py runserver</code></pre>
      <p>Ahora puedes acceder a la aplicación en <a href="http://127.0.0.1:8000/api/v1/incidents/" target="_blank">http://127.0.0.1:8000</a>.</p>
    </li>
  </ol>

  <h2>Documentación del API</h2>
  <p>A continuación se muestran algunas imágenes de la documentación y ejemplos de uso de la API:</p>
  
  <h3>Vista General de la API</h3>
  <img src="https://github.com/user-attachments/assets/52fa91e0-2302-4243-bb21-c9df9c5b19c2" alt="Vista General de la API" style="max-width:50%; height:auto;">

  <img src="https://github.com/user-attachments/assets/82e1cfec-3d4a-4e3b-98f0-d36e7d9ff5b3" alt="Endpoint de Incidentes" style="max-width:50%; height:auto;">
  
  <h3>GET</h3>
  <img src="https://github.com/user-attachments/assets/5f56aa32-9a44-4beb-a275-ee66ace1fc8d" alt="GET" style="max-width:50%; height:auto;">
  
 <h3>POST</h3>
  <img src="https://github.com/user-attachments/assets/eb692760-e223-47d3-aef1-38358477d302" alt="POST" style="max-width:50%; height:auto;">

</body>
</html>
