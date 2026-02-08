#!/bin/bash

# Quitter en cas d'erreur
set -e

# Exécuter les migrations de base de données
echo "🚀 Exécution des migrations..."
php artisan migrate --force

# Mise en cache de la configuration et des routes
echo "🚀 Mise en cache..."
php artisan config:clear
php artisan route:clear
php artisan config:cache
php artisan event:cache
php artisan route:cache
php artisan view:cache

# Démarrage du serveur PHP (via Apache dans le conteneur)
echo "🚀 Démarrage du serveur..."
exec docker-php-entrypoint apache2-foreground
