console.log('Hi, I\'m Yi Nie. Welcome to my portfolio site!');

$(function(){
  // header change when scroll
  $( window ).scroll(function() {
    var position = $(document).scrollTop();

    if (position > 100){
      $('.site-header').addClass('-collapse');
    }
    else {
      $('.site-header').removeClass('-collapse');
    }
  });

  $('.js-home-intro, .site-header').mousemove(function(event) {
    $('.bg-shape').each(function() {
      var offset = $(this).offset();
      if (Math.abs(event.pageX - offset.left) < 50 && Math.abs(event.pageY - offset.top) < 50) {
        $(this).addClass('-hover');
      }
      else {
        $(this).removeClass('-hover');
      }
    });
  });

  // photo project tabs
  $('#js-competitor-tabs .js-tab').click(function(){
      $(this).addClass('-active');
      $(this).siblings().removeClass('-active');
      $('#js-competitor-tabs .js-tab-content').hide();
      $('#js-competitor-tabs .js-tab-content').eq(parseInt($(this).attr('data-tab'))).show();
  });
  $('#js-ideation-tabs .js-tab').click(function(){
      $(this).addClass('-active');
      $(this).siblings().removeClass('-active');
      $('#js-ideation-tabs .js-tab-content').hide();
      $('#js-ideation-tabs .js-tab-content').eq(parseInt($(this).attr('data-tab'))).show();
  });

  // co-signer project - steps carousel
  function switchVideo(i){
    var index = parseInt(i);
    if (stepVideoTimer) {clearTimeout(stepVideoTimer);}
    $('.js-step-button').removeClass('-active');
    $('.step-video').removeClass('-active');
    $('.js-step-button[data-step='+index+']').addClass('-active');
    $('.step-video[data-step='+index+']').addClass('-active');
    $('.step-video[data-step='+index+']')[0].load();
    $('.step-video[data-step='+index+']')[0].play();
    var next = index + 1;
    if (next >= 4) next = 1;
    stepVideoTimer = setTimeout(function(){switchVideo(next);}, videoLength[index] * 1000);
  }
  if ($('.js-step-button').length){
    var videoLength = [undefined, 14, 24, 18]; // index start from 1
    var stepVideoTimer;
    $('.js-step-button').click(function(e){
      var index = e.currentTarget.dataset.step;
      switchVideo(index);
    });
    switchVideo(1);
  }

  // image/video view
  $('.js-img-preview').click(function(e){
    var $target = $(e.target);
    switch ($target.prop("tagName")) {
      case 'IMG':
        $('.image-preview-container .image').show();
        $('.image-preview-container video').hide();
        var imageURL = $target.attr('src');
        $('.image-preview-container .image').css('background-image', 'url(' + imageURL + ')');
        $('.image-preview-container').fadeIn(500);
        break;
      case 'VIDEO':
        $('.image-preview-container .image').hide();
        $('.image-preview-container video').show();
        var videoURL = $target.find('source').attr('src');
        $('.image-preview-container video').attr('src', videoURL);
        $('.image-preview-container').fadeIn(500);
    }
  });
  $('.image-preview-container').click(function(e){
    $('.image-preview-container').fadeOut(500);
  });

  // password
  $('.password form').submit(function(e){
    e.preventDefault();
    if ($('.password input').val() === 'yi-ux'){
      $('.password button').removeClass('-wrong');
      $('.password').slideUp();
      $('.password-protected').slideDown();
    }
    else{
      $('.password button').addClass('-wrong');
    }
  });
});
