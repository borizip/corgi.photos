const { S3 } = require('aws-sdk')
const sharp = require('sharp')

const IMAGE_COUNT = 16

const s3 = new S3()

async function index(event) {
  const query = event.queryStringParameters || {}

  const width = Math.min(+event.pathParameters.width, 1000)
  const height = Math.min(+event.pathParameters.height, 1000)
  const seed = ~~(Math.random() * IMAGE_COUNT)

  const path = `images/${seed}__${width}x${height}.jpeg`
  try {
    await s3.headObject({
      Bucket: `corgi-photos-${process.env.STAGE}`,
      Key: path,
    }).promise()
  } catch (e) {
    const { Body } = await s3.getObject({
      Bucket: `corgi-photos-${process.env.STAGE}`,
      Key: `images/${seed}.jpeg`,
    }).promise()

    await s3.putObject({
      Bucket: `corgi-photos-${process.env.STAGE}`,
      Key: path,
      Body: await sharp(Body)
        .resize(width, height)
        .toBuffer()
    }).promise()
  }

  const { Body } = await s3.getObject({
    Bucket: `corgi-photos-${process.env.STAGE}`,
    Key: path,
  }).promise()

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
