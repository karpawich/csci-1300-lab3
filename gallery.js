var index = 0;

function updateImage() {
  const imageElement = document.getElementById("image")
  imageElement.src = `assets/${index}.png`  
}

function nextImage() {
  index = (index + 1) % 6
  updateImage()
}

function prevImage() {
  if (index == 0) {
    index = 5;
  } else {
    index -= 1;
  }
  updateImage()
}