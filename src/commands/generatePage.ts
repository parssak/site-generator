import { requestSectionValues } from './../helpers/index';
import { generateSectionFromData } from '../helpers/index';
import * as vscode from 'vscode';
import { buildHeader, buildSection } from '../helpers/builders';

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
    const section = generateSectionFromData(sectionName, sectionType, count);
    if (editor) { buildSection(editor, section); }
  }
};
