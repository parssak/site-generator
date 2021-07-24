import {  PlaceholderValue, Section, SectionData, SectionType, sectionDatas } from "../types";

export const getSectionData = (sectionType: SectionType): SectionData => {
  return sectionDatas.find(data => data.type === sectionType) ?? sectionDatas[0];
};

/** Creates Section object from SectionData */
export const generateSection = (title: string, type: SectionType, count: number): Section => {
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
    template = template.replace(PlaceholderValue.COUNT, count.toString());
  }

  // - Replace placeholders with real values - 
  section.data.template = template;

  return section;
};

