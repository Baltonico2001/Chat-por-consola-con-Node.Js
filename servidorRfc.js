const { error } = require('console');
const http = require('http');

//funcion para validar la estrucutra basica hhtp/1.1 rfc2616    
function validarRfc1626(req) 
 {
    const metodosValidos = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"];
     if (!metodosValidos.includes(req.method)) 
        {
         return { valido: false, error: "Método HTTP no válido." };
        }


     //verificar que la version sea http/1.1
     if (!req.httpVersion.startsWith("1.1")) 
        {
         return { valido: false, error: "La versión HTTP debe ser 1.1." };
        }

     //verificar los encabezados de la peticion
     if (!req.headers["host"]) 
        {
         console.log("Error: Falta encabezado 'Host'");
         return { valido: false, error: "Falta el encabezado 'Host'." };
        }

     if (!req.headers["user-agent"]) 
        {
         return { valido: false, error: "Falta el encabezado 'User-Agent'." };
        }

        return { valido: true };

 }

// Crear el servidor HTTP
const servidor = http.createServer((req, res) => {
  console.log("Encabezados recibidos:", req.headers); // 🔍 Verifica qué recibe el servidor

  if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log("Solicitud recibida:", body);

      // Validar la estructura RFC 2616
      const resultadoValidacion = validarRfc1626(req);

      if (!resultadoValidacion.valido) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
}            mensaje: "Solicitud no válida",
            error: resultadoValidacion.error,
          })
        );
        return;
      }

      // Respuesta exitosa
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ mensaje: "Solicitud HTTP válida según RFC 2616" })
      );
    });
   else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Método no permitido, usa POST" }));
  }
});

// Iniciar el servidor en el puerto 3000
servidor.listen(3000, () => {
  console.log("Servidor HTTP escuchando en el puerto 3000...");
});
