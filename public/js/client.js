let videos = document.querySelectorAll("video");

[...videos].forEach((video) => {
  console.log(video);
  video.addEventListener(
    "mouseenter",
    (e) => {
      e.target.play();
    },
    false
  );
  video.addEventListener(
    "mouseleave",
    (e) => {
      e.target.pause();
    },
    false
  );
});

let alert = document.querySelector(".alert");
console.log(alert);
window.setTimeout(function () {
  alert.style.transform = `translate(500px)`;
  alert.style.transition = "ease all 0.7s";
  alert.style.position = "fixed";
  //   alert.style.display = "none";
}, 3000);

{
  alert.style.transform = `translate(0px)`;
  alert.style.transition = "ease all 0.7s";
}
