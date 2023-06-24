# Spotify Auto Downloader 

Con este script lo que conseguimos es automatizar la descarga de música con spotdl de varios autores, de forma que no es necesaria interacción humana y se puede dejar funcionando sin ningún tipo de problema.

Para poder utilizarlo, debes de tener spotdl descargado e instalado con python, usa pip install spotdl. Si no cuentas con ffmpeg, usa spotdl --download-ffmpeg para poder descargarlo.

Lo único que debes de hacer es instalar las dependencias con "npm i", poner las URL de los artistas en "url.txt" siguiendo las instrucciones que hay allí y luego, ejecutar "node index.js".

También puedes eliminar las versiones "en directo" de las canciones de cada artista ejecutando "node liveRemover.js", y si deseas conservar las de algún artista en concreto, puedes añadirlas en un array que está dentro de ese archivo para que no se ejecute en esas carpetas.
