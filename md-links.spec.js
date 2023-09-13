
const funciones = require("./funciones.js")

describe ('test que valida si la ruta existe', () => {
  it('deberia retornar verdadero si la ruta existe.', () => {
    const path = 'test/README.md';
    const result = funciones.validatePath(path);
      expect(result).toBe(true);
  });
  it('deberia de retornar falso cuando la ruta no existe.', () => {
    const path = 'test/README.mds';
    const result = funciones.validatePath(path);
    expect(result).toBe(false);
  });
});
//-------------------------


describe('validar si la es ruta es absoluta', () => {
  it('deberia de retornar verdadero si la ruta es absoluta.', () => {
    const pathChanged = '/Users/bva/Desktop/Libreria-laboratoria/Libreria/test/README.md';
    const result = funciones.validatePathAbsolute(pathChanged);
    expect(result).toBe(pathChanged);
  });
  it('deberia de retornar falso si la ruta no es absoluta.', () => {
    const pathChanged = 'test/README.md';
    const pathRelative = (funciones.changeToAbsolute(pathChanged))
    const result = funciones.validatePathAbsolute(pathChanged);
    expect(result).toBe(pathRelative);
  });
});