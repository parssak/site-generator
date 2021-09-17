export enum SectionType {
  Regular = 'Regular',
  SplitLeft = 'Split Left',
  SplitRight = 'Split Right',
  Columns = 'Columns',
  Cards = 'Cards',
  ImageCards = 'Image Cards',
  Banner = 'Banner',
}

export enum ComponentType {
  Header = 'Header',
  Container = 'Container',
  Grid = 'Grid',
  Card = 'Card',
  ImageCard = 'ImageCard',
  Image = 'Image'
}

export enum PlaceholderValue {
  TITLE = 'TITLE_TEXT',
  COUNT = 'COUNT',
  NAV_ROUTES = 'NAV_ROUTES',
  FOOTER_ROUTES = 'FOOTER_ROUTES',
  DATA_ROUTES = 'DATA_ROUTES'
}

export interface SectionData {
  type: SectionType,
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

export const sectionDatas: SectionData[] = [
  {
    type: SectionType.Regular,
    template: `${ComponentType.Container}>h2{${PlaceholderValue.TITLE}}^{}`,
    components: [ComponentType.Container],
  },
  {
    type: SectionType.SplitLeft,
    template: `${ComponentType.Container}>${ComponentType.Grid}[type='column']>((section>(h2{${PlaceholderValue.TITLE}}+p>lorem))+(section>${ComponentType.Image}[src="http://placehold.it/600x400"]/))^^{}`,
    components: [ComponentType.Container, ComponentType.Grid, ComponentType.Image],
  },
  {
    type: SectionType.SplitRight,
    template: `${ComponentType.Container}>${ComponentType.Grid}[type='column']>((section>${ComponentType.Image}[src="http://placehold.it/600x400"]/)+(section>(h2{${PlaceholderValue.TITLE}}+p>lorem)))^^{}`,
    components: [ComponentType.Container, ComponentType.Grid, ComponentType.Image],
  },
  {
    type: SectionType.Banner,
    template: `${ComponentType.Container}>${ComponentType.Grid}[type='center']>(h2{${PlaceholderValue.TITLE}}+p>lorem10)^^{}`,
    components: [ComponentType.Container, ComponentType.Grid],
  },
  {
    type: SectionType.Columns,
    template: `${ComponentType.Container}>(h2{${PlaceholderValue.TITLE}}+${ComponentType.Grid}[type='column' count=${PlaceholderValue.COUNT}]>((div>{Column $})*${PlaceholderValue.COUNT}))^{}`,
    components: [ComponentType.Container, ComponentType.Grid],
    hasCount: true,
  },
  {
    type: SectionType.Cards,
    template: `${ComponentType.Container}>(h2{${PlaceholderValue.TITLE}}+${ComponentType.Grid}[type='column' count=${PlaceholderValue.COUNT}]>((${ComponentType.Card}>{Column $})*${PlaceholderValue.COUNT}))^{}`,
    components: [ComponentType.Container, ComponentType.Grid, ComponentType.Card],
    hasCount: true,
  },
  {
    type: SectionType.ImageCards,
    template: `${ComponentType.Container}>(h2{${PlaceholderValue.TITLE}}+${ComponentType.Grid}[type='column' count=${PlaceholderValue.COUNT}]>((${ComponentType.ImageCard}>{Column $})*${PlaceholderValue.COUNT}))^{}`,
    components: [ComponentType.Container, ComponentType.Grid, ComponentType.ImageCard],
    hasCount: true,
  },
];
