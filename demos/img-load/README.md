
# Node.js Image Upload and Thumbnail Generator

Este proyecto es una demo de un servidor en Node.js que permite subir imágenes, generar miniaturas (2% del tamaño original) con un desenfoque aplicado, y servir tanto la imagen original como la miniatura desde el servidor.

## Características

- Subir imágenes utilizando [Multer](https://github.com/expressjs/multer).
- Generar una versión en miniatura de la imagen usando [Sharp](https://sharp.pixelplumbing.com/).
- Servir la imagen original o la miniatura a través de rutas dinámicas con parámetros de consulta.
- Aplicar un efecto de desenfoque sobre la miniatura.

## Requisitos

Para ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (v20 o superior)
- [npm](https://www.npmjs.com/)

## Instalación

1. Clona este repositorio

2. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

## Uso

### 1. Ejecutar el servidor

Para iniciar el servidor, ejecuta:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

### 2. Subir una imagen

Accede a la ruta `/upload` para cargar una imagen.

```bash
http://localhost:3000/upload
```

Sigue las instrucciones en la página para seleccionar y cargar un archivo de imagen desde tu sistema.

### 3. Ver la imagen

Después de subir una imagen, puedes ver la imagen original y la miniatura.

#### Ver la imagen original:

```bash
http://localhost:3000/image?filename=nombre_del_archivo.png&thumb=false
```

#### Ver la miniatura (2% del tamaño original con desenfoque):

```bash
http://localhost:3000/image?filename=nombre_del_archivo.png&thumb=true
```

### 4. Página de muestra

La página principal en la ruta `/` muestra un ejemplo donde primero se carga la miniatura y luego se reemplaza por la imagen original. Para usarla, debes de subir la imagen test.png que se encuentra en este repositorio, ya que es la que está definida en el fichero.

```bash
http://localhost:3000/
```