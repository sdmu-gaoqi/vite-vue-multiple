#!/bin/sh
set -e
ENV=$1

__build() {
    echo "安装依赖"
    yarn
    echo "开始打包"
    yarn build:$ENV
    echo "打包完成"
}

__main() {
__build
}

__main