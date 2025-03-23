const { error } = require("console");
const fs = require("fs");

//Ruta de nuestro archivo 
const ubicacionArchivo = "C:\\Users\\Nicolas\\Desktop\\electiva.txt";

//leermos el archivo de forma asincrona 

fs.readFile(ubicacionArchivo, "utf-8", (error, datos) => {
  if (error) {
    console.error(" Error al leer el archivo:", error.message);
    return;
  }
  console.log(" Contenido del archivo:\n", datos);
});