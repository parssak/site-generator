import { generateSection, getSectionData } from './../helpers/index';
import * as vscode from 'vscode';
import {
  SectionType
} from '../types';
export default async () => {
  const { window } = vscode;
  const editor = window.activeTextEditor;

  // https://github.com/microsoft/vscode-extension-samples/blob/main/quickinput-sample/src/basicInput.ts
  const sectionName = await window.showInputBox({
    placeHolder: 'Section name',
  }) ?? 'Section';

  const items: vscode.QuickPickItem[] = Object.values(SectionType).map(val => ({ label: val, description: val }));
  const selection = await window.showQuickPick(items);
  if (!selection) {
    return;
  }
  
  const needsCount = getSectionData(selection.label as SectionType).hasCount;
  const count = needsCount ? await window.showInputBox({
    placeHolder: 'Section count',
  }) ?? 3 : 0;

  // generate the section
  const section = generateSection(sectionName, selection.label as SectionType, count as number);

  if (editor) {
    const { selection } = editor;
    editor.edit(editBuilder => {
      editBuilder.insert(selection.active, `<!-- ${sectionName} -->\n`);
      editBuilder.insert(selection.active, section.data.template);
      vscode.commands.executeCommand('editor.emmet.action.expandAbbreviation');
    });
  }
};
