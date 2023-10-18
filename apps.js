/*Como importaríamos trabajando con CommonJS
const http = require("http");
const conn = require("./config/config");
const userController = require("./controllers/usersController");*/
//Como importamos trabajando con ES Module
import { createServer } from "http";
import { connect } from "./config/config";
import { initSesion, registerUser } from "./controllers/usersController";
/*process.env.PORT intenta leer la variable de entorno llamada PORT. 
Esta es una forma común de configurar el puerto en el que se ejecutará un servidor web en un entorno de desarrollo o producción.
Si la variable de entorno PORT está definida, process.env.PORT tomará su valor.
Si la variable de entorno PORT no está definida, process.env.PORT será undefined.
En el caso de que process.env.PORT sea undefined, se utiliza el valor predeterminado 3000*/
const puerto = process.env.PORT || 3000;

const server = createServer((req, res) => {
  // Configura la respuesta HTTP
  res.setHeader("Content-Type", "text/html");

  if (req.method === "GET") {
    if (req.url === "/") {
      const error = "";
      res.end("Renderiza la página de inicio aquí con " + error);
    } else if (req.url === "/registro") {
      const error = "";
      res.end("Renderiza la página de registro aquí con " + error);
    }
  } else if (req.method === "POST") {
    if (req.url === "/") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        const parsedBody = new URLSearchParams(body);
        const user = parsedBody.get("usuario");
        const password = parsedBody.get("contrasena");

        initSesion(user, password, (error, err) => {
          if (error) {
            console.log(error);
            res.end("Renderiza la página de inicio con " + error);
          } else if (err) {
            const error = "";
            res.end("Renderiza la página de error con " + error);
          } else {
            res.end("Renderiza la página de inicio con " + error);
          }
        });
      });
    } else if (req.url === "/registro") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        const parsedBody = new URLSearchParams(body);
        const user = parsedBody.get("usuario");
        const password = parsedBody.get("contrasena");

        registerUser(user, password, (error) => {
          if (error) {
            console.log(error);
            res.end("Renderiza la página de registro con " + error);
          } else {
            const error = "Registro Exitoso";
            res.end("Renderiza la página de inicio con " + error);
          }
        });
      });
    }
  } else {
    res.statusCode = 404;
    res.end("Página no encontrada");
  }
});



//Generamos la conección de nuestro servidor
connect((error) => {
  if (error) {
    console.log("Error de conexión", error);
  } else {
    server.listen(puerto, () => {
      console.log("Servidor escuchando en el puerto: " + puerto);
    });
  }
});
