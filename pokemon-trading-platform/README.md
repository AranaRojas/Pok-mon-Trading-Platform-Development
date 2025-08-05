# Pokémon Trading Platform

Sistema backend para gestionar el intercambio de Pokémon entre usuarios. Este sistema asigna Pokémon aleatorios al registrarse, permite enviar y aceptar solicitudes de intercambio, y valida que las reglas se cumplan.

## 🚀 Tecnologías Usadas

- Node.js con TypeScript
- Express.js
- MongoDB con Mongoose
- Redis (cache y rate limiting)
- RabbitMQ (procesamiento de intercambios)
- JWT (autenticación)
- CI/CD con GitHub Actions
- Winston (logging)
- PokéAPI (obtener Pokémon aleatorios)

## 📦 Instalación

1. Clona el repositorio o descomprime el .zip:

```bash
git clone https://github.com/tuusuario/pokemon-trading-platform.git
cd pokemon-trading-platform
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:

```env
POKEMON_COUNT=3
JWT_SECRET=tu_clave_secreta
MONGO_URI=mongodb://localhost:27017/pokemon-trade
```

4. Asegúrate de tener Redis y RabbitMQ corriendo localmente.

## ▶️ Uso

1. Ejecutar el servidor:

```bash
npm run dev
```

2. Ejecutar el worker de intercambios:

```bash
ts-node src/workers/tradeWorker.ts
```

## 📫 Endpoints

### Autenticación

- `POST /api/auth/register` - Registra un nuevo usuario y asigna Pokémon.
- `POST /api/auth/login` - Inicia sesión y devuelve un JWT.

### Intercambios

- `POST /api/trades/` - Envía una solicitud de intercambio.

## 🔐 Middleware

- JWT para autenticar solicitudes protegidas.
- Rate Limiting con Redis.

## 🧪 Tests

```bash
npm test
```

## 📤 CI/CD

El flujo de trabajo de GitHub Actions está en `.github/workflows/ci.yml`.

## 🐛 Logger

Winston está configurado para mostrar logs en consola.

## 📬 Notificaciones

Si se activan en el futuro, los intentos de notificación por email serán registrados en la base de datos.

## 📃 Licencia

MIT
