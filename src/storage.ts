import { API } from 'homebridge'
import path from 'path'

import { readJsonSync, writeJsonSync } from 'fs-extra'

import { OnDisk } from './accessory'

class Storage {
  public accessories: Record<string, OnDisk> = {}

  private readonly filePath: string

  constructor(api: API) {
    this.filePath = path.join(api.user.cachedAccessoryPath(), 'vieramatic.json')
    const data = readJsonSync(this.filePath, { throws: false })

    this.accessories = data ?? {}
  }

  public get(id: string): OnDisk {
    if (this.accessories[id] == null) this.accessories[id] = {}

    return this.accessories[id]
  }

  public save(): void {
    writeJsonSync(this.filePath, this.accessories)
  }
}

export default Storage
