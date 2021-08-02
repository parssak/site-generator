import { requestSectionValues } from './../helpers/index';
import SectionController from '../helpers/SectionController';

export default async () => {
  const sectionValues = await requestSectionValues();

  if (!sectionValues) { return; }

  const { sectionName, sectionType, count } = sectionValues;

  SectionController.createSection(sectionName, sectionType, count);
};
