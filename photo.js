const { S3 } = require('aws-sdk')
const sharp = require('sharp')
const axios = require('axios')
const qs = require('querystring')
const crypto = require('crypto')

const IMAGE_COUNT = 35

const Bucket = `corgi-photos-${process.env.STAGE}`

const s3 = new S3()

async function render(event) {
  const options = event.pathParameters.options.split('/')

  let isSeedEnabled = false
  let seed = ~~(Math.random() * IMAGE_COUNT)
  if (options.length === 4 || (options.length === 3 && options[0] !== 'g')) {
    isSeedEnabled = true
    seed = (+`0x${crypto.createHash('sha1').update(options.shift()).digest('hex').slice(0, 8)}`) % IMAGE_COUNT
  }

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

  const headers = Object.fromEntries(Object.entries(event.headers || {}).map(([key, value]) => [key.toLowerCase(), value]))

  const fingerprint = [
    headers['user-agent'],
    headers['cookie'],
    headers['accept-encoding'],
    headers['accept-language'],
  ].join('__')
  const clientId = crypto.createHash('sha256').update(fingerprint).digest('hex')

  const axiosPromise = axios.post('https://www.google-analytics.com/collect', qs.stringify({
    v: 1,
    tid: 'UA-151383765-1',
    cid: clientId,

    t: 'pageview',
    dr: headers.referer,
    dh: headers.host || 'corgi.photos',
    dp: (event.path || '/') + (Object.keys(event.queryStringParameters || {}).length ? `?${qs.stringify(event.queryStringParameters)}` : ''),
    dt: `Corgi Photo ${width} x ${height}${grayscale ? ' Grayscale' : ''}`,

    ua: headers['user-agent'],
    ul: (headers['accept-language'] || '').split(',').filter(n => n)[0],
    uip: (headers['x-forwarded-for'] || '').split(',').map(n => n.trim()).filter(n => n)[0],
  }))

  let basename = `images/${seed}__${width}x${height}`
  if (grayscale) {
    basename += '__g'
  }
  const Key = `${basename}.jpeg`

  try {
    await s3.headObject({ Bucket, Key }).promise()
  } catch (e) {
    // source
    const { Body } = await s3.getObject({ Bucket, Key: `sources/${seed}.jpeg` }).promise()
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

  await axiosPromise // :-)

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
  render,
}
