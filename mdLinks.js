const { pathToAbsolute, existsPath, directoryVerify, readDirectory, readFile, getLinks, httpRequest, getLinksDirectory, httpRequestDirectory, extFile } = require('./index.js');

const relativeFilePath = './prueba1.md';
const relativeDirectoryPath = './pruebas';



const mdLinks = (path, options = { validate: false }) => {
    return new Promise((resolve, reject) => {
        const absolutePath = pathToAbsolute(path);
        const pathExists = existsPath(absolutePath);
        const isDirectory = directoryVerify(absolutePath);
        if (pathExists) {
            if (!isDirectory) {
                if (extFile(absolutePath) === '.md') {
                    if (options.validate === true) {
                        resolve(httpRequest(absolutePath));
                    }
                    else {
                        resolve(getLinks(absolutePath));
                    }
                }
                else {
                    reject(new Error ('no hay archivos md'));
                }
            }
            else {
                if (options.validate === true) {
                    resolve(httpRequestDirectory(absolutePath));
                }
                else {
                    resolve(getLinksDirectory(absolutePath));
                }
            }
        }
        else {
            reject(new Error ('La ruta no existe'));
            //throw new Error("La ruta no existe");
        }
    });
}

// mdLinks(relativeFilePath ,{ validate: true })
//     .then((urls) => {
//         console.log(urls.flat());
//     })
//     .catch((error) => {
//         console.error(error);
//     });

module.exports = {
    mdLinks,
};