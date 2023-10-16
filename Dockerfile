# Usar una imagen de Node.js
FROM node:14

# Crear el directorio de la aplicación en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos del paquete.json y el paquete-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto 3000 (el puerto por defecto de React) y el puerto 5000 (el puerto de tu servidor Express.js)
EXPOSE 3000 5000

# Comando para iniciar la aplicación y el servidor
CMD ["sh", "-c", "npm start & node server.js"]