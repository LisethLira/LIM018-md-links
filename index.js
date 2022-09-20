// module.exports = () => {
//   // ...
// };

const path = require("path");
const fs = require('fs');
//const axios = require('axios').default;
//const fetch = require ('node-fetch');

//FUNCIÓN PARA RUTA ABSOLUTA
const pathToAbsolute = (firstPath) => {
  if (path.isAbsolute(firstPath)) {
    return firstPath;
  }
  return path.resolve(firstPath);
}

//FUNCIÓN PARA SABER SI LA RUTA EXISTE
const existsPath = (path) => fs.existsSync(path);

//FUNCIÓN PARA VER SI ES DIRECTORIO
const directoryVerify = (absolutePath) => {
  return fs.statSync(absolutePath).isDirectory();
}

//FUNCIÓN PARA IDENTIFICAR LA EXTENCIÓN DEL FILE
const extFile = (file) => path.extname(file);

//FUNCIÓN PARA LEER DIRECTORIO Y UNIR A RUTA DE FILE
const readDirectory = (absolutePath) => {
  let arrayFilePaths = [];
  if (path.extname(absolutePath) === '.md') {
    arrayFilePaths.push(absolutePath);
  }
  if (directoryVerify(absolutePath)) {
    const files = fs.readdirSync(absolutePath);
    files.forEach((file) => {
      file = path.join(absolutePath, file);
      let readingDirectory = readDirectory(file);
      arrayFilePaths = arrayFilePaths.concat(readingDirectory);
    });
  }
  return arrayFilePaths;
}

// FUNCIÓN PARA LEER UN ARCHIVO 
const readFile = (paths) => {
  const file = fs.readFileSync(paths, 'utf-8');
  return file;
}
//console.log(readFile('C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\pruebas\\prueba2.md'))
//FUNCIÓN PARA EXTRAER LINKS
const getLinks = (path) => {
  const fileContent = readFile(path)
  const onlyLinks = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/gi;
  const onlyText = new RegExp(/\[.+\]/gi);
  const regexLinks = new RegExp(/!*\[(.+?)\]\((.+?)\)/gi);
  const links = fileContent.match(regexLinks);
  let linksComplete = [];
  links.forEach((link) => {
    if (link.includes('http')) {
      const href = link.match(onlyLinks).join();
      const text = link.match(onlyText).join().slice(1, -1);
      const linkObj = {
        href: href,
        text: text,
        file: path
      }
      linksComplete.push(linkObj);
    }
    
  });
  return linksComplete;
}

//console.log(getLinks('prueba1.md'));

//FUNCIÓN PARA CAPTURAR LINKS EN DIRECTORIO
const getLinksDirectory = (paths) => {
  const arrayMds = readDirectory(paths);
  const getLinksMds = arrayMds.map((mdFile) => {
    return getLinks(mdFile);
  });
  return getLinksMds;
}
//console.log(getLinksDirectory('pruebas'));

//FUNCIÓN PARA PETICIONES A FETCH
const httpRequest = (path) => {
  return new Promise((resolve, reject) => {
  const linksComplete = getLinks(path);
  const arraylinkscomplete = linksComplete.map((url) => {
    return fetch(url.href)
      .then((response) => {
        url.status = response.status;
        url.ok = response.status >= 400 ? 'fail' : 'ok';
        return url;
      }).catch(()=>{
      url.status = 'Servidor caído';
      url.ok = 'fail';
      return url;
      });
    });
  
  resolve(Promise.all(arraylinkscomplete));
  //reject(new Error ('la petición fue rechazada'));
  });
};

//httpRequest('prueba1.md').then((res.value)=> console.log(res));

//FUNCIÓN PARA HACER PETICIONES A FETCH EN DIRECTORIO
const httpRequestDirectory = (paths) => {
  return new Promise((resolve, reject) => {
  const arrayMds = readDirectory(paths);
  const getHttpRequests = arrayMds.map((mdFile) => {
    return httpRequest(mdFile)
  })
  resolve(Promise.all(getHttpRequests));
  reject(new Error ('la petición de directorio fue rechazada'));
  })
}
//httpRequestDirectory('pruebas').then((res)=> console.log(res)).catch((error)=>console(error));
module.exports = {
  pathToAbsolute,
  existsPath,
  directoryVerify,
  readDirectory,
  readFile,
  getLinks,
  httpRequest,
  httpRequestDirectory,
  getLinksDirectory,
  extFile,
};
