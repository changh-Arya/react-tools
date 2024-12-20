import fs from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import type { Compiler, RspackPluginInstance } from '@rspack/core'

const PLUGIN_NAME = 'SpaMapJson'

class SpaMapJsonPlugin implements RspackPluginInstance {
  apply(compiler: Compiler) {
    compiler.hooks.done.tap(PLUGIN_NAME, async (stats) => {
      const asset = stats.toJson().assets?.find((asset) => {
        const isStart = asset.name.startsWith('main-spa.') || asset.name.startsWith('main.')
        const isEnd = asset.name.endsWith('.js')
        return isStart && isEnd
      })

      if (asset) {
        const outputDir = `${compiler.outputPath}/public`
        const outputPath = path.join(outputDir, 'map.json')
        const jsonData = {
          main: asset.name
        }

        const mergedJSONString = `${JSON.stringify(jsonData, null, 2)}\n`
        try {
          await fs.access(outputPath, constants.R_OK | constants.W_OK)
        } catch {
          await fs.mkdir(outputDir, { recursive: true })
        }

        fs.writeFile(outputPath, mergedJSONString)
      }
    })
  }
}

export default SpaMapJsonPlugin
