FROM php:8.2-cli

# Installer dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    nodejs \
    npm

# Installer extensions PHP
RUN docker-php-ext-install pdo pdo_pgsql

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

# Frontend
RUN npm install
RUN npm run build

# Cache Laravel (maintenant possible)
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

CMD php -S 0.0.0.0:$PORT -t public
