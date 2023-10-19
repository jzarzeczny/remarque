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
  type: NodeType;
  content: string;
}
