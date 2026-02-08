FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    curl

# Node stable
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

RUN docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

# ✅ TOUJOURS installer composer AVANT artisan
RUN composer install --no-dev --optimize-autoloader

# Frontend
RUN npm install
RUN npm run build

# Cache Laravel (maintenant possible)
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

CMD php -S 0.0.0.0:$PORT -t public
