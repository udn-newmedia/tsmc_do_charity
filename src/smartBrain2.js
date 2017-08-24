import $ from "jquery";
// import bodymovin from "bodymovin";
import pic0 from "../assets/smartBrain2/images/img_0.png";
import pic1 from "../assets/smartBrain2/images/img_1.png";
import pic2 from "../assets/smartBrain2/images/img_2.png";
import pic3 from "../assets/smartBrain2/images/img_3.png";
import pic4 from "../assets/smartBrain2/images/img_4.png";
import pic5 from "../assets/smartBrain2/images/img_5.png";
import pic6 from "../assets/smartBrain2/images/img_6.png";
import pic7 from "../assets/smartBrain2/images/img_7.png";
import data from "../assets/smartBrain2/data.json";

//changes the path

for(let i=0;i<=7;i++){

    data.assets[i].u = './';
    
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

var animation = bodymovin.loadAnimation({
  container: document.getElementById("bodymovin"),
  renderer: "svg",
  loop: false,
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
    if(smartBrainContainer_play > h/3){
      animation.play();
    }
  });
});