export enum SectionType {
  Regular = "Regular",
  SplitLeft = "Split Left",
  SplitRight = "Split Right",
  Banner = "Banner",
}

export enum ComponentType {
  Header = "Header",
  Container = "Container",
  Split = "Split",
  Banner = "Banner",

}

export enum PlaceholderValue {
  TITLE = "TITLE_TEXT",
  COUNT = "COUNT",
  NAV_ROUTES = "NAV_ROUTES",
  FOOTER_ROUTES = "FOOTER_ROUTES",
  DATA_ROUTES = "DATA_ROUTES",
}

export interface SectionData {
  type: SectionType;
  components: ComponentType[];
  template: string;
  hasCount?: boolean;
}

export interface Section {
  title: string;
  type: SectionType;
  data: SectionData;
}

export interface Page {
  title: string;
  sections: Section[];
}

export interface ProjectConfig {
  pages: Page[];
}

export interface IPath {
  label: string;
  path: string;
  dropdownItems?: IPath[];
}

export const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget nisl auctor, rhoncus nisl ut, aliquam erat.";

export const sectionDatas: SectionData[] = [
  {
    type: SectionType.Regular,
    template: `${ComponentType.Container}>h2{${PlaceholderValue.TITLE}}^{}`,
    components: [ComponentType.Container],
  },
  {
    type: SectionType.SplitLeft,
    template: `${ComponentType.Split}[title="${PlaceholderValue.TITLE}" description="${lorem}"]>img[src="http://placehold.it/600x400" alt=""]^{}`,
    components: [ComponentType.Split],
  },
  {
    type: SectionType.SplitRight,
    template: `${ComponentType.Split}[:flip="true" title="${PlaceholderValue.TITLE}" description="${lorem}"]>img[src="http://placehold.it/600x400" alt=""]^{}`,
    components: [ComponentType.Split],
  },
  {
    type: SectionType.Banner,
    template: `${ComponentType.Banner}[title="${PlaceholderValue.TITLE}" description="${lorem}"]>img[src="http://placehold.it/600x400" alt=""]^{}`,
    components: [ComponentType.Banner],
  },
];
