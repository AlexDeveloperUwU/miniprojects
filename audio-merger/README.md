# Audio Merger with silences
En este caso, el script de python lo que hará será juntar los audios de una carpeta que está preestablecida pero con una cantidad de segundos especificados entre clip y clip.

Este pequeño script me sirvió debido a que no tenía forma de hacerlo si no es con un editor de vídeo y con el portátil que tengo, no sería capaz ni de abrir el editor, con lo que, como buen programador que soy, diseñé este script.

## Uso

Primero, debes de ajustar la ruta de la carpeta de los ficheros.

Luego, ajusta el número de audios que hay. Para hacerlo, debes de sumarle 1 al número de audios que tienes y ese número, cambiarlo donde se indica. Por ejemplo, si tienes 8 audios, el número será 9.

Lo siguiente que debes de hacer es cambiar la ruta del output.

A continuación, cambia el nombre de los audios que tienes en el script. Te recomiendo que a los archivos, les pongas, por ejemplo, audio1, audio2... o que los numeres, es decir, 1,2... De esta forma, será más sencillo.

Por último, ejecuta "pip install pydub" y a continuación, ejecuta "python main.py"