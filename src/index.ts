export class FileSystem {
    private currentPath: Directory[];
    private baseDirectory: Directory;

    constructor() {
        this.currentPath = [];
        this.baseDirectory = new Directory("/");
    }

    /**
     * cd
     */
    public cd(dirName) {
        if(dirName === "..") this.currentPath.pop();
        else {
            // this.currentPath.push(
            //     this.getCurrentDirectory().getDirectoryByName(dirName)
            // )
            // Comentado ya que esta retornando Contents en lugar de Direcoty
        }
    }

    /**
     * touch
     */
    public touch(fileName): void {
        this.getCurrentDirectory().addContent(new Content(fileName));
    }

    /**
     * ls
     */
    public ls(): String[] {
        return this.getCurrentDirectory().getContentNames();
    }

    /**
     * mkdir
     */
    public mkdir(dirName): void {
        this.getCurrentDirectory().addContent(new Directory(dirName));
    }

    /**
     * pwd
     */
    public pwd(): String {
        const path = this.currentPath.map(directory => directory.getName()).join('/');
        return `/${path}`;
    }

    /**
     * pwd
     */
    private getCurrentDirectory(): Directory {
        if(this.currentPath.length === 0) return this.baseDirectory;
        return this.currentPath[this.currentPath.length -1]
    }
}

// Un file es un content , no da para modelar una clase que herede de esta ya que no hay mas comportamiento por el momento
class Content {
    private name: String

    constructor(name: String) {
        this.name = name;
    }

    /**
     * getName
     */
    public getName(): String {
        return this.name
    }
}

class Directory extends Content{
    private content: Content[];

    constructor(name: String) {
        super(name);
        this.content = [];
    }

    /**
     * addContent
     */
    public addContent(newContent: Content): void {
        if(this.existContentName(newContent)) throw "Ya existe el contenido en este directorio";
        // Se podrian hacer otras validaciones como no permitir directorios con / o algun otro caracter especial
        this.content.push(newContent);
    }

    /**
     * getContentNames
     */
    public getContentNames(): String[] {
        return this.content.map(content => content.getName())
    }

    /**
     * cd
     */
    public getDirectoryByName(dirName): Content {
        const directory = this.content.find(content => content.getName() === dirName);
        if(!directory) throw "No existe el directorio";
        return directory;
        // Me encontre con un problema al final del codigo y no me dio tiempo de resolverlo
        // El cual es el siguiente , como pasar solo los directories si es una lista de Contents ??
    }

    /**
     * existContentName
     */
    private existContentName(newContent: Content) : boolean {
        return this.content.some(aContent => aContent.getName() === newContent.getName());
    }
}