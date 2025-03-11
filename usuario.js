// Importamos el módulo 'net' de Node.js para trabajar con sockets y comunicación en red
const net = require("net");

//nos permite leer  la entrada del usuario y mostrarlo en la terminal 
const readline = require("readline");

// Crea un Socket que funciona como "usuario", conectarse al servidor, enviar-recibir msj
const usuario = new net.Socket();

//crea la interfaz de lectura y escritura
const entrada = readline.createInterface({
  input: process.stdin, //entrada del usuario por teclado 
  output: process.stdout, // muestra el mensaje de salida por consola 
});

//conectamos el cliente al puerto 3000, localmente(localhost)
usuario.connect(3000, "20.20.2.135", () => {
  console.log("Conectado al chat.");
});

//recibimos o escuchamos los datos del servidor y los mostramos en la consola del usuario  
usuario.on("data", (datos) => {
  console.log(datos.toString().trim());
});

//leemos lo que el usuario escribe en el terminal y lo enviamos al servidor a traves del socket
entrada.on("line", (mensaje) => {
  usuario.write(mensaje);
});

//cuando la conexion del usuario se cierre el programa finaliza
usuario.on("close", () => {
  console.log("Conexión finalizada.");
  process.exit(0);
});
