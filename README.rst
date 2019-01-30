Biblioteca - MEVN Full stack
============================

App de prueba, pequeña biblioteca de pruebas.

Tiene tres colecciones: Libros, Autores y Editoriales. La base de datos es MongoDB.

El servidor corre sobre Node y Express.

El frontend corre con VueJS.

Que funciona?
-------------

* npm run start inicia el servidor backend en el puerto 3000 si no hay otro especificado en process.env.port
* http://localhost:3000/api/[coleccion] muestra los datos de las colecciones existentes, mencionadas arriba.
* metodos: GET, POST, DELETE y PUT implementados en la api

TODO
----

* Frontend Vue
* Formularios
* Validacion
* CSS bonito

EXTRAS
------

La conexion a la base de datos mongo se hace hacia una base de datos que necesita autenticacion.

``mongodb://[usuario]:[password]@localhost:27017/[basededatos]``

para hacer esto en mongo hay que hacer lo siguiente luego de crear la nueva base de datos:

``> use mynuevabd``
``> db.createUser({user: "myuser", pwd: "mypass", roles:["dbOwner"]})``

con eso deberia ser suficiente para autenticarse en la base de datos.
