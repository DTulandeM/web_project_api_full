# Tripleten web_project_api_full

Proyecto el cual permite la conexión a una api alojada en un servidor de google cloud.

Por un lado el backend responde correctamente a las peticiones realizadas por el cliente frontend. Se desarrolló un app en express y se configura el servidor de google cloud para que permanesca trabajndo todo el tiempo a través de PM2 y NGINX. Esta aplicación tambien cuenta con conexión a una base de datos de moongose para el almacenamiento de las tarjetas y los datos de los usuarios.

Sus funciones principales:

Usuarios

1. Crear nuevos usuarios.
2. Actualizar la información del "nombre", "acerca de" y avatar del usuario.
3. Recuperar la listar de todos los usuarios o uno esspecifico por su ID.

Tarjetas

1. Crear una nueva tarjeta.
2. Eliminar tarjetas por su ID.
3. Añadir o eliminar "like" a las tarjetas
4. Recuperar todas las tarjetas o una especifica por su ID.

Las tecnologias empleadas son Nodejs, express, mongoose, MongoDB, gitHub, javaScripts, PM2 y ngnx
