$('footer li').click(function(){
  var index = $(this).index()
  $('section').hide().eq(index).fadeIn()
  $(this).addClass('active').siblings().removeClass('active')
})
var index = 0
loadData()

var timer
//加锁
// var isLoading = false
// function loadData(){
//   if(isLoading) return
//   isLoading = true
//   $('.loading').show()
//   $.ajax({
//     url: 'https://api.douban.com/v2/movie/top250',
//     type: 'GET',
//     data: {
//       start: index,
//       count: 20
//     },
//     dataType: 'jsonp'
//   }).done(function(ret){
//     console.log(ret)
//     createNode(ret)
//     index+=20
//     console.log(index)
//   }).fail(function(){
//     console.log('error')
//   }).always(function(){
//     isLoading = false
//     $('.loading').hide()
//   })
// }

 //函数节流
function loadData(){
  if(timer){
    clearTimeout(timer)
  }
  timer = setTimeout(function(){
    $('.loading').show()
    $.ajax({
    url: 'https://api.douban.com/v2/movie/top250',
    type: 'GET',
    data: {
      start: index,
      count: 20
    },
    dataType: 'jsonp'
  }).done(function(ret){
    console.log(ret)
    createNode(ret)
    index+=20
    console.log(index)
    }).fail(function(){
    console.log('error')
    })
  }, 500)
}

$('main').scroll(function(){
  if($('section').eq(0).height() - 50 <= $('main').scrollTop() + $('main').height()){
    loadData()
  }
})


function createNode(data){
  data.subjects.forEach(function(movie){
    var template = `<div class="item">
        <a href="#">
          <div class="cover">
            <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p480747492.webp" alt="cover">
          </div>
          <div class="detail">
            <h3></h3>
            <div><span class="score"></span>分 / <span class="collect"></span>收藏</div>
            <div><span class="year"></span> / <span class="type"></span></div>
            <div>导演：<span class="director"></span></div>
            <div>主演：<span class="actor"></span></div>
          </div>
        </a>
      </div>`
  var $node = $(template)
  $node.find('.cover img').attr('src', movie.images.medium)
  $node.find('.detail h3').text(movie.title)
  $node.find('.detail .score').text(movie.rating.average)
  $node.find('.detail .collect').text(movie.collect_count)
  $node.find('.detail .year').text(movie.year)
  $node.find('.detail .type').text(movie.genres.join(' / '))
  $node.find('.detail .director').text(function(){
      var dirArr = []
      movie.directors.forEach(function(dir){
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
  $('#top250').append($node)
  })
}