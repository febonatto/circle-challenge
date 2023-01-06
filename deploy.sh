set -e

npm run build

cd dist

echo > .nojekyll

git push -f git@github.com:febonatto/circle-challenge.git main:gh-pages

cd -
