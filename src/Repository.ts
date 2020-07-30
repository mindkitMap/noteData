import { Node, Meta } from "./Node";
import { StringKeyObject } from "./Util";

export type Id = string;

export interface Repository {
  listTopicNames(): [string, Id][];
  listTopics(ids?: Id[]): Topic[];
  getTopic(id: Id): Topic | undefined;
}

export interface WritableRepository {
  saveTopic(topic: Topic): void;
}
export type TopicMeta = {
  repositoryInfo?: StringKeyObject;
  viewInfo?: StringKeyObject;
} & StringKeyObject;
export class Topic {
  constructor(public meta: TopicMeta, public id: Id, public root: Node) {}
}
