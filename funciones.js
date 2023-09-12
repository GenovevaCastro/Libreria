//constantes globales---------------------------------------------------------------------------------------------
const path = require('path');
const fs = require('fs');
//let index = 0

//funcion 1 para saber si la ruta es valida o invalida------------------------------------------------------------------
function validatePath(path) {
    if (fs.existsSync(path)) {
        console.log("La ruta Si existe");
        return true
    } else {
        console.log("La ruta No existe");
        return false
    }
};
//validatePath(filePath)

//funcion 2 para validar ruta absoluta y cambiar a relativa---------------------------------------------------------
function validatePathAbsolute(pathChanged) {
    if ((path.isAbsolute(pathChanged))) {
        return pathChanged
    } else {
        const pathRelative = (changeToAbsolute(pathChanged))
        return pathRelative
    }
};

//funcion 3 para hacer la ruta a absoluta agregando carpetas extra a la ruta absoluta---------------------------------------------------------
function changeToAbsolute(pathRelative) {
    return (path.resolve(pathRelative))
};

//nueva constante con ruta ya absoluta---------------------------------------------------------
//const pathAbsolute = (validatePathAbsolute(filePath))
//console.log("Esta es la ruta absoluta:  " + pathAbsolute)

//funcion para ver si es un archivo tiene extencion md o es un archivo y que carpetas tiene-----------------------------------------------------------
function fileIsMd(files) {
    if (path.extname(files) === ".md") {
        //console.log("Es un archivo .md y sus links son:  ");
        return validateLinks(findLinksInFile(files),files)
    } else {
        //console.log("No es un archivo MD  -  El contenido de la carpeta es: ")
        return filesInDirectory(files)
    };
};
//fileIsMd(pathAbsolute)

//funcion para ver archivos que estan dentro de una carpeta -----------------------------------------------------
function filesInDirectory(filesIn) {
    fs.readdir(filesIn, (error, files) => {
        //si existe un error en el directorio deja de ejecutar-----------------------
        if (error) {
            throw error;
        }
        //si no muestra los archivos-------------------------------------------------
        //console.log(files);
        return false
    });
};

//funcion para ver links de de archivo md----------------------------------------------------------
function findLinksInFile(fileContent) {
    const fileData = fs.readFileSync(fileContent, 'utf8');
    const linkRegex = /https?:\/\/[^\s]+/g;
    const links = fileData.match(linkRegex);
    //console.log('Links:', links);
    return links;
};

//funcion que valide el link-----------------------------------------------------

function validateLinks(links,file) {
    let promisesArray = []
    links.forEach(link => {
        let linkClean = ""
        if(link.substring(link.length-1,link.length) == ")"){
            linkClean = link.substring(0,link.length-1)
        }else{
            linkClean = link
        }
        promisesArray.push(fetch(linkClean)
            .then(response => {
                let ok = ''
                if (response.status <= 200 && response.status < 400) {
                    console.log(linkClean + ": " + response.statusText);
                    ok = "ok"
                } else {
                    console.log(linkClean + ": " + "Fail")
                    ok = "fail"
                }
                return {href:linkClean,file,status:response.status,ok}
            })
            .catch(error => {
                console.log(linkClean, "error")
                return {href:linkClean,file,status:500,ok:"fail"}
            }))
    });
    Promise.all(promisesArray).then(response => {
        console.log(response)
    })
        .catch(error => {
            console.log(error)
        })

}

/*
links.forEach(element => {
    getUrl(element)
});
*/
//funcione para obtener url y status---------------------------------------------------
/*function getUrl(link){
    let linkClean = ""
    if(link.substring(link.length-1,link.length) == ")"){
        linkClean = link.substring(0,link.length-1)
    }else{
        linkClean = link
    }
    return fetch(linkClean)
    .then(response =>{
        if(response.status <=200 && response.status <400){
            console.log(linkClean + ": " + response.statusText);
        } else{
            console.log(linkClean + ": " + "Fail")
    }
    return response.status
    })
     .catch(error => {
            console.log(error)
        })
};*/


//funcion para ver el contenido de un  archivo md ------------------------------------------
/*function readFiles(fileContent){
    const fileData = fs.readFileSync(fileContent,'utf-8')
    console.log(fileData)
    return fileData  
}
readFiles(pathAbsolute)*/

module.exports={
    validatePath,
    fileIsMd,
    validatePathAbsolute
}


