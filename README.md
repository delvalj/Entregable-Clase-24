# Desafio Entregable Coderhouse clase 24
# PERSISTIR DATOS DE SESSION EN MONGO ATLAS
# LOG-IN POR FORMULARIO

Incorporaremos un mecanismo sencillo que permite loguear un cliente por su nombre mediante un formulario de ingreso.

# Consigna: 

Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permite loguear un cliente por su nombre, mediante un formulario de ingreso.
Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este cartel tendrá un botón de deslogueo a su derecha.
Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.
Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.


# Getting Started
## Clonar el proyecto:
* git clone 

## Start 
Primero instalar todas las dependencias necesarias.
* npm install 
  
Luego para poner en marcha el proyecto en la terminal corremos
* node server.js






