import { requestSectionValues } from './../helpers/index';
import { generateSectionFromData } from '../helpers/index';
import * as vscode from 'vscode';
import { buildSection } from '../helpers/builders';

export default async () => {

  const { window } = vscode;

  const editor = window.activeTextEditor;

  const sectionValues = await requestSectionValues();

  if (!sectionValues) { return; }

  const { sectionName, sectionType, count } = sectionValues;

  const section = generateSectionFromData(sectionName, sectionType, count);

  if (editor) { buildSection(editor, section); }

};
