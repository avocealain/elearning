FROM php:8.2-cli

# dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    nodejs \
    npm

#  extensions PHP
RUN docker-php-ext-install pdo pdo_pgsql

#  Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN php artisan config:cache
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

CMD php -S 0.0.0.0:$PORT -t public
