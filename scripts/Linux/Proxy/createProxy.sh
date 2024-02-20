#!/bin/bash

# Detener Nginx
sudo systemctl stop nginx

# Solicitar el dominio
read -p "Introduce el nombre de dominio: " dominio

# Solicitar el puerto
read -p "Introduce el puerto: " puerto

# Crear el archivo de configuración de Nginx
cat <<EOF | sudo tee /etc/nginx/sites-available/$dominio > /dev/null
server {
    listen 443 ssl;
    server_name $dominio;

    ssl_certificate /etc/letsencrypt/live/$dominio/cert.pem;
    ssl_certificate_key /etc/letsencrypt/live/$dominio/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/$dominio/chain.pem;

    location / {
        proxy_pass http://localhost:$puerto;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Habilitar el sitio en Nginx
sudo ln -s /etc/nginx/sites-available/$dominio /etc/nginx/sites-enabled/

# Ejecutar certbot para obtener el certificado SSL
sudo certbot certonly --agree-tos --email hosting@alexdevuwu.com -d $dominio

# Reiniciar Nginx
sudo systemctl restart nginx
