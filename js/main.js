function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

function animate_elements(el, intro_classes = [], outro_classes = []) {
  var bounding = el.getBoundingClientRect();
  // if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight) {
  if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
    el.style.setProperty("opacity", "1");
    el.style.setProperty("transition", "opacity 0.3s ease-in-out");
    for (var i = 0; i < outro_classes.length; i++) {
      removeClass(el, outro_classes[i]);
    }

    for (var i = 0; i < intro_classes.length; i++) {
      addClass(el, intro_classes[i]);
    }
    // console.log('Element is in the viewport!');
  } else {
    for (var i = 0; i < intro_classes.length; i++) {
      removeClass(el, intro_classes[i]);
    }
    for (var i = 0; i < outro_classes.length; i++) {
      addClass(el, outro_classes[i]);
    }
    el.style.setProperty("opacity", "0");
    el.style.setProperty("transition", "opacity 0.3s ease-in-out");

    // console.log('Element is NOT in the viewport!');
  }
}

window.addEventListener("load", () => {
  AOS.init({
    offset: 200,
    duration: 600,
    easing: "ease-in-sine",
  });
  var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: ".navbar",
  });
  // Elements to animate
  var name = document.querySelector(".name");
  // var name_counter=0;
  // var profile_img=document.querySelector(".profile-img");
  // profile_img.style.setProperty('opacity','0.1')
  // var profile_img_counter=0;
  // var aboutme_content=document.querySelector(".aboutme-content");
  // aboutme_content.style.setProperty('opacity','0.1')
  // var aboutme_content_counter=0;

  window.addEventListener('scroll',()=>{
      animate_elements(el=name,intro_classes=['animate__animated', 'animate__bounce']);
      // console.log('name',name_counter);
      // profile_img_counter=animate_elements(el=profile_img,intro_classes=['animate__animated', 'animate__zoomIn'],outro_classes=['animate__animated', 'animate__zoomOut'],counter=profile_img_counter);
      // console.log('profile_image',profile_img_counter);
      // aboutme_content_counter=animate_elements(el=aboutme_content,intro_classes=['animate__animated', 'animate__slideInRight'],outro_classes=['animate__animated', 'animate__slideOutRight'], counter=aboutme_content_counter);
      // console.log('aboutme',aboutme_content_counter);
  });

  const btn_say_hello = document.querySelector("#say-hello-btn");
  const contact_tooltip = document.querySelector("#contact-tooltip");
  const email_id = "nairanuj29+website@gmail.com";

  // TODO: Copy Email Function
  btn_say_hello.addEventListener("click", () => {
    navigator.clipboard.writeText(email_id);
    contact_tooltip.innerHTML = "Copied: " + email_id;
  });

  btn_say_hello.addEventListener("mouseout", () => {
    contact_tooltip.innerHTML = "Copy Email ID";
  });
});
