import { Id } from "./Repository";
import { StringKeyObject } from "./Util";

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
}
