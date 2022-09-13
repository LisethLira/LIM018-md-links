#!/usr/bin/env node
const process = require('process');
const { mdLinks } = require('./mdLinks.js');
const colors = require('colors/safe');

const [, , ...argumento] = process.argv;
const terminalRoute = argumento[0];

const validate = argumento.includes('--validate');
const stats = argumento.includes('--stats');
const help = argumento.includes('--help');

const helpText = `
• ≻──────────────────────────────────── ⋆ ✩ ⋆ ────────────────────────────────────≺ •

                                    || MDLINKS - LISETH ||

                             ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ 
                            |  md-links-lis <path> [options] |          
                             ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  
                
                Puedes acceder a los siguientes comandos:

                ✩  path: Ruta absoluta o relativa al archivo o directorio
                         del cual queremos obtener la info.

                ✩  --validate: Opción para validar los links encontrados.

                ✩  --stats: Opción para obtener un output con información 
                            estadística general.

                ✩  --validate --stats: Combinar opciones para obtener 
                            estadísticas que necesiten de los resultados 
                            de la validación.

                ✩  --help: info sobre el uso de comandos de mdlinks.

                Ejemplos:
                     ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ 
                    |  ✩  md-links-lis archivo.md                      |
                    |  ✩  md-links-lis archivo.md --validate           |
                    |  ✩  md-links-lis archivo.md --stats              |
                    |  ✩  md-links-lis archivo.md --validate --stats   |
                    |  ✩  md-links-lis --help                          |
                     ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ 

• ≻──────────────────────────────────── ⋆ ✩ ⋆ ────────────────────────────────────≺ •
`

if (help) {
    console.log(colors.cyan(helpText));
}
if (validate && !stats) {
    mdLinks(terminalRoute, { validate: true })
        .then((httpRequests) => {
            //console.log(httpRequests);
            console.log(colors.cyan(`
        ┌──────── ✩  ───────≺ • ─┐
            Validación de Links
        └─ • ≻─────── ✩  ────────┘ `));
            console.log(colors.cyan('   • ≻──────────────────────── ✩ ────────────────────────≺ •'));
            let arrayFlat = httpRequests.flat();
            arrayFlat.forEach(request => {
                if (request.ok === 'fail') {
                    console.log(colors.cyan(`✖  ruta: ${request.file}\n   href: ${request.href}\n`), colors.magenta(`  status: ${request.status}\n   status message: ${request.ok}\n`), colors.cyan(`  Link a: ${request.text}`));
                    console.log(colors.cyan('   • ≻──────────────────────── ✩ ────────────────────────≺ •'));
                } else {
                    console.log(colors.cyan(`✔  ruta: ${request.file}\n   href: ${request.href}\n   status: ${request.status}\n   status message: ${request.ok}\n   Link a: ${request.text}`));
                    console.log(colors.cyan('   • ≻──────────────────────── ✩ ────────────────────────≺ •'));
                }
            })
        }).catch((error) => console.log(colors.magenta(error)));
}

if (!validate && !stats && !help) {
    mdLinks(terminalRoute, { validate: false })
        .then((httpRequests) => {
            console.log(colors.cyan(`
        ┌──────── ✩  ───────≺ • ─┐
                  Links
        └─ • ≻─────── ✩  ────────┘
                `));
            console.log(colors.cyan('   • ≻──────────────────────── ✩ ────────────────────────≺ •'));
            let arrayFlat = httpRequests.flat();
            arrayFlat.forEach(request => {
                console.log(colors.cyan(`  ruta:${request.file}\n  href:${request.href}\n  Link a ${request.text}`));
                console.log(colors.cyan('   • ≻──────────────────────── ✩ ────────────────────────≺ •'));
            });
        }).catch((error) => console.log(colors.magenta(error)));
}

if (!validate && stats) {
    mdLinks(terminalRoute, { validate: false })
        .then((httpRequests) => {
            let arrayFlat = httpRequests.flat();
            const arrayHref = arrayFlat.map((request) => {
                return request.href;
            });
            const uniques = [... new Set(arrayHref)];
            console.log(colors.cyan(`
          ┌──────── ✩  ───────≺ • ─┐
                 Estadísticas
          └─ • ≻─────── ✩  ────────┘
    • ≻────────────── ✩ ──────────────≺ •
            total:${arrayFlat.length}        
            unique: ${uniques.length}
    • ≻────────────── ✩ ──────────────≺ • 
               `))
        }).catch((error) => console.log(colors.magenta(error)));
}

if (validate && stats) {
    mdLinks(terminalRoute, { validate: true })
        .then((httpRequests) => {
            let arrayFlat = httpRequests.flat();
            const arrayHref = arrayFlat.map((request) => {
                return request.href;
            });
            const uniques = [... new Set(arrayHref)];
            const arrayOk = httpRequests.map((request) => {
                return request.ok;
            });
            let failCount = 0;
            arrayOk.forEach((ok) => {
                if (ok == 'fail') {
                    failCount = failCount + 1;
                }
            });
            console.log(colors.cyan(`
        ┌────────── ✩  ─────────≺ • ─┐
          Estadísticas de validación
        └─ • ≻───────── ✩  ──────────┘
    • ≻────────────── ✩ ──────────────≺ •
            total:${arrayFlat.length}
            unique: ${uniques.length}
            broken: ${failCount}
    • ≻────────────── ✩ ──────────────≺ •
                `));
        }).catch((error) => console.log(color.magenta(error)));
}