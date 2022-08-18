// module.exports = () => {
//   // ...
// };

// function links(archivo){
//   if (archivo === 'link'){
//   return true;
//   }else{
//     return false;
//   }
// }

//console.log(links('image'));
// const fs = require('fs');
// function readingFile(path){
// fs.readFile(path, 'utf-8', (err, data) => {
  // if (err) throw err;
  // console.log(data);
  // let frase = '';
  //let array = data.split('\r\n');
  //console.log(array);
  //for (let i = 0; i < array.length; i++) {
    //const element = array[i];
    
  //}
  //let newArray = [];
  //let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
 //let regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  //let arrayUrls = data.match(regexp);
  // for (let i = 0; i < array.length; i++) {
  //   if(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.includes(array[i])){
  //     frase += array[i];
  //   }
    //newArray.push(array[i]);
  //}
  //console.log(arrayUrls);
  //console.log(data.length);
  //console.log (data.toString());
  //console.log(data);
// });
// }

//readingFile('./prueba.md');


// const readline = require("readline"),
//    fs = require("fs");
//     //NOMBRE_ARCHIVO = "archivo.txt";
//    function getLines(file){
//       let array = [];
//       let line = '';
//       let links =[];
//       let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
//       let lector = readline.createInterface({
//         input: fs.createReadStream(file)
//     });
    
//      lector.on("line", linea => { 
//       //console.log("Tenemos una línea:", linea);
//       //array = linea.split(' ');
//       let arrayUrls = linea.match(regexp);     
//       console.log(arrayUrls);
//     });
      
    
      
//     }
// getLines('./prueba.md');

const path = require("path");

function pathToAbsolute(firstPath){
if(path.isAbsolute(firstPath)){
  return firstPath;
}else{
  return path.resolve(firstPath);
}
}
pathToAbsolute('./prueba.md');
console.log(pathToAbsolute('./prueba.md'));

const fs = require('fs');
function readingFile(path){
  fs.readFile(path, 'utf-8', (err, data) => {
   if (err) throw err;
   //console.log(data);
  function getLinks(data){ 
    //let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    let regexp = /\[([^\[]+)\](\(.*\))/gm;
    // este es el regex = /\[([^\[]+)\](\(.*\))/gm -> regex
   // otra opcion  /\[(.*?)\]\(.*?\)/gm -> por si aun lo quieren jejeje
  let arrayUrls = data.match(regexp);
  console.log(arrayUrls);
  }
  getLinks(data);
 });
};
readingFile('./prueba.md');
//petición a fetch