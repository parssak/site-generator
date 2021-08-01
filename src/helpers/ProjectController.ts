import { FileSystem, FileType, Uri, workspace, WorkspaceFolder } from 'vscode';
import { posix } from 'path';
import { BASE_FILE_CONTENT, generateRouterFileContent } from '.';

export default class ProjectController {
  private rootWorkspace: WorkspaceFolder | undefined;
  private srcDirectoryURI: Uri | undefined;
  private fs: FileSystem = workspace.fs;

  constructor() {
    this.setRootWorkspace();
  }

  private setRootWorkspace() {
    if (!workspace.workspaceFolders) { console.log('No workspace folders.'); return; }
    this.rootWorkspace = workspace.workspaceFolders[0];
  }

  private async parseWorkspace(root: WorkspaceFolder) {
    const basePath = root.uri.path;
    const directory: [string, FileType][] = await this.fs.readDirectory(root.uri);
    console.log('got directory', directory);
    for (const [name, type] of directory) {
      const path = `${basePath}/${name}`;
      const uri = Uri.parse(path);
      if (name === 'src' && type === FileType.Directory) {
        this.srcDirectoryURI = uri;
      }
    }
  }

  private async createViewFiles(paths: string[]) {
    if (!this.srcDirectoryURI) { return; }
    for (const path of paths) {
      await this.addFile('views', `${path.toLowerCase()}/index`, BASE_FILE_CONTENT);
    }
  }

  private async createRouterFile(paths: string[]) {
    if (!this.srcDirectoryURI) { return; }
    await this.addFile('router', 'index', generateRouterFileContent(paths));
  }

  public async setupProject(paths: string[]) {
    if (this.rootWorkspace) {
      await this.parseWorkspace(this.rootWorkspace);
      await this.createViewFiles(paths);
      await this.createRouterFile(paths);
    }
  }

  public async addBaseComponentFiles() {
    if (!this.srcDirectoryURI) { return; }
  }

  private async addFile(folder: string, file: string, content: string) {
    if (!this.srcDirectoryURI) { return; }
    const localePath = `${folder}/${file}.vue`;
    const path = posix.join(this.srcDirectoryURI.path, localePath);
    const uri = this.srcDirectoryURI.with({ path });
    await this.fs.writeFile(uri, Buffer.from(content, 'utf8'));

  }
}