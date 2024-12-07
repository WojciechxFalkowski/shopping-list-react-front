# Użyj oficjalnego obrazu Node.js
ARG IMAGE_NAME
FROM ${IMAGE_NAME}

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki lock i package.json
COPY pnpm-lock.yaml package.json ./

# Zainstaluj pnpm (jeśli nie jest obecny)
RUN npm install -g pnpm

# Zainstaluj zależności
RUN pnpm install --frozen-lockfile

# Skopiuj resztę kodu projektu
COPY . .

# Zbuduj aplikację
RUN pnpm build

# Użyj serwera "serve" do uruchamiania aplikacji
RUN npm install -g serve

# Expose dynamiczny port
EXPOSE ${VITE_PORT}

# Uruchom aplikację z dynamicznym portem
CMD ["sh", "-c", "serve -s dist -l ${VITE_PORT}"]
