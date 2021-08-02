import { commands, window, TextEditor } from 'vscode';
import { getSectionData } from ".";
import { PlaceholderValue, Section, SectionType } from "../types";


export default class SectionController {
  static editor: TextEditor | undefined = window.activeTextEditor;

  public static createSection(title: string, type: SectionType, count: number) {
    const section: Section = this.generateSection(title, type, count);
    this.buildSection(section);
  }

  private static generateSection(title: string, type: SectionType, count: number): Section {
    const section: Section = {
      title,
      type,
      data: getSectionData(type),
    };

    let { template } = section.data;

    // - Replace placeholders with real values - 
    template = template.replace(PlaceholderValue.TITLE, title);
    if (section.data.hasCount) { template = template.replace(new RegExp(PlaceholderValue.COUNT, 'g'), count.toString()); }
    section.data.template = template;

    return section;
  };

  private static buildSection(section: Section) {
    if (!this.editor) { return; }
    const { selection } = this.editor;
    this.editor.edit(async (builder) => {
      builder.insert(selection.active, `\n<!-- ${section.title} -->\n`);
      builder.insert(selection.active, section.data.template);
      commands.executeCommand('editor.emmet.action.expandAbbreviation');
    });
  };
}
