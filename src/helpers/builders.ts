import { TextEditor } from "vscode";
import * as vscode from "vscode";
import { Section } from "../types";

export const buildSection = (editor: TextEditor, section: Section) => {
  const { selection } = editor;
  editor.edit(builder => {
    builder.insert(selection.active, `<!-- ${section.title} -->\n`);
    builder.insert(selection.active, section.data.template);
    vscode.commands.executeCommand('editor.emmet.action.expandAbbreviation');
  });
}