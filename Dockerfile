# Usa una imagen base de Python
FROM python:3.12.9

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto dentro del contenedor
COPY . /app

# Instala las dependencias de tu proyecto
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto en el que la app correrá
EXPOSE 8000

# Ejecuta la app (suponiendo que es una app de Django)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
