(function ($) {
  //
  // Search ------------
  var $searchWrap = $('.search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function () {
    isSearchAnim = true;
  };

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('.nav-item-search').on('click', function () {
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.local-search-input').focus();
    });
  });

  $(document).mouseup(function (e) {
    var _con = $('.local-search');
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
      $searchWrap.removeClass('on');
    }
  });

  //
  // 移动设备侦测
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  //
  // 建议在移动端不初始化，其实 /search.xml 文件还挺大的，
  if ($('.local-search').size() && !isMobile.any()) {
    $.getScript('/js/search.js', function () {
      searchFunc("/search.xml", 'local-search-input', 'local-search-result');
    });
  }

  //
  // Share
  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function (e) {
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      window.doCopyText = function(e){
        let input = document.getElementById('urlInput')
        var tag = document.createElement('input');
        tag.setAttribute('id', 'cp_hgz_input');
        tag.value = input.value;
        document.getElementsByTagName('body')[0].appendChild(tag);
        document.getElementById('cp_hgz_input').select();
        document.execCommand('copy');
        document.getElementById('cp_hgz_input').remove();

        let div = document.createElement('div');
        div.innerHTML = '复制成功'
        div.classList.add('message-log')
        div.setAttribute('id', 'logBox');
        document.getElementsByTagName('body')[0].appendChild(div);
        document.getElementById(id).remove();
        setTimeout(()=>{
          document.getElementById('logBox').remove();
        },3000)
      }
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input id="urlInput" class="article-share-input" value="' + url + '">',
          '<div class="article-share-links" onclick="doCopyText()">',
            '点击复制链接',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);
      $('body').append(box);
    }
    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function () {
    $(this).select();
  }).on('click', '.article-share-box-link', function (e) {
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  //
  $(document).ready(function ($) {
    $('.anchor').click(function (event) {
      event.preventDefault();
      $('html,body').animate({scrollTop: $(this.hash).offset().top}, 'smooth');
    });
  });

  // To top
  (function($) {
    // When to show the scroll link
    // higher number = scroll link appears further down the page
    var upperLimit = 1000;

    // Our scroll link element
    var scrollElem = $('#totop');

    // Scroll to top speed
    var scrollSpeed = 1600;

    // Show and hide the scroll to top link based on scroll position
    scrollElem.hide();
    $(window).scroll(function () {
      var scrollTop = $(document).scrollTop();
      if ( scrollTop > upperLimit ) {
        $(scrollElem).stop().fadeTo(300, 1); // fade back in
      }else{
        $(scrollElem).stop().fadeTo(300, 0); // fade out
      }
      var scrollHeight = $(document).height();
      var windowHeight = $(this).height();
      if (scrollTop + windowHeight >= scrollHeight-84) {  //滚动到底部执行事件
        $("#footer").show()
      }else{
        $("#footer").hide()
      }
    });

    // Scroll to top animation on click
    $(scrollElem).click(function(){
      $('html, body').animate({scrollTop:0}, scrollSpeed); return false;
    });
  })(jQuery);

  // Mobile nav
  var $content = $('.content'),
    $sidebar = $('.sidebar'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  $('.navbar-toggle').on('click', function () {
    if (isMobileNavAnim) return;
    startMobileNavAnim();
    $content.toggleClass('on');
    $sidebar.toggleClass('on');
    stopMobileNavAnim();
  });

  $($content).on('click', function () {
    if (isMobileNavAnim || !$content.hasClass('on')) return;
    $content.removeClass('on');
    $sidebar.removeClass('on');
  });

})(jQuery);
