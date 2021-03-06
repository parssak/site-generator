import { generateDataFileContent } from "./index";
import { BASE_FILE_CONTENT } from "./file-contents";
import {
  FileSystem,
  FileType,
  Uri,
  workspace,
  WorkspaceFolder,
  window,
} from "vscode";
import { posix } from "path";
import { PlaceholderValue } from "../types";

export default class ProjectController {
  private rootWorkspace: WorkspaceFolder | undefined;
  private srcDirectoryURI: Uri | undefined;
  private fs: FileSystem = workspace.fs;
  private overrideAllConflicts = false;

  constructor() {
    this.setRootWorkspace();
  }

  public async setupProject(paths: string[], overrideAllConflicts: boolean) {
    this.overrideAllConflicts = overrideAllConflicts;
    if (!this.rootWorkspace) {
      return;
    }
    await this.parseWorkspace(this.rootWorkspace);
    await this.createViewFiles(paths);
    await this.createDataFile(paths);
  }

  private setRootWorkspace() {
    if (!workspace.workspaceFolders) {
      console.log("No workspace folders.");
      return;
    }
    this.rootWorkspace = workspace.workspaceFolders[0];
  }

  private async parseWorkspace(root: WorkspaceFolder) {
    const basePath = root.uri.path;
    const directory: [string, FileType][] = await this.fs.readDirectory(
      root.uri
    );
    for (const [name, type] of directory) {
      const path = `${basePath}/${name}`;
      const uri = Uri.parse(path);
      if (name === "src" && type === FileType.Directory) {
        this.srcDirectoryURI = uri;
      }
    }
  }

  private async createViewFiles(paths: string[]) {
    if (!this.srcDirectoryURI) {
      return;
    }
    for (const path of paths) {
      await this.addFile(
        "views",
        `${path.toLowerCase()}/index`,
        BASE_FILE_CONTENT.replace(
          PlaceholderValue.TITLE,
          path.substr(path.lastIndexOf("/") + 1)
        )
      );
    }
  }

  private async createDataFile(paths: string[]) {
    await this.addFile("data", "index", generateDataFileContent(paths), "js");
  }

  private async addFile(
    folder: string,
    file: string,
    content: string,
    fileExtension: string = "vue"
  ) {
    if (!this.srcDirectoryURI) {
      return;
    }
    const localePath = `${folder}/${file}.${fileExtension}`;
    const path = posix.join(this.srcDirectoryURI.path, localePath);
    const uri = this.srcDirectoryURI.with({ path });

    if (this.overrideAllConflicts) {
      this._writeFile(uri, content);
      return;
    }
    try {
      await this.fs.readFile(uri);
      const result = await window.showInformationMessage(
        `File: ${localePath} already exists, override it?`,
        ...["Yes", "No"]
      );
      if (result === "Yes") {
        await this._writeFile(uri, content);
      }
    } catch (err) {
      await this._writeFile(uri, content);
    }
  }

  private async _writeFile(uri: Uri, content: string) {
    return await this.fs.writeFile(uri, Buffer.from(content, "utf8"));
  }
}
