import { PlaceholderValue, Section, SectionData, SectionType, sectionDatas, IPath } from "../types";
import * as vscode from 'vscode';
import { DATA_CONTENT } from "./file-contents";

export const getSectionData = (sectionType: SectionType): SectionData => {
  return sectionDatas.find(data => data.type === sectionType) ?? sectionDatas[0];
};

export const requestSectionValues = async (forPage?: boolean) => {
  const { window } = vscode;
  const sectionName = await window.showInputBox({ placeHolder: 'Section name' }) ?? 'Section';
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

  // - Replace placeholders with real values - 
  section.data.template = template;

  return section;
};

export const generateRouterFileContent = (paths: string[]): string => {
  const routes = paths.map(path =>
    `
    {
      path: "/${path === 'home' ? '' : path}", 
      component: () => import("@/views/${path}")
    }`);

  const routerFileContent = `
    import { createRouter, createWebHistory } from "vue-router";

    const routes = [${routes}];

    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
      scrollBehavior: function (to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        }
      return { left: 0, top: 0 };
      },
    });
    
    export default router;
    `;

  return routerFileContent;
};

export const generateDataFileContent = (paths: string[]): string => {
  const routes = paths.map(
    (path) =>
      `
    {
      path: "/${path === "home" ? "" : path}",
      label: "${path.substr(path.lastIndexOf("/") + 1)}",
      component: () => import("@/views/${path}"),
    },
    `
  );
  
  return DATA_CONTENT.replace(
    PlaceholderValue.DATA_ROUTES,
    routes.join("\n")
  );
};

export const parsePathArray = (paths: string[]): IPath[] => {
  const pathObjects: Record<string, IPath> = {};
  paths.forEach(path => {
    const lastSlash = path.lastIndexOf('/');
    const label = path.substr(path.lastIndexOf('/') + 1);
    let parent = '';
    if (lastSlash !== -1) {
      parent = path.substr(0, lastSlash);
      pathObjects[parent].dropdownItems = [...pathObjects[parent]?.dropdownItems ?? [], { label, path }];
    } else {
      pathObjects[label] = {
        label,
        path,
      };
    }
  });

  return Object.values(pathObjects);
};
