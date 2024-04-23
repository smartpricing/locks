#/bin/bash
set -e

TAG=$(cat package.json | jq -r '.version')
NAME=$(cat package.json | jq -r '.name')
NPMRC=$(cat ~/.npmrc)
docker buildx build --platform linux/amd64 --secret id=npmrc,src=$HOME/.npmrc . -t eu.gcr.io/smartpricing-272315/$NAME:$TAG --build-arg NPMRC=$NPMRC
docker push eu.gcr.io/smartpricing-272315/$NAME:$TAG
