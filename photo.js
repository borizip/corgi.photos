const { S3 } = require('aws-sdk')
const sharp = require('sharp')

const IMAGE_COUNT = 56

const Bucket = `corgi-photos-${process.env.STAGE}`

const s3 = new S3()

async function index(event) {
  const options = event.pathParameters.options.split('/')

  let grayscale = false
  if (options[0] === 'g') {
    options.shift() 
    grayscale = true
  }

  if (options.length !== 2) {
    return {
      statusCode: 404,
    }
  }

  const width = Math.min(+options[0], 1920)
  const height = Math.min(+options[1], 1920)

  const seed = ~~(Math.random() * IMAGE_COUNT)

  let basename = `images/${seed}__${width}x${height}`
  if (grayscale) {
    basename += '__g'
  }
  const Key = `${basename}.jpeg`

  try {
    await s3.headObject({ Bucket, Key }).promise()
  } catch (e) {
    // source
    const { Body } = await s3.getObject({ Bucket, Key: `images/${seed}.jpeg` }).promise()
    let src = sharp(Body).resize(width, height)
    if (grayscale) {
      src = src.grayscale()
    }
    await s3.putObject({
      Bucket,
      Key,
      Body: await src.toBuffer()
    }).promise()
  }

  const { Body } = await s3.getObject({ Bucket, Key }).promise()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/jpg',
    },
    body: Body.toString('base64'),
    isBase64Encoded: true
  }
}

module.exports = {
  index,
}
