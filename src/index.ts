import CacheNode from './CacheNode'

const cachesMap = new WeakMap<LRU, Map<string, CacheNode>>()

export default class LRU {
  limit: number
  head?: CacheNode
  tail?: CacheNode

  constructor(limit: number = 100) {
    this.limit = limit
    this.head = null
    this.tail = null
    cachesMap.set(this, new Map())
  }

  write(key: string, value: any) {
    const cache = cachesMap.get(this)

    if (cache.size === this.limit) {
      this.remove(this.tail.key)
    }

    if (this.head) {
      const node = new CacheNode(key, value, this.head)
      this.head.prev = node
      this.head = node
    } else {
      this.head = new CacheNode(key, value)
      this.tail = this.head
    }

    cache?.set(key, this.head)
  }

  remove(key: string) {
    const cache = cachesMap.get(this)
    const node = cache.get(key)
    if (node) {
      if (node.prev) {
        node.prev.next = node.next
      } else {
        this.head = node.next
      }

      if (node.next) {
        node.next.prev = node.prev
      } else {
        this.tail = node.prev
      }

      cache.delete(key)
    }
  }

  read(key: string) {
    const cache = cachesMap.get(this)
    const node = cache.get(key)
    if (node) {
      this.remove(key)

      this.write(key, node.value)

      return node.value
    } else {
      return null
    }
  }
}
