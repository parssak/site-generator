import { ComponentType } from './../types/index';
import { TextEditor } from "vscode";
import * as vscode from "vscode";
import { Section } from "../types";

export const buildSection = (editor: TextEditor, section: Section) => {
  const { selection } = editor;
  editor.edit(async (builder) => {
    builder.insert(selection.active, `\n<!-- ${section.title} -->\n`);
    builder.insert(selection.active, section.data.template);
    vscode.commands.executeCommand('editor.emmet.action.expandAbbreviation');
  });
};

export const buildHeader = (editor: TextEditor, title: string) => {
  const { selection } = editor;
  editor.edit(async (builder) => {
    builder.insert(selection.active, `${ComponentType.Header}>h1{${title}}^{}`);
    vscode.commands.executeCommand('editor.emmet.action.expandAbbreviation');
  });
};