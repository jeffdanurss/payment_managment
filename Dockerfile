# Base image
FROM node:16

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar archivos de proyecto
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del servicio
EXPOSE 3001

# Definir el comando de inicio
CMD ["node", "src/app.js"]
