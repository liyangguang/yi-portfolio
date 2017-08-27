console.log('Hi, I\'m Yi Nie. Welcome to my portfolio site!');

$(function(){
  $( window ).scroll(function() {
    var position = $(document).scrollTop();

    // for the header
    if (position > 300){
      $('.site-header').addClass('-collapse');
    }
    else {
      $('.site-header').removeClass('-collapse');
    }

    // for the home banner
    var areaHeight = $('.flying-bg').outerHeight();
    if (position < areaHeight){
      var ratio = position / areaHeight;
      animationEndState.forEach(function(data, index){
        var selector = '.shape-' + (index + 1);
        $(selector).css({
          'transform': 'translate(' + (data.x * ratio) + '%, ' + (data.y * ratio) + '%) scale(' + (((data.scale - 1) * ratio) + 1) + ') rotate(' + (data.rotate * ratio) + 'deg)',
          'opacity': (1 - ratio)
        });
      });
    }
  });

  // photo project tabs
  $('#ideation .tab').click(function(){
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $('#ideation .tab-content').hide();
      $('#ideation .tab-content-' + $(this).attr('data-tab')).show();
  });
  $('#competitor .tab').click(function(){
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $('#competitor .tab-content').hide();
      $('#competitor .tab-content-' + $(this).attr('data-tab')).show();
  });

  // prototype video view
  $('#side-page .mask').click(function(e){
    var videoURL = $(e.target).parent().find('source').attr('src');
    window.open(videoURL, '_blank');
  })

  // images view
  $('#side-page .side-project img').click(function(e){
    var imageURL = $(e.target).attr('src');
    $('.image-preview-container .image').css('background-image', 'url(' + imageURL + ')');
    console.log(imageURL, $('.image-preview-container .image'))
    $('.image-preview-container').fadeIn(500);
  })
  $('.image-preview-container').click(function(e){
    $('.image-preview-container').fadeOut(500);
  })
});

var animationEndState = [
  {x: -110, y: -200, scale: 3, rotate: 80},
  {x: 140, y: -200, scale: 3, rotate: 60},
  {x: -200, y: 300, scale: 3, rotate: -60},
  {x: 110, y: 200, scale: 3, rotate: 0},
  {x: -510, y: -300, scale: 2, rotate: 0},
  {x: -310, y: 0, scale: 2, rotate: 80},
  {x: 710, y: 200, scale: 2, rotate: -100},
  {x: 310, y: -100, scale: 2, rotate: -100}
];