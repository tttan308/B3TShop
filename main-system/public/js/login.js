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

  $(".signup-form").on("submit", function (e) {
    e.preventDefault();

    const username = $('[name="username"]').val();
    const email = $('[name="email"]').val();
    const password = $('[name="password"]').val();
    const confirmPassword = $("#confirm_password-field").val();
    const errorDiv = $("#signupError");

    errorDiv.addClass("d-none").text("");
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      errorDiv
        .text("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số!")
        .removeClass("d-none");
      return;
    }
    if (password !== confirmPassword) {
      errorDiv
        .text("Mật khẩu và xác nhận mật khẩu không khớp!")
        .removeClass("d-none");
      return;
    }

    $.ajax({
      url: "/auth/register",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      success: function (data) {
        $("#registerModal").modal("show");
        setTimeout(function () {
          window.location.replace("/auth/login");
        }, 3000);
      },
      error: function (error) {
        let errorMessage = "Đã xảy ra lỗi trong quá trình đăng ký.";
        if (error.responseJSON && error.responseJSON.responseText) {
          errorMessage = error.responseJSON.responseText;
        }
        $("#signupError").text(errorMessage).removeClass("d-none");
      },
    });
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const form = $(this);
    const username = $('[name="username"]').val();
    const password = $('[name="password"]').val();
    const errorDiv = $("#loginError");

    errorDiv.addClass("d-none").text("");
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      errorDiv
        .text("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số!")
        .removeClass("d-none");
      return;
    }
    $.ajax({
      url: "/auth/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username: username, password: password }),
      success: function (data) {
        $("#loginModal").modal("show");
        let counter = 3;
        const interval = setInterval(function () {
          counter--;
          $("#countdown").text(counter);
          if (counter <= 0) {
            clearInterval(interval);
            $("#loginModal").modal("hide");
            window.location.href = "/";
          }
        }, 1000);
      },
      error: function (error) {
        console.error("Error:", error);

        errorDiv
          .text("Tài khoản hoặc mật khẩu không đúng")
          .removeClass("d-none");
      },
    });
  });
})(jQuery);
