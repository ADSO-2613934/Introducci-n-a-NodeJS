/*Como importar mysql con CommnJS (forma tradicional)
 const mysql = require("mysql");*/
//Como se importa ahora con ES Module
import { createConnection } from "mysql";

const bd = {
  host: "localhost",
  user: "root",
  password: "",
  database: "bbdd",
};
const conn = createConnection(bd);
/*Como exporto mysql con CommnJS (forma tradicional)
module.exports = mysql; */
//Como se importa ahora con ES Module
export default conn;
