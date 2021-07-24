import { PlaceholderValue, Section, SectionData, SectionType, sectionDatas } from "../types";
import * as vscode from 'vscode';

export const getSectionData = (sectionType: SectionType): SectionData => {
  return sectionDatas.find(data => data.type === sectionType) ?? sectionDatas[0];
};

export const requestSectionValues = async (forPage?: boolean) => {
  const { window } = vscode;
  // const placeHolder = `Section name ${forPage ? '/ [done] to stop adding sections' : ''}`;
  const sectionName = await window.showInputBox({ placeHolder: 'Section name' }) ?? 'Section';

  if (forPage && sectionName === 'done') {
    return;
  }

  const items: vscode.QuickPickItem[] = Object.values(SectionType).map(val => ({ label: val, description: val }));
  const selection = await window.showQuickPick(items);
  if (!selection) {
    return;
  }
  const sectionType: SectionType = selection.label as SectionType;

  const needsCount = getSectionData(sectionType).hasCount;
  const count = needsCount ? await window.showInputBox({
    placeHolder: 'Section count',
  }) ?? 3 : 0;


  return {
    sectionName, sectionType, count: count as number
  };
};

/** Creates Section object from SectionData */
export const generateSectionFromData = (title: string, type: SectionType, count: number): Section => {
  const section: Section = {
    title,
    type,
    data: getSectionData(type),
  };

  // - Replace placeholders with real values - 
  let { template } = section.data;

  // Replace PlaceholderValue.TITLE with title
  template = template.replace(PlaceholderValue.TITLE, title);

  // Replace PlaceholderValue.COUNT with count
  if (section.data.hasCount) {
    template = template.replace(new RegExp(PlaceholderValue.COUNT, 'g'), count.toString());
  }

  console.log('generated', template);

  // - Replace placeholders with real values - 
  section.data.template = template;

  return section;
};