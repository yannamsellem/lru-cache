export default class MapLRU<T> {
  private _limit: number
  private _map: Map<string, T>

  constructor(limit: number) {
    this._limit = limit
    this._map = new Map()
  }

  set(key: string, value: T) {
    this._map.delete(key)
    this._map.set(key, value)
    if (this._map.size > this._limit) {
      const firstKey = this._map.keys().next()
      if (!firstKey.done) {
        this._map.delete(firstKey.value)
      }
    }
  }

  get(key: string) {
    const value = this._map.get(key)
    if (value != null) {
      this._map.delete(key)
      this._map.set(key, value)
    }
    return value
  }

  has(key: string): boolean {
    return this._map.has(key)
  }

  delete(key: string) {
    this._map.delete(key)
  }

  size(): number {
    return this._map.size
  }

  capacity(): number {
    return this._limit - this._map.size
  }

  clear(): void {
    this._map.clear()
  }
}
