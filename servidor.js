// Importamos el módulo 'net' de Node.js para trabajar con sockets y comunicación en red
const net = require("net");

// Guardamos los sockets y nombres de usuario
const clientes = new Map(); 

//creamos el servidor tcp, acepta conexiones de clientes y envia un mensaje inicial
const servidor = net.createServer((socket) => {
  socket.write("💬 Ingresa tu nombre para unirte al chat:  ");

  //recibe el nombre del usuario cuando se conecta y lo guarda en la lista de usuarios 
  socket.once("data", (datos) => {
    const nombreUsuario = datos.toString().trim();
    clientes.set(socket, nombreUsuario);
    console.log(`✅ ${nombreUsuario} se ha conectado. (${clientes.size}) usuarios en linea`);

    //Da un mensaje de bienvenida al usuario
    socket.write(`🎉 Bienvenido, ${nombreUsuario}! Puedes empezar a chatear.\n`);

    //mensaje sin espacios con hora exacta de envio 
    socket.on("data", (mensaje) => {
      const hora = new Date().toLocaleTimeString();
      const mensajeFormateado = `(${nombreUsuario}) [${hora}]: ${mensaje
        .toString()
        .trim()}`;

      console.log(mensajeFormateado);
      //clientes guarda los sockets conectados con su respectivo nombre.
      clientes.forEach((nombreUsuario, cliente) => {
        //recorremos los usuarios
        if (cliente !== socket) { // para no ver nuestro propio mensaje
          cliente.write(mensajeFormateado + "\n"); // 
        }
      });
    });

    //se ejecuta cuando un usuario se desconecta voluntariamente
    socket.on("end", () => {
      console.log(`${nombreUsuario} se ha desconectado.`);
      clientes.delete(socket);
    });
  });
});

//inicia el servidor tcp en el puerto 3000
servidor.listen(3000, "192.168.1.9", () => {
  console.log("Servidor activo en el puerto 3000...");
});
