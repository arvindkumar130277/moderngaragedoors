(function () {
  "use strict";

  var forms = document.querySelectorAll("form[data-form]");
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      status.className = "form-status";
      status.textContent = "Sending your request...";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) { throw new Error("Request failed"); }
          form.reset();
          status.className = "form-status ok";
          status.textContent = "Thank you. We received your request. A local contractor will contact you soon.";
        })
        .catch(function () {
          status.className = "form-status err";
          status.textContent = "Something went wrong. Please try again or call us.";
        })
        .then(function () { btn.disabled = false; });
    });
  });

  var topic = new URLSearchParams(window.location.search).get("topic");
  var select = document.getElementById("topic");
  if (topic && select) {
    Array.prototype.forEach.call(select.options, function (opt) {
      if (opt.value === topic) { select.value = topic; }
    });
  }
})();
