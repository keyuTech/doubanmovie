$('footer li').click(function(){
  var index = $(this).index()
  $('section').hide().eq(index).fadeIn()
  $(this).addClass('active').siblings().removeClass('active')
})

$.ajax({
  url: 'http://api.douban.com/v2/movie/top250',
  type: 'GET',
  data: {
    start: 0,
    count: 20
  },
  dataType: 'jsonp'
}).done(function(ret){
  console.log(ret)
  createNode(ret)
}).fail(function(){
  console.log('error')
})

function createNode(data){
  data.subjects.forEach(function(movie){
    var template = `<div class="item">
    <a href="#">
    <div class="cover">
    <img src="" alt="">
        </div>
    <div class="detail">
    <h2></h2>
    <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
    <div class="extra"><span class="year"></span> / <span class="type"></span></div>
    <div class="extra">导演: <span class="director"></span></div>
    <div class="extra">主演: <span class="actor"></span></div>
  </div>
  </a>
  </div>`
    console.log(template)
  var $node = $(template)
  $node.find('.cover img').attr('src', movie.images.src)
  $node.find('.detail h3').text(movie.title)
  $node.find('.detail .score').text(movie.rating.average)
  $node.find('.detail .collect').text(movie.collect_count)
  $node.find('.detail .year').text(movie.year)
  $node.find('.detail .type').text(movie.genres.join(' / '))
  $node.find('.detail .directoe').text(function(){
      var dirArr = []
      movie.director.forEach(function(dir){
        dirArr.push(dir.name)
      })
      return dirArr.join(' / ')
    })
  $node.find('.detail .actor').text(function(){
      var actorArr = []
      movie.casts.forEach(function(actor){
        actorArr.push(actor.name)
      })
      return actorArr.join(' / ')
    })
  })
  $('section').eq(0).append($node)
}