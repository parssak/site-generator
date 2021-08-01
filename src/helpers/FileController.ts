import { FileSystem, FileType, Uri, workspace, WorkspaceFolder } from 'vscode';
import { posix } from 'path';
import { Page, ProjectConfig } from '../types';

export default class FileController {
  private rootWorkspace: WorkspaceFolder | undefined;
  private pagesDirectoryURI: Uri | undefined;
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
      if (type === FileType.Directory) {
        const subDirectories = await this.fs.readDirectory(uri);
        for (const [subName, subType] of subDirectories) {
          if (subName !== 'pages') { continue; }
          const subPath = `${path}/${subName}`;
          const subURI = Uri.parse(subPath);
          if (subType === FileType.Directory) {
            this.pagesDirectoryURI = subURI;
            // const subWriteStr = '!! 1€ is 1.12$ is 0.9£ \n hahahahaha';
            // const subWriteData = Buffer.from(subWriteStr, 'utf8');
            // const newfileURI = subURI.with({ path: posix.join(subURI.path, 'test.txt') });
            // await this.fs.writeFile(newfileURI, subWriteData);
          }
        }
      }
    }
  }

  private async createPageFiles(pages: Page[]) {
    if (!this.pagesDirectoryURI) { return; }
    for (const page of pages) {
      const fileURI = this.pagesDirectoryURI.with({ path: posix.join(this.pagesDirectoryURI.path, page.title + '.vue') });
      const fileData = Buffer.from(page.title, 'utf8');
      await this.fs.writeFile(fileURI, fileData);
    }
  }

  public async setupProject(config: ProjectConfig) {
    if (this.rootWorkspace) {
      await this.parseWorkspace(this.rootWorkspace);
      await this.createPageFiles(config.pages);
    }
  }
}