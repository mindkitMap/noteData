import { Repository, Id, Topic } from "./Repository";
import { Node } from "./Node";
import fs from "fs-extra";
import moment from "moment";
import { fail } from "assert";
import _, { toNumber } from "lodash";
export class RoamEditRepository implements Repository {
  private json: RoamEditRecord[];
  private repositoryInfo: any;
  //   private tree:
  constructor(public path: string) {
    //NOTE 如果是一个目录，将找最近的一个。
    this.repositoryInfo = { path };
    if (fs.lstatSync(this.path).isDirectory()) {
      const name = fs
        .readdirSync(path)
        .filter((p) => !fs.lstatSync(p).isDirectory())
        .filter((name) => name.endsWith(".json") && name.startsWith("roamedit"))
        .sort()[0];
      if (name === undefined) fail("roamedit file not find");
      this.json = fs.readJSONSync(name);
    } else {
      this.json = fs.readJSONSync(path);
    }
    // this.tree
  }
  listTopicNames(): [string, Id][] {
    return this.json
      .filter((record) => record.isTopic)
      .map((record) => [record.text, record.id]);
  }
  toNode(record: RoamEditRecord): Node {
    return new Node(
      record.id,
      //TODO re的text不一定就是text类型。
      { type: "text", body: record.text },
      this.json
        .filter((re) => re.pid === record.id)
        .sort((a, b) => a.weight - b.weight)
        .map((re) => this.toNode(re)),

      {
        repositoryInfo: this.repositoryInfo,
        viewInfo: { expanded: !(record.foldup ?? false) },
        version: {
          created: moment(record.created * 1000).format(),
          updated: moment(record.updated * 1000).format(),
        },
      }
    );
  }
  toTopic(record: RoamEditRecord): Topic {
    const root = this.toNode(record);
    return new Topic(
      {
        repositoryInfo: this.repositoryInfo,
        viewInfo: { expanded: !(record.foldup ?? false) },
      },
      record.id,
      root
    );
  }
  listTopics(ids?: Id[]): Topic[] {
    return this.json
      .filter(
        (record) =>
          record.isTopic &&
          (ids === undefined ? true : ids?.includes(record.id))
      )
      .sort((a, b) => a.weight - b.weight)
      .map((re) => this.toTopic(re));
  }
  getTopic(id: Id): Topic | undefined {
    return this.listTopics([id])[0];
  }
}

interface RoamEditRecord {
  id: Id;
  //TODO 需要研究，比较丰富的内容如何存储在这个字段？
  text: string;
  isTopic: boolean;
  //NOTE weight 表示顺序，越小的越在前面。
  weight: number;
  foldup?: boolean;
  created: number;
  updated: number;
  pid: Id;
}
