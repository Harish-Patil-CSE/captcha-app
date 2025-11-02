async function loadCaptcha() {
  const res = await fetch("/captcha");
  const svg = await res.text();
  document.getElementById("captcha-img").innerHTML = svg;
}

document.getElementById("refresh-btn").addEventListener("click", (e) => {
  e.preventDefault();
  loadCaptcha();
});

loadCaptcha();
