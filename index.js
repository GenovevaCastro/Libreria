const funciones = require("./funciones.js")
function mdLinks(filePath, options) {
  //crearpromesa
  return new Promise((resolve, reject) => {
    //reject(1)
    if(funciones.validatePath(filePath)){
      const absolutePath = funciones.validatePathAbsolute(filePath)
      funciones.fileIsMd(absolutePath)
    }else{
      reject("Esta ruta no existe")
    }
  })
}
let filePath = "README.md"
let options = {validate:true}
mdLinks(filePath, options).then(response => {
  console.log("correcto", response)
 })
  .catch(error => {
    console.log("error:", error)
  })