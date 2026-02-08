FROM php:8.2-apache

# 1. Installer les dépendances système et Node.js
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libonig-dev \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 2. Nettoyer le cache apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Installer les extensions PHP (PostgreSQL, BCMath, etc.)
RUN docker-php-ext-install pdo_pgsql mbstring bcmath

# 4. Configurer Apache pour Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf
RUN sed -ri -e 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf

# 5. Activer le mode Rewrite d'Apache
RUN a2enmod rewrite

# 6. Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 7. Définir le répertoire de travail
WORKDIR /var/www/html

# 8. Copier les fichiers du projet
COPY . .

# 9. Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader

# 10. Installer les dépendances JS et compiler (Vite)
RUN npm install
RUN npm run build

# 11. Ajuster les permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 12. Préparer le script de démarrage
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# 13. Point d'entrée
ENTRYPOINT ["docker-entrypoint.sh"]
