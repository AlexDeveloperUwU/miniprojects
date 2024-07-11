# Summer catches jar

Un conjunto de scripts de Python diseñados para obtener el logro de la jarra, que es tocar el xilófono para llenar de luciérnagas las 4 jarras sin romper ninguna. El script lo he creado junto a @GabrielgsdCIUwU debido a que este minijuego era demasiado complicado, incluso para gente con un muy buen nivel en juegos mania.

## Requisitos

- Python 3

## Instalación

1. Descarga el zip que se encuentra en esta carpeta.
2. Descomprime el zip.
3. Abre una terminal en la carpeta donde se encuentra el script.
4. Instala las dependencias:
```python
pip install opencv-python-headless numpy pyautogui mss
```
5. Obten las coordenadas de la caja con el script:
```python
python coordstool.py
```
Al ejecutar este script tienes que poner el cursor en la esquina izquierda del cuadrado en el juego, luego en la terminal sin mover el ratón dale al enter, ahora se hace lo mismo pero en la esquina derecha del cuadrado en el juego.

Al hacerlo te dará las coordenadas que tienes que poner en main.py

6. Substituir las coordenadas en main.py

en la linea 47 substituye:  
```python
game_region = (1062, 94, 90, 88)
```
Por los nuevos valores que te ha devuelto de coordstool.py

7. Ejecuta:
```python
python main.py
```
Y disfruta mientras el script te pasa el nivel :)

8. Troubleshooting:
En caso de no presione bien las teclas cambia los valores un poco para que reconozca bien cuando presionar.