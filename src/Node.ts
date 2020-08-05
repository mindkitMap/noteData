import { Id } from "./Repository";
import { StringKeyObject } from "./Util";
import { sum, max } from "lodash";

export type Version = { created: string; updated: string };

export type Meta = {
  repositoryInfo?: StringKeyObject;
  viewInfo?: StringKeyObject;
  properties?: StringKeyObject;
  version: Version;
} & StringKeyObject;

type Content = { type: string } & StringKeyObject;

export class Node {
  constructor(
    public id: Id,
    public content: Content,
    public children: Node[],
    public meta: Meta
  ) {}
  get text(): string {
    if (this.content.type === "text") {
      return this.content["body"];
    } else {
      return this.content.toString();
    }
  }

  static fromObject(object: any): Node {
    return new Node(
      object.id,
      object.content,
      object.children.map((child) => Node.fromObject(child)),
      object.meta
    );
  }
}

export const NodeStatic = {
  count(node: Node): number {
    return 1 + sum(node.children.map((child) => NodeStatic.count(child)));
  },
  // deep(node:Node,base:number=0):number{
  //   return max(0,
  // }
};
