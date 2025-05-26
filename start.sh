#!/bin/bash

echo "正在启动简小历个人网站..."
echo ""
echo "请确保您已安装Python 3.x"
echo ""

# 检查Python是否安装
if command -v python3 &> /dev/null; then
    echo "使用 python3 启动服务器..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "使用 python 启动服务器..."
    python -m http.server 8000
else
    echo "错误: 未找到Python。请先安装Python 3.x"
    echo "访问 https://www.python.org/downloads/ 下载安装"
    exit 1
fi

echo ""
echo "服务器已启动，请在浏览器中访问: http://localhost:8000"
echo "按 Ctrl+C 停止服务器" 