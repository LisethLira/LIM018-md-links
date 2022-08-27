const { pathToAbsolute, existsPath, directoryVerification, readDirectory, mdFiles, readFile, getLinks } = require('./index.js');
//mdLinks(path, options)
const relativeFilePath = './prueba1.md';
const relativeDirectoryPath = './pruebas';

const mdLinks = (path) =>{
    const absolutePath = pathToAbsolute(path);
    const pathExists = existsPath(absolutePath);

    if (!pathExists) {
        console.log('La ruta no existe');
    } else {

        const isDirectory = directoryVerification(absolutePath);
        if (!isDirectory) {
            const mdPaths = mdFiles(absolutePath);
            const readingFile = readFile(mdPaths);
            return getLinks(readingFile);

        } else {
            const readingDirectory = readDirectory(absolutePath);
            const mdPathsDirectory = mdFiles(readingDirectory);
            const readingFileDirectory = readFile(mdPathsDirectory);
            return getLinks(readingFileDirectory);
        }

        //console.log(absolutePath);

    }
}

mdLinks(relativeFilePath);