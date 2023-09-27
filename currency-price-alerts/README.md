# Script de Verificación de Tasas de Conversión USD a EUR

Este script de Node.js se utiliza para verificar periódicamente la tasa de conversión de USD a EUR y envía una notificación a un canal de Discord cuando la tasa sea igual o superior a una tasa deseada.

## Requisitos

- Node.js instalado en tu sistema.
- Una URL de webhook de Discord para enviar notificaciones.

## Configuración

Antes de ejecutar el script, asegúrate de realizar las siguientes configuraciones:

1. Copia la URL de webhook de Discord y pégala en la variable `WEBHOOK_URL` en el archivo `script.js`.

2. Establece la tasa de conversión que consideras como "la mejor" en la variable `mejorTasa` en el archivo `script.js`. Por ejemplo, si deseas una tasa de conversión de 1 USD a 0.94 EUR, establece `mejorTasa` en 0.94.

## Ejecución

Para ejecutar el script, sigue estos pasos:

1. Abre una terminal en la carpeta donde se encuentra el archivo `script.js`.

2. Ejecuta el siguiente comando:

   ```bash
   node script.js
   ```

El script comenzará a verificar periódicamente la tasa de conversión y enviará una notificación al canal de Discord configurado cuando la tasa sea igual o superior a la tasa deseada.

## Intervalo de Verificación

El script verifica la tasa de conversión cada 2,91667 minutos (175,000 milisegundos). Puedes ajustar este intervalo cambiando el valor de la variable `INTERVALO_VERIFICACION` en el archivo `script.js`.

## Notas

- Asegúrate de que tu aplicación Discord tenga permisos para enviar mensajes en el canal configurado con el webhook.

- Este script utiliza la API de ExchangeRate-API para obtener la tasa de conversión USD a EUR. Asegúrate de que esta API esté disponible y en funcionamiento.

- Recuerda que las tasas de cambio son volátiles y pueden cambiar rápidamente en los mercados financieros. Ajusta la tasa deseada según tus necesidades y objetivos financieros.

¡Disfruta usando este script para recibir notificaciones cuando la tasa de conversión sea favorable!
