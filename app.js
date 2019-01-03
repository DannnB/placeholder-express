const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const sharp = require('sharp');

const createImage = require('./util/createimage');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// home

app.get('/', (req, res) => {
  res.send('Home')
})

// a92828
app.get('/:width/:height', (req, res) => {
  // this works using sharp() in the same file....

  const width = parseInt(req.params.width);
  const height = parseInt(req.params.height);
  const hexColor = '#' + (req.query.bgcolor ? req.query.bgcolor : 'cccccc');
  
  // const bgcolor = req.query.bgcolor ? hexToRgbA(req.query.bgcolor) : 'rgba(255,255,255,0.6)';

  sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: hexColor
      }
    })
    .png()
    // .jpeg({
    //   quality: 100,
    //   chromaSubsampling: '4:4:4'
    // })
    .toBuffer()
    .then((data) => {
      res.setHeader('Content-Type', 'image/png');
      res.send(data);
    })
})

app.get('/:width', (req, res) => {
  // this dosn't work using sharp() in a exported

  const width = parseInt(req.params.width);  
  
  res.setHeader('Content-Type', 'image/png');  
  res.send(createImage.image());
})


// if 404
app.use((req, res, next) => {
  res.status(404)
  res.send('Not a valid placeholder url. Try something like: <pre>/img/200/100?bgcolor=#a92828</pre>')
})


// image creation test
const generateImage = (width, height) => {
  const w = width;
  const h = height;
  // const c = color;

  // https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
  // for a quick solution hex to rgba
  //  function hexToRgbA(hex) {
  //    var c;
  //    if (/^([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
  //      c = hex.substring(1).split('');
  //      if (c.length == 3) {
  //        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  //      }
  //      c = '0x' + c.join('');
  //      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
  //    }
  //    throw new Error('Bad Hex');
  //  }

  //  const bg = hexToRgbA(c);
}

// app.get('/img/:width/:height', (req, res) => {
//   generateImage(
//     req.params.width,
//     req.params.height
//   );
// })

function hexToRgbA(hex) {
  // https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
  // for a quick solution hex to rgba
  var c;
  if (/^([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
  }
  throw new Error('Bad Hex');
}

app.listen(3000);