#!/bin/sh

# Espera a que la base de datos esté disponible
echo "Esperando a que PostgreSQL esté listo..."

while ! nc -z db 5432; do
  sleep 1
done

echo "PostgreSQL está listo, aplicando migraciones..."

# Genera una SECRET_KEY si no existe
if ! grep -q "SECRET_KEY=" .env; then
  echo "Generando SECRET_KEY aleatoria..."
  SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
  echo "SECRET_KEY='$SECRET_KEY'" >> .env
  echo "SECRET_KEY generada y añadida al .env."
fi

# Aplica migraciones
python manage.py migrate


echo "Iniciando servidor Django..."
exec "$@"
