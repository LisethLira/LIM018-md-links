const { pathToAbsolute, existsPath, directoryVerify, readDirectory, extFile, readFile, getLinks, httpRequest, getLinksDirectory, httpRequestDirectory } = require('../index.js');
const fetch = require ('node-fetch');

jest.mock('node-fetch',()=> jest.fn());

describe('pathToAbsolute', () => {
  it('Deberia ser una función', () => {
    expect(typeof pathToAbsolute).toBe('function');
  });
  it('Debería devolver una ruta absoluta', () => {
    expect(pathToAbsolute('./prueba1.md')).toStrictEqual('C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\prueba1.md');
  });
  it('Debería devolver la misma ruta absoluta', () => {
    expect(pathToAbsolute('C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\prueba1.md')).toStrictEqual('C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\prueba1.md');
  });
});

describe('existsPath', () => {
  it('Deberia ser una función', () => {
    expect(typeof existsPath).toBe('function');
  });
  it('Debería devolver true si la ruta existe', () => {
    expect(existsPath('C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\prueba1.md')).toStrictEqual(true);
  });
});

describe('directoryVerify', () => {
  it('Deberia ser una función', () => {
    expect(typeof directoryVerify).toBe('function');
  });
  it('Debería devolver false si es file', () => {
    expect(directoryVerify('C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\prueba1.md')).toStrictEqual(false);
  });
});

describe('extFile', () => {
  it('Deberia ser una función', () => {
    expect(typeof extFile).toBe('function');
  });
  it('Debería devolver la extención de un file', () => {
    expect(extFile('C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\prueba1.md')).toStrictEqual('.md');
  });
});

describe('readDirectory', () => {
  it('Deberia ser una función', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('Debería devolver un array de files', () => {
    expect(readDirectory('C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\pruebas')).toStrictEqual([
      'C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\pruebas\\prueba.md',
      'C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\pruebas\\prueba2.md',
      'C:\\Users\\LIA\\Documents\\laboratoria\\LIM018-md-links\\pruebas\\pruebasMd\\pruebaCarpeta.md'
    ]);
  });
});

const fileContentTest = `* [Función Callback - MDN](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
</p></details>

[Modules: CommonJS modules - Node.js Docs](https://nodejs.org/docs/latest/api/modules.html)
* [Funciones — bloques de código reutilizables - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions)
</p></details>`;

describe('readFile', () => {
  it('Deberia ser una función', () => {
    expect(typeof readFile).toBe('function');
  });
  it('Debería devolver el contenido de un file', () => {
    //console.log(readFile('pruebaNueva.md'));
    expect(readFile('pruebaNueva.md')).toEqual(fileContentTest);
  });
});

const ArrayLinksFile = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'prueba1.md'
  },
  { 
    href: 'https://nodejs.org/', 
    text: 'Node.js', 
    file: 'prueba1.md' 
  },
  {
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: 'prueba1.md'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'prueba1.md'
  },
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions',
    text: 'Funciones (control de flujo)',
    file: 'prueba1.md'
  },
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/',
    text: 'Funciones clásicas',
    file: 'prueba1.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
    text: 'Función Callback - MDN',
    file: 'prueba1.md'
  },
  {
    href: 'https://nodejs.org/docs/latest/api/modules.html',
    text: 'Modules: CommonJS modules - Node.js Docs',
    file: 'prueba1.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
    text: 'Funciones — bloques de código reutilizables - MDN',
    file: 'prueba1.md'
  }
]

describe('getLinks', () => {
  it('Deberia ser una función', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('Debería devolver un array de objetos', () => {
    expect(getLinks('prueba1.md')).toStrictEqual(ArrayLinksFile);
  });
});

const arrayLinksDirectory = [
  [
    {
      href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
      text: 'Píldora recursión - YouTube Laboratoria Developers',
      file: 'pruebas\\prueba.md'
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions',
      text: 'Funciones (control de flujo)',
      file: 'pruebas\\prueba.md'
    }
  ],
  [
    {
      href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
      text: 'Función Callback - MDN',
      file: 'pruebas\\prueba2.md'
    }
  ],
  [
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions',
      text: 'Funciones (control de flujo)',
      file: 'pruebas\\pruebasMd\\pruebaCarpeta.md'
    }
  ]
]

describe('getLinksDirectory', () => {
  it('Deberia ser una función', () => {
    expect(typeof getLinksDirectory).toBe('function');
  });
  it('Debería devolver un array de objetos', () => {
    expect(getLinksDirectory('pruebas')).toStrictEqual(arrayLinksDirectory);
  });
});

const arrayPromDirectory = [
  [
    {
      href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ',
      text: 'Píldora recursión - YouTube Laboratoria Developers',
      file: 'pruebas\\prueba.md',
      status: 200,
      ok: 'ok'
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions',
      text: 'Funciones (control de flujo)',
      file: 'pruebas\\prueba.md',
      status: 200,
      ok: 'ok'
    }
  ],
  [
    {
      href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
      text: 'Función Callback - MDN',
      file: 'pruebas\\prueba2.md',
      status: 200,
      ok: 'ok'
    }
  ],
  [
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions',
      text: 'Funciones (control de flujo)',
      file: 'pruebas\\pruebasMd\\pruebaCarpeta.md',
      status: 200,
      ok: 'ok'
    }
  ]
]

const arrayPruebaNueva = [
    {
      href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
      text: 'Función Callback - MDN',
      file: 'pruebaNueva.md',
      status: 200,
      ok: 'ok'
    },
    {
      href: 'https://nodejs.org/docs/latest/api/modules.html',
      text: 'Modules: CommonJS modules - Node.js Docs',
      file: 'pruebaNueva.md',
      status: 200,
      ok: 'ok'
    },
    {
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
      file: 'pruebaNueva.md',
      status: 404,
      ok: 'fail'
    }
];

describe('httpRequest', () => {
  it('Deberia retornar links validados', (done) => {
    fetch.mockResolvedValueOnce({status: 200});
    fetch.mockResolvedValueOnce({status: 200});
    fetch.mockResolvedValueOnce({status: 404});
    httpRequest('pruebaNueva.md').then(res=>{
       expect(res).toStrictEqual(arrayPruebaNueva);
    //console.log(res);
    });
    done();
  });
});

describe('httpRequestDirectory', () => {
  it('Deberia retornar links validados de directorio', (done) => {
     fetch.mockResolvedValueOnce({status: 200});
     fetch.mockResolvedValueOnce({status: 200});
     fetch.mockResolvedValueOnce({status: 200});
     fetch.mockResolvedValueOnce({status: 200});
    httpRequestDirectory('pruebas').then(res=>{
      expect(res).toStrictEqual(arrayPromDirectory);
    //console.log(res);
    });
    done();
  });
});