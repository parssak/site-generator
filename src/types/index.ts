export enum SectionType {
  Regular = 'Regular',
  SplitLeft = 'Split Left',
  SplitRight = 'Split Right',
  Columns = 'Columns',
  Cards = 'Cards',
  Banner = 'Banner',
}

export enum ComponentType {
  Container = 'Container',
  Grid = 'Grid',
  Card = 'Card',
  Image = 'Image'
}

export enum PlaceholderValue {
  TITLE = 'TITLE_TEXT',
  COUNT = 'COUNT'
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

export const sectionDatas: SectionData[] = [
  {
    type: SectionType.Regular,
    template: `${ComponentType.Container}>h2{${PlaceholderValue.TITLE}}`,
    components: [ComponentType.Container],
  },
  {
    type: SectionType.SplitLeft,
    template: `${ComponentType.Container}>${ComponentType.Grid}[type='column']>((section>(h2{${PlaceholderValue.TITLE}}+p>lorem))+(section>${ComponentType.Image}[src="http://placehold.it/600x400"]))`,
    components: [ComponentType.Container, ComponentType.Grid, ComponentType.Image],
  },
  {
    type: SectionType.SplitRight,
    template: `${ComponentType.Container}>${ComponentType.Grid}[type='column']>((section>${ComponentType.Image}[src="http://placehold.it/600x400"])+(section>(h2{${PlaceholderValue.TITLE}}+p>lorem)))`,
    components: [ComponentType.Container, ComponentType.Grid, ComponentType.Image],
  },
  {
    type: SectionType.Banner,
    template: `${ComponentType.Container}>${ComponentType.Grid}[type='center']>(h2{${PlaceholderValue.TITLE}}+p>lorem10)`,
    components: [ComponentType.Container, ComponentType.Grid],
  },
  {
    type: SectionType.Columns,
    template: `${ComponentType.Container}>h2{${PlaceholderValue.TITLE}}+${ComponentType.Grid}[type='column' count=${PlaceholderValue.COUNT}]>div>{Column $}*${PlaceholderValue.COUNT}`,
    components: [ComponentType.Container, ComponentType.Grid],
    hasCount: true,
  },
  {
    type: SectionType.Cards,
    template: `${ComponentType.Container}>(h2{${PlaceholderValue.TITLE}}+${ComponentType.Grid}[type='column' count=${PlaceholderValue.COUNT}]>((${ComponentType.Card}>{Card $})*${PlaceholderValue.COUNT}))`,
    components: [ComponentType.Container, ComponentType.Grid, ComponentType.Card],
    hasCount: true,
  },
];
