import { window } from 'vscode';
import ProjectController from '../helpers/ProjectController';
export default async () => {
  const projectController = new ProjectController();
  const configStr = await window.showInputBox({ placeHolder: `e.g: home,about,about/team...)`, prompt: 'Declare routes' }) ?? 'home';
  const config = configStr.split(',').map(path => path.trim());
  const result = await window
    .showInformationMessage(
      "Override all files as needed?",
      ...["Yes", "No"]
    );
  if (!result) { return; }
  console.log(result, result === 'Yes');
  await projectController.setupProject(config, result === "Yes");
};
