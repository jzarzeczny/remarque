export type NodeType = "header" | "content" | "image";

export interface Remarque {
  id: string;
  frontPage: FrontPage;
  subPage?: SubPage[];
}
export interface FrontPage {
  title: string;
}
export interface SubPage {
  id: string;
  nodes: SubPageNode[];
}

export interface SubPageNode {
  id: string;
  type: NodeType;
  content: string;
}

export interface NewRemarque {
  frontPage: FrontPage;
}
