export default class CacheNode {
  key: string;
  value: any;
  next?: CacheNode;
  prev?: CacheNode;

  constructor(
    key: string,
    value: any,
    next: CacheNode = null,
    prev: CacheNode = null
  ) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
