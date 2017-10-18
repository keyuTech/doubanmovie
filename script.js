// $('footer li').click(function(){
//   var index = $(this).index()
//   $('section').hide().eq(index).fadeIn()
//   $(this).addClass('active').siblings().removeClass('active')
// })
// var index = 0
// loadData()

// var timer
// //加锁
// // var isLoading = false
// // function loadData(){
// //   if(isLoading) return
// //   isLoading = true
// //   $('.loading').show()
// //   $.ajax({
// //     url: 'https://api.douban.com/v2/movie/top250',
// //     type: 'GET',
// //     data: {
// //       start: index,
// //       count: 20
// //     },
// //     dataType: 'jsonp'
// //   }).done(function(ret){
// //     console.log(ret)
// //     createNode(ret)
// //     index+=20
// //     console.log(index)
// //   }).fail(function(){
// //     console.log('error')
// //   }).always(function(){
// //     isLoading = false
// //     $('.loading').hide()
// //   })
// // }

//  //函数节流
// function loadData(){
//   if(timer){
//     clearTimeout(timer)
//   }
//   timer = setTimeout(function(){
//     $('.loading').show()
//     $.ajax({
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
//     }).fail(function(){
//     console.log('error')
//     })
//   }, 500)
// }

// $('main').scroll(function(){
//   if($('section').eq(0).height() - 50 <= $('main').scrollTop() + $('main').height()){
//     loadData()
//   }
// })


// function createNode(data){
//   data.subjects.forEach(function(movie){
//     var template = `<div class="item">
//         <a href="#">
//           <div class="cover">
//             <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p480747492.webp" alt="cover">
//           </div>
//           <div class="detail">
//             <h3></h3>
//             <div><span class="score"></span>分 / <span class="collect"></span>收藏</div>
//             <div><span class="year"></span> / <span class="type"></span></div>
//             <div>导演：<span class="director"></span></div>
//             <div>主演：<span class="actor"></span></div>
//           </div>
//         </a>
//       </div>`
//   var $node = $(template)
//   $node.find('a').attr('href', movie.alt)
//   $node.find('.cover img').attr('src', movie.images.medium)
//   $node.find('.detail h3').text(movie.title)
//   $node.find('.detail .score').text(movie.rating.average)
//   $node.find('.detail .collect').text(movie.collect_count)
//   $node.find('.detail .year').text(movie.year)
//   $node.find('.detail .type').text(movie.genres.join(' / '))
//   $node.find('.detail .director').text(function(){
//       var dirArr = []
//       movie.directors.forEach(function(dir){
//         dirArr.push(dir.name)
//       })
//       return dirArr.join(' / ')
//     })
//   $node.find('.detail .actor').text(function(){
//       var actorArr = []
//       movie.casts.forEach(function(actor){
//         actorArr.push(actor.name)
//       })
//       return actorArr.join(' / ')
//     })
//   $('#top250').append($node)
//   })
// }




//重构
var handler = {
  createNode: function(movie){
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
    $node.find('a').attr('href', movie.alt)
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
    return $node
  }
}




var top250 = {
  init: function(){
    this.$container = $('.top250')
    this.index = 0
    this.isFinish = false
    this.start()
    this.timer
  },
  start: function(){
    var me = this
    this.getData(function(data){
      me.render(data)
    })
  },
  event: function(){
    var me = this
    if(!me.isFinish && me.isToEnd){
      me.start()
    }
  },
  getData: function(callback){
    var me = this
    if(me.timer){
      clearTimeout(me.timer)
    }
    me.timer = setTimeout(function(){
      me.$container.find('.loading').show()
      $.ajax({
        url: 'https://api.douban.com/v2/movie/top250',
        type: 'GET',
        data: {
          start: me.index,
          count: 20
        },
        dataType: 'jsonp'
      }).done(function(ret){
        console.log(ret)
        me.index+=20
        if(me.index >= ret.total){
          me.isFinish = true
        }
        callback&&callback(ret)
      }).fail(function(){
        console.log('error')
      })
    }, 500)
  },
  render: function(data){
    var me = this
    data.subjects.forEach(function(movie){
      me.$container.find('#top250').append(handler.createNode(movie))
    })
  },
  isToEnd: function(){
    var me = this
    return me.$container.find('#top250').height() - 20 <= me.$container.height() + me.$container.scrollTop
  }
}





var app = {
  init: function(){
    this.$tabs = $('footer li')
    this.$panels = $('section')
    this.event()
    top250.init()
  },
  event: function(){
    var me = this
    this.$tabs.on('click', function(){
      $(this).addClass('active').siblings().removeClass('active')
      me.$panels.eq($(this).index()).fadeIn.siblings().hide()
    })
  }
  
}
app.init()