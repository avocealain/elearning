#!/bin/bash

# Quitter en cas d'erreur
set -e

# Valeur par défaut pour PORT si non défini (Sécurité)
PORT=${PORT:-80}

# Configuration du port pour Render (Au démarrage)
echo "🚀 Configuration du port Apache sur ${PORT}..."
# On force le Listen sur le bon port dans ports.conf
echo "Listen ${PORT}" > /etc/apache2/ports.conf
# On remplace le port dans le VirtualHost (plus robuste)
sed -i "s/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g" /etc/apache2/sites-available/000-default.conf

# Exécuter les migrations de base de données
echo "🚀 Exécution des migrations..."
php artisan migrate --force

# Mise en cache 
echo "🚀 Mise en cache..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Correction des permissions
echo "🔧 Correction des permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Démarrage du Worker en arrière-plan
# On utilise nohup pour s'assurer qu'il ne bloque pas le script
echo "🚀 Démarrage du Queue Worker..."
nohup php artisan queue:work --verbose --tries=3 --timeout=90 > /dev/stdout 2>&1 &

# Démarrage du serveur PHP (via Apache dans le conteneur)
echo "🚀 Démarrage du serveur..."
exec docker-php-entrypoint apache2-foreground
