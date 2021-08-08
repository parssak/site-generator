import { window } from 'vscode';
import ProjectController from '../helpers/ProjectController';
export default async () => {
  const projectController = new ProjectController();
  const configStr = await window.showInputBox({ placeHolder: `e.g: home,about,about/team...)`, prompt: 'Declare routes' }) ?? 'home';
  const config = configStr.split(',').map(path => path.trim());
  const result = await window
    .showInformationMessage(
      "Warning: This will override any current files as needed, continue?",
      ...["Yes", "No"]
  );
  if (result === "Yes") {
    await projectController.setupProject(config);
  }
};
