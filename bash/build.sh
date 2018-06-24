rm -rf dist
npm run build
cp .env dist/.env
cp -r node_modules/ dist/node_modules/
npm start