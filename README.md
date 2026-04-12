# ColumTech Hub

Landing principal para `www.columtech.com.ar` con SSL automático y proxy por rutas hacia proyectos dockerizados.

## Objetivo

- La landing responde en `/`
- La app del municipio responde en `/proyecto/municipio/`
- El mismo contenedor frontal puede seguir sumando proyectos por ruta
- El certificado HTTPS se emite automáticamente con Let's Encrypt

## Archivos clave

- `Caddyfile`: sirve la landing, fuerza HTTPS y proxya `/proyecto/municipio/`
- `docker-compose.yml`: levanta gateway + stack completo del municipio

## Levantar local o en el VPS

```bash
docker compose up -d --build
```

Luego:

- `http://localhost/` muestra la landing en local
- `http://localhost/proyecto/municipio/` abre la app del municipio en local
- `https://www.columtech.com.ar/` sirve la landing con SSL en el VPS
- `https://www.columtech.com.ar/proyecto/municipio/` abre la app del municipio con SSL en el VPS

## Integración con Municipio

Este compose usa el proyecto ubicado en `../municipio` y levanta:

- `municipio-db`
- `municipio-backend`
- `municipio-frontend`
- `gateway`

El frontend Angular del municipio queda publicado detrás de `/proyecto/municipio/` y la API detrás de `/proyecto/municipio/api`.

Antes de levantar, asegurate de tener configurado el archivo `../municipio/.env`.

## Requisitos para SSL

- `www.columtech.com.ar` y opcionalmente `columtech.com.ar` deben apuntar a la IP pública del VPS
- Los puertos `80` y `443` deben estar abiertos en el servidor y en cualquier firewall externo
- El primer arranque del contenedor `gateway` debe hacerse ya con el dominio apuntando al VPS

Si esas tres condiciones se cumplen, Caddy emite y renueva el certificado automáticamente.

## Donweb

En Donweb solo necesitás apuntar el dominio o subdominio al VPS:

- `@` o `www` -> IP pública del servidor

Después el tráfico entra al VPS y Nginx dentro del contenedor resuelve las rutas.
