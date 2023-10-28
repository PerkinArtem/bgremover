import imglyRemoveBackground from "@imgly/background-removal"

const image_src = 'https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg';

let config =  {
  progress: (key, current, total) => {
    console.log(`Downloading ${key}: ${current} of ${total}`);
  }
};
// imglyRemoveBackground(image_src, config)
//   .then((blob) => {
//     const url = URL.createObjectURL(blob);
//     console.log(url)
//   })