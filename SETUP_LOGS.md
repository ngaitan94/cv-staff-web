# 📝 Configuración del Sistema de Logs con Neon PostgreSQL

## Resumen
El chatbot ahora guarda todas las consultas en una base de datos PostgreSQL usando **Neon** (compatible con Vercel).

---

## 🚀 Configuración Rápida

### Paso 1: Crear Base de Datos en Neon

1. Ve a [https://console.neon.tech](https://console.neon.tech)
2. Crea una cuenta gratuita (puedes usar GitHub)
3. Crea un nuevo proyecto:
   - **Project name**: `portafolio-logs` (o el nombre que prefieras)
   - **Region**: Elige la más cercana a ti
4. Copia el **Connection String** (formato: `postgresql://...`)

### Paso 2: Configurar Variable de Entorno

Agrega el connection string a tu archivo `.env`:

```env
DATABASE_URL=postgresql://usuario:password@ep-xxx.region.neon.tech/dbname?sslmode=require
```

### Paso 3: Inicializar la Tabla

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Visita en tu navegador:
   ```
   http://localhost:4321/api/init-db
   ```

3. Deberías ver:
   ```json
   {
     "success": true,
     "message": "Database initialized successfully"
   }
   ```

¡Listo! Ya está funcionando. 🎉

---

## 🌐 Despliegue en Vercel

### Paso 1: Configurar Variables de Entorno

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → Environment Variables
3. Agrega las siguientes variables:

   **DATABASE_URL**
   - **Name**: `DATABASE_URL`
   - **Value**: Tu connection string de Neon
   - **Environment**: Production, Preview, Development (todos)

   **GROQ_API_KEY** (si aún no la tienes)
   - **Name**: `PUBLIC_GROQ_API_KEY`
   - **Value**: Tu API key de Groq
   - **Environment**: Production, Preview, Development (todos)

4. Guarda

### Paso 2: Deploy

**Opción A: Desde GitHub (Recomendado)**
```bash
git add .
git commit -m "Add Neon database for chatbot logs"
git push
```
Vercel detectará el push automáticamente y desplegará.

**Opción B: Deploy manual**
```bash
npx vercel --prod
```

### Paso 3: Inicializar Tabla en Producción

Después del deploy, visita:
```
https://tu-dominio.vercel.app/api/init-db
```

Deberías ver:
```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```

### Paso 4: Verificar

1. Visita tu sitio en producción
2. Haz una pregunta al chatbot
3. Verifica que se guardó:
   ```
   https://tu-dominio.vercel.app/api/get-logs
   ```

---

## 🧪 Prueba Local

1. Asegúrate de tener `DATABASE_URL` en tu `.env`
2. Inicia el servidor: `npm run dev`
3. Visita tu portafolio en `http://localhost:4321`
4. Haz una pregunta al chatbot
5. Verifica los logs:
   ```
   http://localhost:4321/api/get-logs
   ```

---

## 📊 Ver los Logs

Opción 1: **Via API**
```
http://localhost:4321/api/get-logs?limit=50
```

Opción 2: **Neon Console**
1. Ve a [console.neon.tech](https://console.neon.tech)
2. Abre tu proyecto
3. SQL Editor
4. Ejecuta:
   ```sql
   SELECT * FROM chatbot_logs ORDER BY created_at DESC LIMIT 50;
   ```

---

## 🔧 Solución de Problemas

### Error: "Database not configured"
- Verifica que `DATABASE_URL` esté en tu `.env`
- Reinicia el servidor de desarrollo

### Error: "relation 'chatbot_logs' does not exist"
- Visita `/api/init-db` para crear la tabla

### Error de conexión en producción
- Verifica que agregaste `DATABASE_URL` en las variables de entorno de Vercel
- Redeploy el proyecto

---

## 📦 Archivos Creados

```
src/pages/api/
├── log-query.ts      # Guarda consultas en la DB
├── get-logs.ts       # Obtiene logs guardados
└── init-db.ts        # Inicializa la tabla
```

---

## 💰 Plan Gratuito de Neon

- ✅ 512 MB de almacenamiento
- ✅ ~500,000 consultas/mes
- ✅ 1 proyecto
- ✅ 10 branches
- ✅ Sin tarjeta de crédito requerida

**Suficiente para miles de consultas del chatbot.**

---

## 🎯 Próximos Pasos (Opcional)

1. **Dashboard de Analytics**: Crear una página para visualizar estadísticas
2. **Exportar logs**: Endpoint para descargar logs en CSV
3. **Filtros**: Búsqueda por fecha o palabra clave
4. **Rate limiting**: Mejorar control de consultas por usuario

---

¿Tienes preguntas? Revisa la documentación completa en `public/assets/logs/README.md`
