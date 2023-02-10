import { FileSystem } from "../src";

const fileSystem = new FileSystem();

describe('FileSystem', () => {
    test('crear directorio home en el file system', () => {
      fileSystem.mkdir("home");
      expect(fileSystem.ls()).toContain("home");
    });
    test("obtener la ubicacion actual /" , () => {
      expect(fileSystem.pwd()).toBe("/");
    })
    test('moverse al directorio home y crear un archivo santy.txt' , () => {
      // Este cd en realidad no esta haciendo nada
      fileSystem.cd("home");
      fileSystem.touch("santy.txt");
      expect(fileSystem.ls()).toContain("santy.txt")
    })
});