# 生成静态文件
npm run build

cd docs/

echo "webgpu.info" > CNAME

git add -A
git commit -m "deploy"

git push -f git@github.com:<3D-for-Fun>/<3D-for-Fun>.github.io.git main
