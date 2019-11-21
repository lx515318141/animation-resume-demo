function writeCode(prefix, code, fn) {
  let documentCode = document.querySelector("#code");
  let n = 0;
  let id = setInterval(() => {
    n += 1;
    documentCode.innerHTML = Prism.highlight(
      prefix + code.substring(0, n),
      Prism.languages.css
    );
    styleTag.innerHTML = prefix + code.substring(0, n);
    documentCode.scrollTop = documentCode.scrollHeight;
    if (n >= code.length) {
      window.clearInterval(id);
      fn.call();
    }
  }, 10);
}

function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector("#paper > .content");
  let n = 0;
  let id = setInterval(() => {
    n += 1;
    domPaper.innerHTML = markdown.substring(0, n);
    domPaper.scrollTop = domPaper.scrollHeight;
    if (n >= markdown.length) {
      window.clearInterval(id);
      fn.call();
    }
  }, 10);
}
// 异步，先写的代码后执行，这里writeCode主要目的是设闹钟，在设完闹钟后就一件return了，然后执行writeCode之后的代码
// 但是闹钟内的代码会在闹钟设好之后内设时间到达时才执行。

var result = `/*
*面试官你好，我是李响
*我将以动画的形式介绍我自己
*只有文字介绍太单调了
*我就用代码来介绍我吧
*首先是一些样式
*/
*{
  transition: all 0.5s;
}
html{
  background: rgb(222,222,222);
  font-size: 16px;
}
#code{
  border: 1px solid black;
  padding: 20px;
}

/*现在我要给你点颜色看看*/
.token.property{
    color: #905;
}
.token.function{
    color: #DD4A68;
}
.token.selector{
    color: #690;
}

/*来点3D效果*/
#code{
    transform: rotate(360deg);
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
`;
var result2 = `
    #paper{
      position: fixed;
      right: 0;
      width: 50%;
      height: 100%;
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
    }
    #paper > .content{
      background: white;
      height: 100%;
      width: 100%;
    }
`;
var md = `#自我介绍

我叫李响
1991年10月出生
毕业于成都理工大学
自学前端半年
希望应聘就前端开发岗位

#技能介绍

熟悉JavaScript、CSS

#项目介绍

1.简历
2.轮播
3.画板

#联系方式

电话：xxxxxxxxxxxx
邮箱：xxxxxxxxxxxx
QQ： xxxxxxxx
`
writeCode("", result, () => {
  createPaper(() => {
    writeCode(result, result2, () => {
      writeMarkdown(md)
    });
  });
});

function createPaper(fn) {
  var paper = document.createElement("div");
  paper.id = "paper";
  document.body.appendChild(paper);
  var content = document.createElement("pre");
  content.className = "content";
  paper.appendChild(content);

  fn.call();
}
