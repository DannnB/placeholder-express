const sharp = require('sharp');

const createImage = (width) => {
  const hexColor = '#cccccc';
  const w = 120; // hardcored as 'width' fails

  console.log('Running create image');

  sharp({
    create: {
      width: w,
      height: w,
      channels: 4,
      background: hexColor
    }
  })
  .png()
  .toBuffer()
  .then((data) => {
    // returns mutiple data..
    console.log(data);
  })
}


// needs to return the data to the res.send(createImage.image()); in app.js on line 54
exports.image = createImage;