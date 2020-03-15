# Corgi photos

[https://corgi.photos](https://corgi.photos)

Lorem Picsum Service made of lovely corgi photos.


## Deployment

```bash
npm install
rm -rf node_modules/sharp
npm install --arch=x64 --platform=linux --target=12.0.0 sharp

npx sls deploy --stage prod
```
