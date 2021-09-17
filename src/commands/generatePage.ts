import { requestSectionValues } from './../helpers/index';
import * as vscode from 'vscode';
import { buildHeader } from '../helpers/builders';
import SectionController from '../helpers/SectionController';

export default async () => {
  const { window } = vscode;
  const editor = window.activeTextEditor;
  if (!editor) { return; }
  const titlePaths = editor.document.fileName.split('/');
  let title = titlePaths[titlePaths.length - 1];
  // Remove trailing file extension
  title = title.replace(/\.[^/.]+$/, '');
  const pageTitle = `${title}`;
  buildHeader(editor, pageTitle);

  while (true) {
    const sectionValues = await requestSectionValues();
    if (!sectionValues) { break; }
    const { sectionName, sectionType, count } = sectionValues;
    SectionController.createSection(sectionName, sectionType, count);
  }
};
