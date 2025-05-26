@echo off
echo 正在启动简小历个人网站...
echo.
echo 请确保您已安装Python 3.x
echo.
echo 启动本地服务器...
python -m http.server 8000
echo.
echo 如果上述命令失败，请尝试：
echo py -m http.server 8000
echo.
pause 