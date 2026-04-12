# ColumTech Hub

Landing principal para `www.columtech.com.ar` con proxy por rutas hacia proyectos dockerizados.

## Objetivo

- La landing responde en `/`
- La app `muni` responde en `/muni`
- El mismo contenedor frontal puede seguir sumando proyectos por ruta

## Archivos clave

- `Dockerfile`: construye la imagen frontal con Nginx
- `nginx/default.conf`: sirve la landing y proxya `/muni`
- `docker-compose.yml`: ejemplo base para levantar gateway + app `muni`

## Levantar local o en el VPS

```bash
docker compose up -d --build
```

Luego:

- `http://TU_IP/` muestra la landing
- `http://TU_IP/muni` redirige a la app `muni`

## Importante para Muni

La app `muni` tiene que estar preparada para correr detrás de la ruta `/muni`.

Eso normalmente implica configurar su base path:

- Angular: `--base-href /muni/ --deploy-url /muni/`
- React + Vite: `base: "/muni/"`
- Vue/Vite: `base: "/muni/"`
- Next.js: `basePath: "/muni"`

Si `muni` asume que corre en `/`, va a romper assets, navegación o refresh.

## Donweb

En Donweb solo necesitás apuntar el dominio o subdominio al VPS:

- `@` o `www` -> IP pública del servidor

Después el tráfico entra al VPS y Nginx dentro del contenedor resuelve las rutas.
