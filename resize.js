const sharp = require('sharp')
const glob = require('glob')
const fs = require('fs')
const path = require('path')

;(async () => {
  const matches = await new Promise((resolve, reject) => glob('./sources/*.jpeg', (err, matches) => err ? reject(err) : resolve(matches)))
  
  for (const file of matches) {
    console.log(file)
    const image = sharp(fs.readFileSync(file))
    const meta = await image.metadata()

    const max = Math.max(meta.width, meta.height)

    await image
      .rotate()
      .resize(Math.floor(meta.width * 1920 / max), Math.floor(meta.height * 1920 / max))
      .jpeg()
      .toFile(`./sources/__resized/${path.basename(file)}`)
  }
})()
