#!/bin/bash

# Quitter en cas d'erreur
set -e

# Configuration du port pour Render (Au démarrage)
# On remplace le port 80 par la variable $PORT fournie par Render
echo "🚀 Configuration du port Apache sur ${PORT}..."
sed -i "s/80/${PORT}/g" /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

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

# Correction des permissions (CRUCIAL pour Render/Docker)
# On s'assure que www-data (Apache) peut écrire dans les dossiers de cache et logs
# même si ces fichiers ont été créés par root (via les commandes artisan ci-dessus)
echo "🔧 Correction des permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Démarrage du Worker de file d'attente en arrière-plan (Pour envoyer les emails sans bloquer)
echo "🚀 Démarrage du Queue Worker..."
php artisan queue:work --verbose --tries=3 --timeout=90 > /dev/stdout 2>&1 &

# ONE-TIME SEED : RE-AJOUTÉ POUR CORRECTION
echo "🌱 Seeding Database..."
php artisan db:seed --force

# Démarrage du serveur PHP (via Apache dans le conteneur)
echo "🚀 Démarrage du serveur..."
exec docker-php-entrypoint apache2-foreground
