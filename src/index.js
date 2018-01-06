import './assets/demo.css'
import './assets/main.css'

import Myimg from './assets/demo-2.png'

var shuffle = require('lodash/shuffle')

var img = new Image();
img.src = Myimg;
document.body.appendChild(img)

var arr = shuffle([1, 2, 3])
console.log(arr)
