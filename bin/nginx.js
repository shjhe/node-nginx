#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var shell = require('shelljs')
var { exec } = require('child_process')
var argv = require('yargs').argv
var globalConfig = {
  nginxPath: '',
  startType: argv.s,
  fileUrl: argv.f ? path.join(shell.pwd().stdout, argv.f) : ''
}

var nginxFun = {
  start: function () {
    let child = exec('start nginx.exe', {async: true})
    child.on('exit', function (data) {
      shell.echo('>>>>>>nginx启动完成，请Ctrl+C退出，再次使用npm run dev启动项目')
    })
  },
  stop: function (callback) {
    exec('tasklist /fi "imagename eq nginx.exe"', function (code2, stout2) {
      let pids = stout2.match(/\d+(?=.+Console)/gm)
      if (pids) {
        shell.echo('>>>>>>正在关闭nginx')
        exec('taskkill /im nginx.exe -f', function () {
          shell.echo('>>>>>>关闭完成')
          callback && callback()
        })
      } else {
        // shell.echo('>>>>>>没有进程，无需关闭')
        callback && callback()
      }
    })
  },
  other: function (type) {
    shell.echo('>>>>>>' + nginxStateEnum[type.toUpperCase()].text + 'nginx任务完成')
    exec('nginx.exe -s ' + type)
  },
  conpyConf: function () {
    if (!globalConfig.fileUrl) {
      return
    }
    if (fs.existsSync(globalConfig.fileUrl) && globalConfig.fileUrl.indexOf('.conf') !== -1) {
      shell.echo('>>>>>>拷贝nginx配置文件')
      shell.cp(globalConfig.fileUrl, path.join(globalConfig.nginxPath, 'conf'))
    } else {
      shell.echo('>>>>>>配置文件出错，请确认路径或者文件')
      shell.exit(0)
    }
  },
  before: function (callback) {
    if (globalConfig.startType === nginxStateEnum.START || !globalConfig.startType) {
      nginxFun.stop(callback)
    } else {
      callback && callback()
    }
  }
}
var nginxStateEnum = {
  START: {name: 'start', text: '启动'},
  STOP: {name: 'stop', text: '停止'},
  RELOAD: {name: 'reload', text: '重启'},
  QUIT: {name: 'quit', text: '退出'}
}
nginxFun.before(function () {
  exec('where nginx', function (code, stout) {
    if (code) {
      shell.echo('>>>>>>请配置nginx的环境变量')
      shell.exit(0)
    }
    try {
      globalConfig.nginxPath = stout.match(/[\r\n]*(.+nginx.exe)/)[1]
      globalConfig.nginxPath = globalConfig.nginxPath.slice(0, globalConfig.nginxPath.lastIndexOf('\\'))
    } catch (e) {
      throw new Error(e)
      shell.echo('>>>>>>Nginx环境变量配置出错，请重新配置')
      shell.exit(0)
    }
    shell.cd(globalConfig.nginxPath)
    if (globalConfig.startType === nginxStateEnum.RELOAD.name) {
      nginxFun.conpyConf()
      nginxFun.other(globalConfig.startType)
    } else if (globalConfig.startType === nginxStateEnum.STOP.name || globalConfig.startType === nginxStateEnum.QUIT.name) {
      nginxFun.stop()
    } else {
      nginxFun.conpyConf()
      nginxFun.start()
    }
  })
})
