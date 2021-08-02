import { generateNavContent } from './index';
import { CONTAINER_CONTENT, HEADER_CONTENT, BASE_FILE_CONTENT, NAV_CONTENT, FOOTER_CONTENT, APP_FILE_CONTENT, NAVITEM_CONTENT } from './file-contents';
import { FileSystem, FileType, Uri, workspace, WorkspaceFolder } from 'vscode';
import { posix } from 'path';
import { generateRouterFileContent } from '.';
import { PlaceholderValue } from '../types';

export default class ProjectController {
  private rootWorkspace: WorkspaceFolder | undefined;
  private srcDirectoryURI: Uri | undefined;
  private fs: FileSystem = workspace.fs;

  constructor() {
    this.setRootWorkspace();
  }

  public async setupProject(paths: string[]) {
    if (!this.rootWorkspace) { return; }
    await this.parseWorkspace(this.rootWorkspace);
    await this.addBaseComponentFiles(paths);
    await this.addAppFile();
    await this.createViewFiles(paths);
    await this.createRouterFile(paths);
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
      await this.addFile('views', `${path.toLowerCase()}/index`, BASE_FILE_CONTENT.replace(PlaceholderValue.TITLE, path.substr(path.lastIndexOf('/') + 1)));
    }
  }

  private async createRouterFile(paths: string[]) {
    await this.addFile('router', 'index', generateRouterFileContent(paths), 'js');
  }

  private async addBaseComponentFiles(paths: string[]) {
    // await this.addFile('components', 'Container', CONTAINER_CONTENT);
    // await this.addFile('components', 'Header', HEADER_CONTENT);
    await this.addFile('components', 'Nav', generateNavContent(paths));
    // await this.addFile('components', 'NavItem', NAVITEM_CONTENT);
    // await this.addFile('components', 'Footer', FOOTER_CONTENT);
  }

  private async addAppFile() {
    await this.addFile('', 'App', APP_FILE_CONTENT);
  };

  private async addFile(folder: string, file: string, content: string, fileExtension: string = 'vue') {
    if (!this.srcDirectoryURI) { return; }
    const localePath = `${folder}/${file}.${fileExtension}`;
    const path = posix.join(this.srcDirectoryURI.path, localePath);
    const uri = this.srcDirectoryURI.with({ path });
    await this.fs.writeFile(uri, Buffer.from(content, 'utf8'));
  }
}