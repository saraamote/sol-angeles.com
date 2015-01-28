(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(document).foundation();

  jQuery(function($) {
    var FullscreenSlider, HEADER, PAGE, VideoModal, addToCart, addToCartFail, addToCartPass, cart_dropdown_timer, current_window, fadeOutCartDropdown, first_article_img, fullscreen_slider, imgZoom, instagramFeed, isFirefox, log, mainMenu, mediaQueries, mobileMenu, mq_large, mq_medium, mq_small, openMobileModal, page_content, photos, pinterest_button, positions, productModal, recentCartItemPopUp, retinaLogo, searchAndAccount, selectCallback, slideDownCartDropdown, smallPromos, startTimer, stickyFooter, stopResetTimer, thumbs, toggleCartDropdown, updateActiveImg, validateSize;
    PAGE = $('body');
    HEADER = $('.main-header');
    mq_small = 768;
    mq_medium = 1280;
    mq_large = 1440;
    log = function(value) {
      if (typeof console !== "undefined") {
        return console.log(value);
      }
    };
    stickyFooter = function() {
      var total_content_height;
      total_content_height = $('.main-header').outerHeight() + $('.main-content').outerHeight() + $('.main-footer').outerHeight();
      if ($(window).outerHeight() > total_content_height) {
        return $('.main-content').css({
          'min-height': $(window).outerHeight() - $('.main-header').outerHeight() - $('.main-footer').outerHeight()
        });
      }
    };
    stickyFooter();
    $(window).resize(function() {
      return stickyFooter();
    });
    if (general_external_links_enabled) {
      $('a[href^="http"]').not('a[href^="' + shop_url + '"]').attr('target', '_blank');
    }
    retinaLogo = function() {
      if ($('.main-header .title img').length && window.devicePixelRatio >= 2) {
        if ($('.main-header .title img').length) {
          return $('.main-header .title img').imagesLoaded(function() {
            $(this).width($(this).naturalWidth());
            return $(this).attr('src', $(this).attr('data-retina'));
          });
        }
      }
    };
    retinaLogo();
    searchAndAccount = function() {
      $('.searchbar-open').click(function() {
        $(this).closest('.menu').fadeOut(100, function() {
          $('.main-header .searchbar-container').fadeIn(200);
          return $('.main-header .searchbar-container .search-box').focus();
        });
        return false;
      });
      $('.searchbar-close').click(function() {
        $('.main-header .searchbar-container').fadeOut(100, function() {
          return $('.search-account .menu').fadeIn(200);
        });
        return false;
      });
      $('.account-open').click(function() {
        $(this).closest('.menu').fadeOut(100, function() {
          return $('.account-container').fadeIn(200);
        });
        return false;
      });
      return $('.account-close').click(function() {
        $('.account-container').fadeOut(100, function() {
          return $('.search-account .menu').fadeIn(200);
        });
        return false;
      });
    };
    searchAndAccount();
    mainMenu = function() {
      var dropdown_panel, main_header, main_menu_dropdown_timer, slideUpPanel, startTimer, stopResetTimer;
      dropdown_panel = $(".main-menu-dropdown-panel .row");
      main_header = $(".template-index .main-header");
      HEADER.find(".main-menu .widescreen .dropdown > a").click(function() {
        var autoHeight, curHeight, dropdown, sub_nav;
        dropdown = $(this).parent();
        sub_nav = dropdown.find(".sub-nav .columns");
        if (PAGE.hasClass('template-index') && PAGE.hasClass('transparent-menu') && Modernizr.touch) {
          if ($('.main-header').hasClass('dropdown-open')) {
            if (dropdown.hasClass("active")) {
              startTimer();
            }
          } else {
            $('.main-header .bg').fadeIn();
          }
        }
        if (dropdown.hasClass("active")) {
          slideUpPanel();
        } else if ($('.main-header').hasClass('dropdown-open')) {
          dropdown_panel.find(".columns").animate({
            opacity: 0
          }, 200);
          dropdown_panel.find('.columns').remove();
          HEADER.find(".main-menu .dropdown").removeClass('active');
          dropdown.addClass("active");
          sub_nav.clone().appendTo(".main-menu-dropdown-panel .row");
          dropdown_panel.find(".columns").delay(200).animate({
            opacity: 1
          }, 200);
          curHeight = dropdown_panel.height();
          autoHeight = dropdown_panel.css('height', 'auto').outerHeight();
          dropdown_panel.height(curHeight).animate({
            height: autoHeight
          }, 400);
        } else {
          dropdown_panel.find('.columns').remove();
          $('.main-header').addClass('dropdown-open');
          dropdown.addClass("active");
          sub_nav.clone().appendTo(".main-menu-dropdown-panel .row");
          dropdown_panel.slideDown(400, function() {
            return dropdown_panel.css("height", dropdown_panel.outerHeight());
          });
          dropdown_panel.find(".columns").delay(200).animate({
            opacity: 1
          }, 200);
        }
        return false;
      });
      slideUpPanel = function() {
        $('.main-header').removeClass('dropdown-open');
        dropdown_panel.find(".columns").animate({
          opacity: 0
        }, 200);
        return dropdown_panel.delay(200).slideUp(function() {
          HEADER.find(".main-menu .dropdown").removeClass('active');
          dropdown_panel.find('.columns').remove();
          return dropdown_panel.css('height', 'auto');
        });
      };
      main_menu_dropdown_timer = '';
      if (Modernizr.touch === false) {
        $('.main-header').mouseenter(function() {
          if (PAGE.hasClass('template-index') && PAGE.hasClass('transparent-menu')) {
            $('.main-header .bg').fadeIn();
          }
          return stopResetTimer();
        }).mouseleave(function() {
          if ($('.main-header').hasClass('dropdown-open')) {
            return startTimer();
          } else {
            if (PAGE.hasClass('template-index') && main_header.css("position") === "absolute") {
              return $('.main-header .bg').stop(true, true).fadeOut();
            }
          }
        });
      }
      startTimer = function() {
        return main_menu_dropdown_timer = setTimeout((function() {
          slideUpPanel();
          if (PAGE.hasClass('template-index') && PAGE.hasClass('transparent-menu')) {
            return $('.main-header .bg').delay(300).fadeOut();
          }
        }), 500);
      };
      return stopResetTimer = function() {
        return clearTimeout(main_menu_dropdown_timer);
      };
    };
    mainMenu();
    mobileMenu = function() {
      var dropdown_links, mobile_menu, mobile_menu_link;
      mobile_menu_link = $('.mobile-tools .menu');
      mobile_menu = $('.mobile-menu');
      dropdown_links = mobile_menu.find("a.dropdown-link");
      mobile_menu_link.click(function() {
        mobile_menu.toggle();
        return false;
      });
      return dropdown_links.click(function() {
        var sub_menu;
        sub_menu = $(this).closest('li').find('.sub-nav:eq(0)');
        sub_menu.slideToggle();
        $(this).find('.glyph.plus').toggle();
        $(this).find('.glyph.minus').toggle();
        return false;
      });
    };
    mobileMenu();
    instagramFeed = function() {
      var client_id, feed_url, getImages, items_to_load, username;
      client_id = home_widget_instagram_client_id;
      if (client_id.length < 1) {
        client_id = 'b9250ffaa750473497707f1f507165dd';
      }
      username = $('.instagram-widget').attr('data-username');
      if (username.length < 1) {
        return;
      }
      feed_url = 'https://api.instagram.com/v1/users/296922654/media/recent/?client_id=' + client_id;
      items_to_load = 5;
      if (!home_widget_twitter_enabled && !home_widget_blog_enabled) {
        items_to_load += 6;
        $('.instagram-widget .items').addClass('wide');
      }
      $.ajax({
        dataType: "jsonp",
        url: 'https://api.instagram.com/v1/users/search?q=' + username + '&client_id=' + client_id,
        success: function(response) {}
      }).done(function(data) {
        var user, user_id, _i, _len, _ref;
        user_id = '';
        _ref = data.data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          user = _ref[_i];
          if (username === user.username) {
            user_id = user.id;
            break;
          }
        }
        return getImages(user_id);
      });
      return getImages = function(user_id) {
        return $.ajax({
          dataType: "jsonp",
          url: 'https://api.instagram.com/v1/users/' + user_id + '/media/recent/?client_id=' + client_id,
          success: function(response) {}
        }).done(function(data) {
          var i, _i, _results;
          _results = [];
          for (i = _i = 0; 0 <= items_to_load ? _i <= items_to_load : _i >= items_to_load; i = 0 <= items_to_load ? ++_i : --_i) {
            _results.push($('.instagram-widget .items').append('<a class="item" target="_blank" href="' + data.data[i].link + '"><img src="' + data.data[i].images.low_resolution.url + '" /></a>'));
          }
          return _results;
        });
      };
    };
    VideoModal = (function() {
      function VideoModal(video) {
        this.createIframe = __bind(this.createIframe, this);
        this.extractVideoId = __bind(this.extractVideoId, this);
        this.extractVideoType = __bind(this.extractVideoType, this);
        this.eventListeners = __bind(this.eventListeners, this);
        this.centerPosition = __bind(this.centerPosition, this);
        this.close = __bind(this.close, this);
        this.open = __bind(this.open, this);
        this.opened = false;
        this.video = video;
        this.modal = $('.video.modal');
        this.player_button = video.find('.player-button');
        this.src_url = video.find('.play-button').attr('href');
        this.type = this.extractVideoType();
        this.id = this.extractVideoId();
        this.iframe = this.createIframe();
        this.caption = video.find('.caption');
      }

      VideoModal.prototype.open = function() {
        this.opened = true;
        this.modal.find(".flex-video").append(this.iframe);
        if (this.caption.length > 0) {
          this.modal.find(".caption").append(this.caption.html());
          this.modal.addClass("wide");
        } else {
          this.modal.find(".player").removeClass('large-8');
          this.modal.find('.caption').hide();
          this.modal.removeClass("wide");
        }
        this.player_button.hide();
        $('.modal-mask').show();
        this.modal.find('.close').show();
        this.modal.fadeIn();
        this.centerPosition();
        $(".modal").fadeIn(0);
        return this.eventListeners();
      };

      VideoModal.prototype.close = function() {
        this.opened = false;
        this.modal.find(".flex-video").empty();
        this.modal.find(".caption").empty();
        this.modal.hide();
        $('.modal-mask').fadeOut();
        if (this.caption.length === 0) {
          this.modal.find(".player").addClass('large-8');
          return this.modal.find('.caption').show();
        }
      };

      VideoModal.prototype.centerPosition = function() {
        if ($(window).height() < this.modal.outerHeight()) {
          return this.modal.css({
            'position': 'absolute',
            'top': '30px',
            'margin-top': 0,
            'margin-left': -(this.modal.outerWidth() / 2)
          });
        } else {
          return this.modal.css({
            'position': 'fixed',
            'top': '50%',
            'margin-top': -(this.modal.outerHeight() / 2),
            'margin-left': -(this.modal.outerWidth() / 2)
          });
        }
      };

      VideoModal.prototype.eventListeners = function() {
        var modal;
        modal = this;
        this.modal.find('.close').on('click', function() {
          return modal.close();
        });
        $(window).resize(function() {
          return modal.centerPosition();
        });
        $(document).keydown(function(e) {
          if (modal.opened) {
            if (e.keyCode === 27) {
              return modal.close();
            }
          }
        });
        $('.modal-mask').on('click', function() {
          return modal.close();
        });
        return this.player_button.on('click', function() {
          return false;
        });
      };

      VideoModal.prototype.extractVideoType = function() {
        var matches, re;
        re = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i;
        matches = re.exec(this.src_url);
        if (matches) {
          return 'youtube';
        } else {
          re = /^.*(vimeo)\.com\/(?:watch\?v=)?(.*?)(?:\z|$|&)/;
          matches = re.exec(this.src_url);
          if (matches) {
            return 'vimeo';
          }
        }
        return false;
      };

      VideoModal.prototype.extractVideoId = function() {
        var match, regExp;
        if (this.type === 'youtube') {
          regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          match = this.src_url.match(regExp);
          if (match && match[2].length === 11) {
            return match[2];
          }
        } else if (this.type === "vimeo") {
          regExp = /^.*(vimeo)\.com\/(?:watch\?v=)?(.*?)(?:\z|$|&)/;
          match = this.src_url.match(regExp);
          if (match) {
            return match[2];
          }
        }
      };

      VideoModal.prototype.createIframe = function() {
        if (this.type === "youtube") {
          return '<iframe  src="//www.youtube.com/embed/' + this.id + '?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>';
        } else if (this.type === "vimeo") {
          return '<iframe src="//player.vimeo.com/video/' + this.id + '?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1?" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        }
      };

      return VideoModal;

    })();
    productModal = function() {
      var changeModal, closeModal, modal, modal_controls, modal_init, modal_length, modal_open, openModal, resizeModal;
      modal = $('.modal');
      if ($('.modal').length && product_modal_enabled) {
        modal_length = $("article .photos .photo").length;
        modal_init = false;
        modal_open = false;
        modal.find('.loading').spin('small');
        if (modal_length > 1) {
          modal.addClass("with-nav");
          modal_controls = modal.find('.glyph');
        } else {
          modal_controls = modal.find('.close');
        }
        resizeModal = function() {
          var active_photo, height_ratio, image_height, image_width, width_ratio, window_height, window_width;
          active_photo = modal.find('.photo.active');
          image_width = active_photo.naturalWidth();
          image_height = active_photo.naturalHeight();
          window_width = $(window).width();
          window_height = $(window).height();
          width_ratio = image_width / window_width;
          height_ratio = image_height / window_height;
          if (width_ratio > height_ratio && width_ratio > .90) {
            image_width = image_width * .90 / width_ratio;
            image_height = image_height * .90 / width_ratio;
          } else if (width_ratio < height_ratio && height_ratio > .90) {
            image_width = image_width * .90 / height_ratio;
            image_height = image_height * .90 / height_ratio;
          }
          modal.css({
            'width': image_width,
            'height': image_height,
            'margin-top': -(image_height / 2),
            'margin-left': -(image_width / 2)
          });
          return active_photo.css({
            'height': image_height
          });
        };
        openModal = function(index) {
          var active_photo;
          modal_open = true;
          if (!modal_init) {
            $("article .photos .photo").each(function() {
              return modal.find(".slides").append($('<img />').attr('src', $(this).attr('href')).addClass('photo'));
            });
            modal_init = true;
          }
          $('.modal-mask').show();
          modal.fadeIn();
          active_photo = $(".modal img").eq(index);
          active_photo.addClass('active');
          return modal.find(".photo.active").imagesLoaded(function() {
            modal.find(".loading").hide();
            modal_controls.show();
            modal.find(".slides").show();
            return resizeModal();
          });
        };
        $('.photos .container').on('click', function() {
          var index;
          if (current_window === 'small') {
            return false;
          }
          index = $(this).find('.photo.active').index();
          return openModal(index);
        });
        closeModal = function() {
          modal_open = false;
          modal.find(".photo.active").removeClass("active");
          modal.css('display', 'none');
          return $('.modal-mask').fadeOut();
        };
        modal.find('.close').on('click', function() {
          return closeModal();
        });
        $('.modal-mask').on('click', function() {
          return closeModal();
        });
        changeModal = function(direction) {
          var active_index, active_photo, new_index, photo_length;
          active_photo = modal.find('.photo.active');
          active_index = modal.find('.photo.active').index();
          photo_length = modal.find('.photo').length;
          if (direction === 'prev') {
            if (active_index === 0) {
              new_index = photo_length - 1;
            } else {
              new_index = active_index - 1;
            }
          }
          if (direction === 'next') {
            if (active_index === photo_length - 1) {
              new_index = 0;
            } else {
              new_index = active_index + 1;
            }
          }
          active_photo.removeClass('active');
          modal_controls.hide();
          modal.find(".loading").delay(50).fadeIn(0);
          return modal.find('.photo').eq(new_index).imagesLoaded(function() {
            modal.find(".loading").stop(true, true).fadeOut(0);
            modal_controls.show();
            modal.find('.photo').eq(new_index).addClass('active');
            return resizeModal();
          });
        };
        modal.find('.prev').on('click', function() {
          return changeModal('prev');
        });
        modal.find('.next').on('click', function() {
          return changeModal('next');
        });
        modal.find('.slides').on('click', function() {
          return changeModal('next');
        });
        $(document).keydown(function(e) {
          if (modal_open) {
            if (e.keyCode === 37 && modal_length > 1) {
              changeModal('prev');
            }
            if (e.keyCode === 39 && modal_length > 1) {
              changeModal('next');
            }
            if (e.keyCode === 27) {
              return closeModal();
            }
          }
        });
        if (modal_init) {
          return $(window).resize(function() {
            return resizeModal();
          });
        }
      }
    };
    $('.accordion.headings').each(function() {
      return $(this).add($(this).next('.accordion.content')).wrapAll("<div class='accordion-wrapper'/>");
    });
    $('.accordion.headings li').wrapInner('<div class="trigger"></div>');
    $('.accordion.headings li .trigger').append('<div class="bg"></div>');
    $('.accordion-wrapper').each(function() {
      var accordion_content, accordion_heading;
      accordion_heading = $(this).find('.accordion.headings > li');
      accordion_content = $(this).find('.accordion.content > li');
      accordion_heading.first().addClass('active');
      accordion_content.each(function(index) {
        var content;
        content = $('<div class="content">' + $(this).html() + '</div>');
        return content.appendTo(accordion_heading.eq(index));
      });
      accordion_content.remove();
      $(this).find('.content').first().show();
      return $(this).find('.trigger').on("click", function() {
        var panels, this_panel;
        panels = $(this).closest(".accordion").find('.content');
        this_panel = $(this).closest("li").find(".content");
        panels.not(this_panel).slideUp(200);
        this_panel.slideDown(200, function() {
          if (general_scroll_to_active_item) {
            return $('html, body').animate({
              scrollTop: this_panel.offset().top - 100
            });
          }
        });
        $(this).closest(".accordion").find("li").removeClass("active");
        return $(this).closest("li").addClass("active");
      });
    });
    $('.tabs-horizontal.headings').each(function() {
      return $(this).add($(this).next('.tabs.content')).wrapAll("<div class='tabs-wrapper horizontal'/>");
    });
    $('.tabs-horizontal.headings li').wrapInner('<div class="trigger"></div>');
    $('.tabs-horizontal.headings li .trigger').append('<div class="bg"></div>');
    $('.tabs-wrapper.horizontal').each(function() {
      var tab_content, tab_headings;
      tab_headings = $(this).find('.headings > li');
      tab_content = $(this).find('.tabs.content > li');
      tab_content.first().addClass('active');
      tab_headings.first().addClass('active');
      return tab_headings.on('click', function() {
        tab_headings.removeClass('active');
        tab_content.removeClass('active');
        $(this).addClass('active');
        return tab_content.eq($(this).index()).addClass('active');
      });
    });
    $('.tabs-vertical.headings').each(function() {
      return $(this).add($(this).next('.tabs.content')).wrapAll("<div class='tabs-wrapper vertical'/>");
    });
    $('.tabs-vertical.headings li').wrapInner('<div class="trigger"></div>');
    $('.tabs-vertical.headings li .trigger').append('<div class="bg"></div>');
    $('.tabs-wrapper.vertical').each(function() {
      var tab_content, tab_headings, tab_wrapper;
      tab_wrapper = $(this);
      tab_headings = $(this).find('.headings > li');
      tab_content = $(this).find('.tabs.content > li');
      tab_content.first().addClass('active');
      tab_headings.first().addClass('active');
      return tab_headings.on('click', function() {
        tab_headings.removeClass('active');
        tab_content.removeClass('active');
        $(this).addClass('active');
        tab_content.eq($(this).index()).addClass('active');
        if (general_scroll_to_active_item) {
          if (matchMedia('only screen and (min-width: ' + mq_small + 'px)').matches || $("html").hasClass("lt-ie9")) {
            return $('html, body').animate({
              scrollTop: tab_wrapper.offset().top - 50
            }, 'slow');
          } else {
            return $('html, body').animate({
              scrollTop: tab_wrapper.offset().top + tab_wrapper.find('.headings').outerHeight() - 50
            }, 'slow');
          }
        }
      });
    });
    $('.cart-form').submit(function() {
      addToCart($(this));
      return false;
    });
    $('.recently-added.mobile .close').on('click', function() {
      return fadeOutCartDropdown();
    });
    $('.recently-added-mask').on('click', function() {
      return fadeOutCartDropdown();
    });
    cart_dropdown_timer = '';
    toggleCartDropdown = function() {
      return $('.main-header .recently-added').slideToggle('fast');
    };
    slideDownCartDropdown = function() {
      $('.main-header .recently-added').slideDown('fast');
      return $("html, body").animate({
        scrollTop: 0
      });
    };
    openMobileModal = function() {
      $('.main-header .recently-added.mobile').fadeIn();
      return $('.main-header .recently-added-mask').removeClass('hide');
    };
    fadeOutCartDropdown = function() {
      clearTimeout(cart_dropdown_timer);
      $('.main-header .recently-added').fadeOut('fast');
      return $('.main-header .recently-added-mask').addClass('hide');
    };
    $('.main-header .recently-added').mouseenter(function() {
      return stopResetTimer();
    });
    $('.main-header .recently-added').mouseleave(function() {
      return startTimer();
    });
    startTimer = function() {
      return cart_dropdown_timer = setTimeout((function() {
        return fadeOutCartDropdown();
      }), 4000);
    };
    stopResetTimer = function() {
      return clearTimeout(cart_dropdown_timer);
    };
    validateSize = function(cart_form) {
      if (cart_form.find('select option:selected').is(':disabled')) {
        cart_form.find('.dropdown').effect('shake', {
          'times': 2,
          'distance': 5
        }, 400);
        return false;
      }
      return true;
    };
    addToCart = function(cart_form) {
      return $.ajax({
        type: "POST",
        url: "/cart/add.js",
        dataType: "json",
        data: cart_form.serialize(),
        success: addToCartPass,
        error: addToCartFail
      });
    };
    addToCartPass = function(product) {
      return recentCartItemPopUp();
    };
    addToCartFail = function(obj, status) {
      $('.recently-added .error').show();
      $('.recently-added table').hide();
      $('.recently-added div.row').hide();
      slideDownCartDropdown();
      return startTimer();
    };
    recentCartItemPopUp = function() {
      var cart_item, cart_total, currency_symbol;
      cart_item = {};
      cart_total = {};
      currency_symbol = $('.actual-price').html();
      currency_symbol = $.trim(currency_symbol.slice(0, currency_symbol.search(/\d/)));
      Shopify.money_format = currency_symbol + " {{amount}}";
      return $.getJSON("/cart.js", function(cart, textStatus) {
        var current_raw_total, item, new_cart_row, new_mobile_item, _i, _len, _ref;
        cart_item.image_url = Shopify.resizeImage(cart.items[0].image, "small");
        cart_item.url = cart.items[0].url;
        cart_item.title = cart.items[0].title;
        cart_item.price_raw = cart.items[0].price;
        cart_item.price = Shopify.formatMoney(cart_item.price_raw, Shopify.money_with_currency_format);
        current_raw_total = parseInt($('.recently-added .raw-total').html()) * 100;
        cart_total.quantity = 0;
        cart_total.price = 0;
        _ref = cart.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          cart_total.quantity += item.quantity;
          cart_total.price += item.price * item.quantity;
        }
        $('.cart-link .number').html(cart_total.quantity);
        $('.cart-link .number-wrapper').removeClass('hide');
        $('.recently-added .items-count .number').html(cart_total.quantity);
        $('.recently-added .total-price').html(Shopify.formatMoney(cart_total.price, Shopify.money_format));
        new_cart_row = '<tr>';
        new_cart_row += '<td class="cart-item">';
        new_cart_row += '<a href="' + cart_item.url + '">';
        new_cart_row += '<img src="' + cart_item.image_url + '" alt="' + cart_item.title + '">';
        new_cart_row += '</a>';
        new_cart_row += '</td>';
        new_cart_row += '<td class="cart-detail">';
        new_cart_row += '<h2><a href="' + cart_item.url + '">' + cart_item.title + '</a></h2>';
        new_cart_row += '</td>';
        new_cart_row += '<td class="cart-price">' + cart_item.price + '</td>';
        new_cart_row += '</tr>';
        new_mobile_item = '<a href="' + cart_item.url + '">';
        new_mobile_item += '<img src="' + cart_item.image_url + '" alt="' + cart_item.title + '">';
        new_mobile_item += '</a>';
        $('.recently-added tbody').html(new_cart_row);
        $('.recently-added .mobile-item').html(new_mobile_item);
        $('.recently-added .error').hide();
        $('.recently-added table').show();
        $('.recently-added div.row').show();
        if ($('.main-header .mobile-tools').is(":hidden")) {
          slideDownCartDropdown();
        } else {
          openMobileModal();
        }
        return startTimer();
      });
    };
    if (Modernizr.touch === false) {
      $('.product-grid .product-item').mouseenter(function() {
        return $(this).find('.image-wrapper').animate({
          opacity: 0.5
        }, 100);
      }).mouseleave(function() {
        return $(this).find('.image-wrapper').stop(true, true).animate({
          opacity: 1
        }, 300);
      });
    }
    if (PAGE.hasClass('template-page')) {
      page_content = $('.page-content .rte-content');
      if (page_content.find('.left-side-column').length || page_content.find('.right-side-column').length) {
        if (page_content.find('.left-side-column').length && page_content.find('.right-side-column').length) {
          page_content.wrapInner("<div class='main-column with-2-sidebars'></div>");
          $('.left-side-column').addClass('with-2-sidebars');
          $('.right-side-column').addClass('with-2-sidebars');
        } else {
          page_content.wrapInner("<div class='main-column'></div>");
        }
        $('.left-side-column').prependTo(page_content);
        $('.right-side-column').appendTo(page_content);
      }
    }
    if (PAGE.hasClass('template-index')) {
      FullscreenSlider = (function() {
        function FullscreenSlider(slider_element, autoplay_enabled, autoplay_frequency) {
          this.eventListeners = __bind(this.eventListeners, this);
          this.alignPlayButton = __bind(this.alignPlayButton, this);
          this.alignCaption = __bind(this.alignCaption, this);
          this.getActiveIndex = __bind(this.getActiveIndex, this);
          this.autoplay = __bind(this.autoplay, this);
          this.createSlider = __bind(this.createSlider, this);
          this.el = slider_element;
          this.autoplay_enabled = autoplay_enabled;
          this.autoplay_frequency = autoplay_frequency;
          this.createSlider();
          this.owl = $(".owl-carousel").data('owlCarousel');
        }

        FullscreenSlider.prototype.createSlider = function() {
          var slider;
          slider = this;
          return slider.el.owlCarousel({
            singleItem: true,
            navigation: false,
            paginationNumbers: false,
            scrollPerPageNav: true,
            slideSpeed: 800,
            pagination: true,
            autoHeight: true,
            autoPlay: slider.autoplay(),
            afterInit: function() {
              return slider.eventListeners();
            },
            afterAction: function() {
              slider.alignCaption();
              return slider.alignPlayButton();
            }
          });
        };

        FullscreenSlider.prototype.autoplay = function() {
          if (this.autoplay_enabled) {
            return this.autoplay_frequency;
          }
          return false;
        };

        FullscreenSlider.prototype.getActiveIndex = function() {
          return this.el.find('.owl-pagination .owl-page.active').index();
        };

        FullscreenSlider.prototype.alignCaption = function() {
          var caption, caption_height, caption_width, slide, slide_padding, top_offset;
          slide = this.el.find('.owl-item').eq(this.getActiveIndex());
          caption = slide.find('.caption');
          caption.css('visibility', 'hidden');
          caption_height = caption.outerHeight();
          caption_width = caption.outerWidth();
          slide_padding = 30;
          if (PAGE.hasClass('transparent-menu')) {
            top_offset = $('.main-header').outerHeight();
          } else {
            top_offset = 0;
          }
          return slide.find('img').first().imagesLoaded(function() {
            var left_offset, middle_top, slide_height, slide_width;
            slide_height = slide.outerHeight();
            slide_width = slide.outerWidth();
            if (caption.hasClass('top')) {
              caption.css('top', top_offset + slide_padding);
            } else if (caption.hasClass('middle')) {
              middle_top = top_offset + (slide_height - top_offset - caption_height) / 2;
              caption.css('top', middle_top);
            }
            if (caption.hasClass('center')) {
              left_offset = (slide_width - caption_width) / 2;
              caption.css('left', left_offset);
            }
            return caption.css('visibility', 'visible');
          });
        };

        FullscreenSlider.prototype.alignPlayButton = function() {
          var play_button, slide;
          slide = this.el.find('.owl-item').eq(this.getActiveIndex());
          play_button = slide.find('.play-button');
          play_button.css('visibility', 'hidden');
          if (PAGE.hasClass('transparent-menu') && $('.main-header').css('position') === 'absolute') {
            slide.find('img').first().imagesLoaded(function() {
              var play_button_height, slide_height, video_offset;
              slide_height = slide.outerHeight();
              play_button_height = play_button.outerHeight();
              video_offset = (slide_height - play_button_height) / 2;
              return play_button.css({
                'margin-top': 0,
                'top': video_offset
              });
            });
          } else {
            play_button.css({
              'margin-top': '-40px',
              'top': '50%'
            });
          }
          return play_button.css('visibility', 'visible');
        };

        FullscreenSlider.prototype.eventListeners = function() {
          var slider;
          slider = this;
          this.el.find(".play-button").on('click', function() {
            var video_modal;
            video_modal = new VideoModal($(this).closest('.video'));
            video_modal.open();
            slider.owl.stop();
            return false;
          });
          return this.el.find('.owl-pagination .owl-page').on('click', function() {
            return slider.owl.stop();
          });
        };

        return FullscreenSlider;

      })();
      fullscreen_slider = new FullscreenSlider($('.slider .slides'), home_slider_auto_enabled, home_slider_rotate_frequency);
      $('.product-slider').slice(1).css('padding-top', 0);
      $('.product-slider .product-grid').owlCarousel({
        items: 4,
        navigation: true,
        scrollPerPage: true,
        slideSpeed: 800,
        lazyLoad: true,
        pagination: false,
        navigationText: false
      });
      $('.product-slider .product-item').show();
      smallPromos = function() {
        return $('.small-promos .image-text-widget').mouseenter(function() {
          return $(this).find('.caption').fadeIn(300);
        }).mouseleave(function() {
          return $(this).find('.caption').stop(true, true).fadeOut(300);
        });
      };
      smallPromos();
      instagramFeed();
    }
    if (PAGE.hasClass('template-list-collections')) {
      $('.collection-item').mouseenter(function() {
        return $(this).find('.caption').fadeIn(300);
      }).mouseleave(function() {
        return $(this).find('.caption').stop(true, true).fadeOut(300);
      });
    }
    if (PAGE.hasClass('template-product')) {
      positions = function() {
        var insertPosition;
        insertPosition = function(position_target) {
          var positions_src, target;
          positions_src = $('.positions.active');
          target = position_target;
          positions_src.find('[data-position]').each(function() {
            var elem_src, elem_target, position;
            position = $(this).attr('data-position');
            if (position.length) {
              elem_src = positions_src.find('[data-position="' + position + '"]');
              elem_target = target.find('[data-position="' + position + '"]');
              return elem_src.children().appendTo(elem_target);
            }
          });
          positions_src.removeClass('active');
          return position_target.addClass('active');
        };
        $(document).on("smallWindow", function() {
          return insertPosition($('.positions.show-for-small'));
        });
        $(document).on("mediumWindow", function() {
          return insertPosition($('.positions.show-for-medium-only'));
        });
        $(document).on("largeWindow", function() {
          return insertPosition($('.positions.show-for-large-up'));
        });
      };
      positions();
      photos = $('article .photos');
      thumbs = $('article .thumbs');
      photos.on('click', function() {
        return false;
      });
      imgZoom = function(index) {
        if (Modernizr.touch === false && product_zoom_enabled) {
          return photos.find('.container').zoom({
            url: photos.find('.photo').eq(index).attr('data-zoom')
          });
        }
      };
      if (Modernizr.touch === false && product_zoom_enabled) {
        photos.find('.container').on("mouseover", function() {
          $(this).css('outline-width', 1);
          return photos.find('.zoomImg').css({
            opacity: 1
          });
        }).on("mouseleave", function() {
          return $(this).css('outline-width', 0);
        });
      }
      updateActiveImg = function(index) {
        var transition_time;
        if (photos.find('.photo').eq(index).find('img').length < 1) {
          return;
        }
        if (photos.find('.photo.active').index() === index) {
          return;
        }
        thumbs.find('.thumb').removeClass('active');
        thumbs.find('.thumb').eq(index).addClass('active');
        photos.find('.zoomImg').remove();
        transition_time = 0;
        if (photos.find('.photo.active').length) {
          transition_time = 300;
          photos.find('.photo.active').fadeOut(transition_time).removeClass('active');
        }
        photos.find('.photo').eq(index).delay(transition_time).imagesLoaded(function() {
          var container_width, height, width;
          imgZoom(index);
          height = photos.find('.photo').eq(index).find('img').naturalHeight();
          width = photos.find('.photo').eq(index).find('img').naturalWidth();
          container_width = photos.outerWidth();
          if (container_width < width) {
            height = container_width / width * height;
            width = container_width;
          }
          photos.find('.container').animate({
            "height": height,
            "width": width
          }, transition_time, function() {
            return photos.find('.container').css({
              'height': 'auto',
              'width': 'auto'
            });
          });
          return photos.find('.photo').eq(index).addClass('active').fadeIn(transition_time);
        });
      };
      thumbs.find('.thumb').click(function() {
        return updateActiveImg($(this).index());
      });
      // selectCallback - Triggered each time a variant is selected on the Product page;
      selectCallback = function(variant, selector) {
        var variant_image_index;
        $(".compare-price").html("");
        if (variant && variant.available) {
          $(".quanity-cart-row").show();
          $('.product-unavailable').hide();
        } else {
          $(".quanity-cart-row").hide();
          $('.product-unavailable').show();
          if (product_variant_size > 1 && variant) {
            $('.product-unavailable form .email-body').attr('value', 'Please notify me when this is back in stock: ' + product_title + ' - ' + variant.title);
          }
        }
        if (variant) {
          $(".actual-price").html(Shopify.formatMoney(variant.price, shop_money_format));
          if (variant.compare_at_price > variant.price) {
            $(".compare-price").html(product_language_was + " " + Shopify.formatMoney(variant.compare_at_price, shop_money_format));
          }
          if (variant.featured_image) {
            variant_image_index = $('article .photos .photo[data-image-id="' + variant.featured_image.id + '"]').index();
            updateActiveImg(variant_image_index);
          } else {
            updateActiveImg(0);
          }
        }
      };
      // end of selectCallback;
      new Shopify.OptionSelectors("variant-listbox", {
        product: product_json,
        onVariantSelected: selectCallback,
        enableHistoryState: true
      });
      $(".custom.dropdown").hide();
      if (product_options_size === 1 && product_options_first !== "Title") {
        $(".selector-wrapper:eq(0)").prepend("<label>" + product_options_first + "</label>");
      }
      $(".selector-wrapper .single-option-selector").each(Foundation.libs.forms.append_custom_select);
      $("select.single-option-selector").change(function() {
        Foundation.libs.forms.refresh_custom_select($(this), true);
      });
      productModal();
    }
    if (PAGE.hasClass('template-article')) {
      pinterest_button = $('.social-share .pinterest');
      first_article_img = $('.article img').first().attr('src');
      pinterest_button.attr('href', pinterest_button.attr('href') + '&media=' + first_article_img);
    }
    isFirefox = typeof InstallTrigger !== "undefined";
    if (isFirefox) {
      $('img').addClass('image-scale-hack');
    }
    if (Modernizr.touch) {
      $("form.custom .hidden-field").removeClass('hidden-field');
    }
    current_window = '';
    mediaQueries = function() {
      if ($("html").hasClass("lt-ie9")) {
        $.event.trigger("mediumWindow");
        return current_window = 'medium';
      } else if (window.matchMedia('only screen and (min-width: ' + mq_medium + 'px)').matches) {
        if (current_window !== 'large') {
          $.event.trigger("largeWindow");
          return current_window = 'large';
        }
      } else if (window.matchMedia('only screen and (min-width: ' + mq_small + 'px)').matches) {
        if (current_window !== 'medium') {
          $.event.trigger("mediumWindow");
          return current_window = 'medium';
        }
      } else {
        if (current_window !== 'small') {
          $.event.trigger("smallWindow");
          return current_window = 'small';
        }
      }
    };
    mediaQueries();
    $(window).resize(function() {
      return mediaQueries();
    });
    return $('.hide-until-js').show();
  });

  return false;

}).call(this);
