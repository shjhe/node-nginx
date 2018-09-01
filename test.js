var iconv = require('iconv-lite')
var {
  spawn
} = require('child_process')
var CWD;
CWD = process.cwd()
console.log(CWD)
process.chdir('D:\\"Program Files"\\nginx-1.13.6')
CWD = process.cwd()
console.log(CWD)
var nginx = spawn('cd', ['/test'], {shell: true})

nginx.stdout.on('data', (data) => {
  console.log(data.toString());
  CWD = process.cwd()
  console.log(CWD)
});

nginx.stderr.on('data', (data) => {
  console.log(iconv.decode(data, 'gbk'))
  // console.log(Uint8ArrayToString(data))
  // var codingArr = ['ascii', 'utf8', 'utf16le', 'ucs2', 'base64', 'latin1', 'binary', 'hex']
  // codingArr.forEach(item => {
  //   let result = data.isEncoding(item)
  //   console.log(`is ${item} ==== ${result}`)
  // })
  // console.log(data, data.toString('ucs2'))
  // console.log(`nginx stderr: ${data}`);
});

nginx.on('close', (code) => {
  if (code !== 0) {
    console.log(`nginx process exited with code ${code}`);
  }
});
