import { generateSectionFromData, getSectionData } from '../helpers/index';
import * as vscode from 'vscode';
import {
  SectionType
} from '../types';
import { buildSection } from '../helpers/builders';

export default async () => {
  const { window } = vscode;
  const editor = window.activeTextEditor;

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
  const section = generateSectionFromData(sectionName, selection.label as SectionType, count as number);

  if (editor) {
    buildSection(editor, section);
  }
};
