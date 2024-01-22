(function ($) {
  "use strict";

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  $(".toggle-password").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  $('.signup-form').on('submit', function (e) {
    e.preventDefault();

    const username = $('[name="username"]').val();
    const email = $('[name="email"]').val();
    const password = $('[name="password"]').val();

    $.ajax({
      url: '/auth/register',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        username: username,
        email: email,
        password: password
      }),
      success: function (data) {
        console.log('Success:', data);
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  });

  $('.signin-form').on('submit', function (e) {
    e.preventDefault();

    const username = $('[name="username"]').val();
    const password = $('[name="password"]').val();

    $.ajax({
      url: '/auth/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      success: function (data) {
        console.log('Success:', data);
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  });

})(jQuery);
