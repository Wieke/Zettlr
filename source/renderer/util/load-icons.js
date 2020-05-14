/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        Clarity icons helper
 * CVM-Role:        Utility
 * Maintainer:      Wieke Kanters
 * License:         GNU GPL v3
 *
 * Description:     This module loads the clarity library and adds custom icons.
 *
 * END HEADER
 */

const clarityIcons = require('@clr/icons').ClarityIcons
require('@clr/icons/shapes/all-shapes')
const fs = require('fs').promises
const path = require('path')

async function loadCustomIcons (dir) {
  let list = await fs.readdir(dir)
  for (let name of list){
    let p = path.join(dir, name)
    let stat = await fs.stat(p)
    if (stat.isDirectory()) {
      await loadCustomIcons(p)
    } else if (stat.isFile()) {
      let ext = path.extname(name)
      if (ext && ext.toLowerCase() === '.svg') {
        let data = await fs.readFile(p)
        let icon = {}
        icon[path.basename(name, ext)] = data.toString()
        clarityIcons.add(icon)
      }
    }
  }
}

module.exports = () => loadCustomIcons(path.join(__dirname, '../assets/icons'))
