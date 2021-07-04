# Corgi photos

[https://corgi.photos](https://corgi.photos)

Lorem Picsum Service made of lovely corgi photos.


## Deployment

```bash
npm install
rm -rf node_modules/sharp
docker run --rm -v "$PWD":/var/task lambci/lambda:build-nodejs12.x npm ci
npm run deploy:prod
```
