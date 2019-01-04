const sharp = require('sharp');


class CreateImage {}

const createImageFromUrl = (req, res, width, height = width, color) => {
  const hexColor = color;
  const w = width;
  const h = height;

  console.log(`createImageFromUrl: w(${width}) h(${height})`);

  sharp({
    create: {
      width: w,
      height: h,
      channels: 4,
      background: hexColor
    }
  })
  .png()
  .toBuffer()
  .then((data) => {
    res.setHeader('Content-Type', 'image/png');
    res.send(data);
  })
  .catch((e) => {
    console.log('Error: ', e);
  })

}

exports.createImageFromUrl = createImageFromUrl;