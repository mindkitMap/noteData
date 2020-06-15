export type Id = string;

export interface Repository {
  listTopicNames(): [string, Id][];
  listTopics(ids?: Id[]): Topic[];
  getTopic(id: Id): Topic | undefined;
}

export interface WritableRepository{
      saveTopic(topic: Topic):void
}

export class Topic {
  constructor(
    public path: string,
    public id: Id,
    public title: string,
    public nodes: Node[]
  ) {}
}
export class Node {
  constructor(
    public id: Id,
    public text: string,
    public created: string,
    public updated: string
  ) {}
}
