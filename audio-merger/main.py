from pydub import AudioSegment

carpeta_audio = "C:/escribe/aquí/la/ruta"
segmentos_audio = []
duracion_silencio = 5000

# Debemos reemplazar el número 10 por el número de audios que hemos calculado tal como se especifica en las instrucciones
for i in range(1, 10): 
    nombre_archivo = f"{i}.mp3"  # Reemplaza con el nombre de tus archivos de audio, te recomendamos que sigas las intrucciones para que sea más óptimo
    ruta_archivo = f"{carpeta_audio}/{nombre_archivo}"
    segmento = AudioSegment.from_file(ruta_archivo)
    segmentos_audio.append(segmento)

silencio = AudioSegment.silent(duration=duracion_silencio)

audio_final = segmentos_audio[0]
for segmento in segmentos_audio[1:]:
    audio_final = audio_final + silencio + segmento

ruta_audio_final = "C:/ruta/a/la/carpeta/audio.mp3"  # Ruta y nombre del archivo final
audio_final.export(ruta_audio_final, format="mp3")
