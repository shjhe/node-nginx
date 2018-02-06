# node-nginx
> This is the branch for `@node-nginx` 1.1.1
## 安装
``` sh
npm install -g @node-nginx
# or
yarn global add @node-nginx
```

## 使用
### 参数
```sh
node-nginx [-s] [stop/reload/quit] [-f] [configPath]
```
1. -s使用nginx默认的命令，含有stop/reload/quit
2. -f为自定义选择配置文件
> 本人的项目中，由于每个人都需要共用配置文件并使用独立的nginx去开发，因此添加此参数，选择是否使用最新的配置文件其启动nginx，也方便对nginx配置文件进行版本控制


### 常用命令
1. 常规启动
> 启动之前会先关闭已有的所有nginx进程，因此此命令也可为重启命令
```sh
node-nginx [-f configPath]
```

2. 重启
```sh
node-nginx -s reload [-f configPath]
```

3. 停止
```sh
node-nginx -s stop [-f configPath]
```

### 其他配置
1. 下载windows版nginx [http://nginx.org/en/download.html](http://nginx.org/en/download.html)
2. 配置nginx环境变量，目录级别到nginx.exe即可
## License
MIT