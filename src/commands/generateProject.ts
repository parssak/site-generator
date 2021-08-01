import * as vscode from 'vscode';
import FileController from '../helpers/FileController';
import { ProjectConfig, SectionType } from '../types';
export default async () => {

  const { window, workspace } = vscode;

  console.log("Ran generate project!");
  const fc = new FileController();

  const config: ProjectConfig = {
    pages: [
      {
        title: "Home",
        sections: []
      },
      {
        title: "About",
        sections: []
      }

    ],
  };


  fc.setupProject(config);


  // const editor = window.activeTextEditor;

  // if (!editor) { return; }
  // const titlePaths = editor.document.fileName.split('/');
  // let title = titlePaths[titlePaths.length - 1];
  // // Remove trailing file extension
  // title = title.replace(/\.[^/.]+$/, '');
  // const pageTitle = `${title}`;
  // buildHeader(editor, pageTitle);

  // while (true) {
  //   const sectionValues = await requestSectionValues();
  //   if (!sectionValues) { break; }
  //   const { sectionName, sectionType, count } = sectionValues;
  //   const section = generateSectionFromData(sectionName, sectionType, count);
  //   if (editor) { buildSection(editor, section); }
  // }
};
