# Chatbot Query Logs - Neon PostgreSQL

Este sistema almacena los registros de todas las consultas realizadas al chatbot del portafolio usando **Neon PostgreSQL**.

## Configuración

### 1. Crear una base de datos en Neon

1. Ve a [console.neon.tech](https://console.neon.tech) y crea una cuenta gratuita
2. Crea un nuevo proyecto
3. Copia el **Connection String** que se proporciona
4. Pega el connection string en tu archivo `.env`:

```env
DATABASE_URL=postgresql://usuario:password@host/database?sslmode=require
```

### 2. Inicializar la tabla

Una vez configurada la `DATABASE_URL`, visita:

```
http://localhost:4321/api/init-db
```

Esto creará automáticamente la tabla `chatbot_logs` con la siguiente estructura:

```sql
CREATE TABLE chatbot_logs (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Despliegue en Vercel

Cuando despliegues a Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega `DATABASE_URL` con tu connection string de Neon
4. Redeploy el proyecto
5. Visita `https://tu-dominio.vercel.app/api/init-db` para inicializar la tabla

## Endpoints API

### POST `/api/log-query`
Guarda una nueva consulta del chatbot.

**Body:**
```json
{
  "query": "¿Cuáles son tus habilidades?"
}
```

**Response:**
```json
{
  "success": true
}
```

### GET `/api/get-logs`
Obtiene los logs guardados (paginados).

**Query params:**
- `limit` (opcional): Número de registros a retornar (default: 50)
- `offset` (opcional): Offset para paginación (default: 0)

**Ejemplo:**
```
/api/get-logs?limit=20&offset=0
```

**Response:**
```json
{
  "success": true,
  "logs": [
    {
      "id": 1,
      "query": "¿Cuáles son tus habilidades?",
      "created_at": "2026-03-27T22:11:39.000Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

### GET `/api/init-db`
Inicializa la base de datos y crea la tabla necesaria.

**Response:**
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "table": "chatbot_logs created with index on created_at"
}
```

## Ventajas de usar Neon PostgreSQL

✅ **Persistente**: Los logs se guardan permanentemente  
✅ **Escalable**: Soporta miles de consultas sin problemas  
✅ **Compatible con Vercel**: Funciona perfectamente en producción  
✅ **Plan gratuito**: 512 MB de almacenamiento gratis  
✅ **Serverless**: Escala automáticamente según demanda  
✅ **Sin mantenimiento**: Neon maneja backups y actualizaciones

## Migración desde archivos locales

Si tenías logs en archivos `.log`, estos ya no se usarán. Los logs antiguos permanecen en `public/assets/logs/*.log` pero los nuevos se guardan en la base de datos.

Si deseas migrar los logs antiguos a la base de datos, puedes crear un script que lea los archivos y los inserte en Neon.
