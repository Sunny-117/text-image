import { createTextImage } from './';

const cvs = document.createElement('canvas');
document.body.appendChild(cvs);

createTextImage({
  canvas: cvs,
  source: {
    text: 'Sunny',
  },
  replaceText: 'Sunny-117',
});
