import { Repository, Topic, Id,WritableRepository } from "./Repository";

//vault是自有的存储结构

// root-
//     topic
//         yaml
//         asset

export class Vault implements Repository, WritableRepository {
  getTopic(id: string): Topic | undefined {
    throw new Error("Method not implemented.");
  }
  constructor(public path: string) {}
  listTopicNames(): [string, Id][] {}
  listTopics(ids?: Id[]): Topic[] {}
  saveTopic(topic: Topic) {}
}

//IDEA 每个topical 是一个text bundle。

function textBundleToTopic(path: string): Topic {}
