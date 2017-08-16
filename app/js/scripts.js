'use strict';

console.log('Hi, I\'m Yi Nie. Welcome to my portfolio site!');

$(function () {
  var animationEndState = [{ x: -110, y: -200, scale: 3, rotate: 80 }, { x: 140, y: -200, scale: 3, rotate: 60 }, { x: -200, y: 300, scale: 3, rotate: -60 }, { x: 110, y: 200, scale: 3, rotate: 0 }, { x: -510, y: -300, scale: 2, rotate: 0 }, { x: -310, y: 0, scale: 2, rotate: 80 }, { x: 710, y: 200, scale: 2, rotate: -100 }, { x: 310, y: -100, scale: 2, rotate: -100 }];
  $(window).scroll(function () {
    var position = $(document).scrollTop();
    var areaHeight = $('.flying-bg').outerHeight();

    if (position < areaHeight) {
      var ratio = position / areaHeight;
      animationEndState.forEach(function (data, index) {
        var selector = '.shape-' + (index + 1);
        $(selector).css({
          'transform': 'translate(' + data.x * ratio + '%, ' + data.y * ratio + '%) scale(' + ((data.scale - 1) * ratio + 1) + ') rotate(' + data.rotate * ratio + 'deg)',
          'opacity': 1 - ratio
        });
      });
    }
  });
});
//# sourceMappingURL=scripts.js.map
