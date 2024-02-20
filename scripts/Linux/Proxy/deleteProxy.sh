#!/bin/bash

# Solicitar el dominio a eliminar
read -p "Introduce el nombre de dominio a eliminar: " dominio

# Deshabilitar el sitio en Nginx
sudo rm /etc/nginx/sites-enabled/$dominio
sudo rm /etc/nginx/sites-available/$dominio

# Eliminar el certificado SSL de Certbot
sudo certbot delete --cert-name $dominio

# Reiniciar Nginx
sudo systemctl restart nginx

echo "Sitio eliminado correctamente de Nginx y Certbot."
