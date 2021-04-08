npm run build

cd public

git init
git add -A
git commit -m 'deploy'

git push -f git@gitee.com:monk_wulv/bitcode.git master

cd ../
rm -rf public
