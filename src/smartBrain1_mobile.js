// import bodymovin from "bodymovin";
import $ from "jquery";
import pic0 from "../assets/smartBrain1_mobile/images/img_0.png";
import pic1 from "../assets/smartBrain1_mobile/images/img_1.png";
import data from "../assets/smartBrain1_mobile/data.json";
import detectmob from "./detectmob.js";

//changes the path

for (let i = 0; i <= 1; i++) {
  data.assets[i].u = "./";

  switch (i) {
    case 0:
      data.assets[i].p = pic0;
      break;
    case 1:
      data.assets[i].p = pic1;
      break;
    case 2:
      data.assets[i].p = pic2;
      break;
    case 3:
      data.assets[i].p = pic3;
      break;
    case 4:
      data.assets[i].p = pic4;
      break;
    case 5:
      data.assets[i].p = pic5;
      break;
    case 6:
      data.assets[i].p = pic6;
      break;
    case 7:
      data.assets[i].p = pic7;
      break;
    case 8:
      data.assets[i].p = pic8;
      break;
    case 9:
      data.assets[i].p = pic9;
      break;
  }
}

var isMob = detectmob();

if(isMob){
  var animation = bodymovin.loadAnimation({
    container: document.getElementById("bodymovin2"),
    renderer: "svg",
    loop: true,
    autoplay: false,
    animationData: data
    // path: './data.json'
  });

  $(document).ready(function() {

    let h = $(window).height();
    var scroll_now;

    $(window).on("scroll", function() {
      scroll_now = $(window).scrollTop();
      let smartBrainContainer_play = scroll_now - $("#smartBrainContainer").offset().top + h;
      if (smartBrainContainer_play > h / 3) {
        animation.play();
      }
    });
  });
}

