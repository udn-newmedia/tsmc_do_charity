import bodymovin from 'bodymovin'
import pic1 from '../assets/ourstory-06.png'
import data from '../assets/data.json'

// console.log(pic1)
// console.log(data.assets[0].p)

//changes the path
data.assets[0].p = pic1;

var animation = bodymovin.loadAnimation({
    container: document.getElementById('bodymovin'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: data
    // path: './data.json'
});