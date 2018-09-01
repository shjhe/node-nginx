'use strict'
// nginx manage
var fs = require('fs')
var path = require('path')
var pkg = require('./package.json')
var iconv = require('iconv-lite')
var { spawn } = require('child_process');
var argv = require('yargs').argv
var globalConfig = {
  nginxPath: '',
  startType: argv.s,
  fileUrl: argv.f ? path.join(shell.pwd().stdout, argv.f) : ''
}
var nginxStateEnum = {
  START: {name: 'start', text: '启动'},
  STOP: {name: 'stop', text: '停止'},
  RELOAD: {name: 'reload', text: '重启'},
  QUIT: {name: 'quit', text: '退出'}
}
var CWD = process.cwd()

function Nginx () {
  this._version = pkg.version
}

var NginxPro = Nginx.prototype
NginxPro.start = function () {}