# 豆豆豆瓣电影
by @wky0615
## 移动端豆瓣电影
### 一、简介
本项目要实现移动端仿豆瓣电影的单页应用，利用豆瓣提供的豆瓣电影API实现以下功能：
1. 展示豆瓣评分排名前250的电影
2. 展示北美电影排行榜
3. 提供搜索电影功能，将搜索到的相关的电影展示出来
4. 页面上所展示的电影条目都可以通过点击跳转到豆瓣电影的详细介绍
### 二、设计思路
页面主要分为两大部分：展示部分以及底部的可点击切换（footer）部分，其中展示部分分为三个section，分别展示Top250、北美排行以及搜索电影，在用户点击底部（footer）部分的不同部分时会切换到相应的页面。  
<img src="https://raw.githubusercontent.com/wky0615/MarkdownPhotos/master/doubanmovie/%E9%A1%B5%E9%9D%A2.png" width="50%">   
首先，要实现点击footer部分的各个icon实现section的切换，通过绑定'click'事件可以轻松实现。  
其次，要实现Top250部分功能，通过AJAX获取豆瓣电影API提供的数据，获取数据后利用jQuery操作DOM将数据拼接后在页面上展示，需要注意的是250条数据并非一次性全部加载完成，考虑到流畅性，每次请求获取的信息条目为20条。  
<img src="https://raw.githubusercontent.com/wky0615/MarkdownPhotos/master/doubanmovie/Top250-1.png" width="50%">   
![Top250-1](https://raw.githubusercontent.com/wky0615/MarkdownPhotos/master/doubanmovie/Top250-1.png)  
数据格式如上图，图Top250-1展示前20条数据   
<img src="https://raw.githubusercontent.com/wky0615/MarkdownPhotos/master/doubanmovie/Top250-2.png" width="50%">  
![Top250-2](https://raw.githubusercontent.com/wky0615/MarkdownPhotos/master/doubanmovie/Top250-2.png)   
图Top250-2展示具体电影条目中所包含的信息，包括导演、主演、电影海报及评分等    
随后，实现北美电影排行的展示与Top250部分思路及方法大同小异，只不过由于提供的电影条目数据不多，请求数据时一次性获取全部条目。  
最后，实现搜索电影功能，此部分需要将用户在 ``` <input> ```标签中输入的内容作为AJAX请求中的data传递，随后将获取的数据拼接后放置在页面上。 
### 三、实现过程
