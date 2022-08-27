// module.exports = () => {
//   // ...
// };

const path = require("path");
const fs = require('fs');
//const fetch = require ('node-fetch');


//FUNCIÓN PARA RUTA ABSOLUTA
const pathToAbsolute = (firstPath) => {
  if (path.isAbsolute(firstPath)) {
    return firstPath;
  } else {
    return path.resolve(firstPath);
  }
}

//FUNCIÓN PARA SABER SI LA RUTA EXISTE
const existsPath = (path) => fs.existsSync(path)

//FUNCIÓN PARA VER SI ES DIRECTORIO
const directoryVerification = (absolutePath) => {
  const stats = fs.statSync(absolutePath);
  return stats.isDirectory();
}

//FUNCIÓN PARA LEER DIRECTORIO Y UNIR A RUTA DE FILE
const readDirectory = (absolutePath) => {
  let arrayFilePaths = [];
  const files = fs.readdirSync(absolutePath);
  files.forEach((file) => {
    file = path.normalize(path.join(absolutePath, file));
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      arrayFilePaths = arrayFilePaths.concat(readDirectory(file));
    } else {
      arrayFilePaths.push(file);
    }
  });
  return arrayFilePaths;
}

//FUNCIÓN PARA OBTENER SOLO ARCHIVOS MD
const mdFiles = (files) => {
  let mdFilesPath = [];
  if (!Array.isArray(files)) {
    const extFile = path.extname(files);
    if (extFile === '.md') {
      return files;
    }
  } else {
    files.forEach((file) => {
      const extFile = path.extname(file);
      if (extFile === '.md') {
        //console.log('es archivo md', file);
        mdFilesPath.push(file);
      }
    });
    return mdFilesPath;
  }
}

// FUNCIÓN PARA LEER UN ARCHIVO 
const readFile = (paths) => {
  if (!Array.isArray(paths)) {
    const file = fs.readFileSync(paths, 'utf-8');
    return file;
  } else {
    paths.forEach((path) => {
      const fileArray = fs.readFileSync(path, 'utf-8');
      return fileArray;
    })
  }
}

//FUNCIÓN PARA FILTRAR URLS
const getLinks = (fileContent) => {
  // const regex = /\[([^\[]+)\](\(.*\))/gm;
  //const regex = /\[(.*?)\]\(.*?\)/gm;
  //console.log(fileContent);
  //console.log(typeof fileContent);
  // const regexLinks = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/gi;
  //const regexLinks = new RegExp (/\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg);//link
  const regexLinks = new RegExp (/\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg);
  let links = fileContent.match(regexLinks);
  console.log(links);
}

//petición a fetch

module.exports = {
  pathToAbsolute,
  existsPath,
  directoryVerification,
  readDirectory,
  mdFiles,
  readFile,
  getLinks,
};
