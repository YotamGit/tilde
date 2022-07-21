function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

//randomize the background on refresh
const backgroundImageId = getRandomInt(1, CONFIG.backgroundCount + 1);
var backgroundElements = document.getElementsByClassName('background_img');
for (
  var backgroundId = 0;
  backgroundId < backgroundElements.length;
  backgroundId++
) {
  backgroundElements[backgroundId].src =
    './photos/' + backgroundImageId + '.jpg';
}

//preload image in browser
function preloadImages(array) {
  if (!preloadImages.list) {
    preloadImages.list = [];
  }
  var list = preloadImages.list;
  for (var i = 0; i < array.length; i++) {
    var img = new Image();
    img.onload = function () {
      var index = list.indexOf(this);
      if (index !== -1) {
        // remove image from the array once it's loaded
        // for memory consumption reasons
        list.splice(index, 1);
      }
    };
    list.push(img);
    img.src = array[i];
  }
}

//cache the backgrounds in the browser
const backgroundPaths = [];
for (var imgId = 1; imgId < CONFIG.backgroundCount + 1; imgId++) {
  backgroundPaths.push('./photos/' + imgId + '.jpg');
}
preloadImages(backgroundPaths);
