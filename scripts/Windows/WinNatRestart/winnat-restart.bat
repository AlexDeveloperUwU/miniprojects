@echo off
title Reinicio de WinNAT
color 0A

:: Comprobamos si se están ejecutando con privilegios de administrador
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

:: Comprobamos el código de error para determinar si el usuario tiene privilegios de administrador
if %errorlevel% neq 0 (
    echo Solicitando permisos de administrador...
    runas /user:Administrator "%0"
    goto :eof
) else (
    echo Permisos de administrador concedidos.
)

:: Detenemos el servicio WinNAT
echo Deteniendo el servicio WinNAT...
net stop WinNAT

:: Verificamos el código de error al detener el servicio
if %errorlevel% equ 0 (
    echo Servicio WinNAT detenido correctamente.
) else (
    echo Error al detener el servicio WinNAT.
    goto :eof
)

:: Iniciamos el servicio WinNAT
echo Iniciando el servicio WinNAT...
net start WinNAT

:: Verificamos el código de error al iniciar el servicio
if %errorlevel% equ 0 (
    echo Servicio WinNAT iniciado correctamente.
) else (
    echo Error al iniciar el servicio WinNAT.
    goto :eof
)

echo Proceso completado con éxito.
pause
