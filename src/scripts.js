// target input to load file
function el(id) {
    return document.getElementById(id);
}

el("fileUpload").addEventListener("change", readImage, false);

// const to define canvas properties
const canvas = el("colors_sketch");
const context = canvas.getContext("2d");

// process uploaded image file to canvas
function readImage() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, 300, 200);
                findAvgColor();
            };
            img.src = e.target.result;
        };
        FR.readAsDataURL(this.files[0]);
        document
          .getElementById("result")
          .classList.remove("default-hide");
    }
}


// helper function to obtain average rgb
const getAverageRGB = function (imgData) {
    let red = 0;
    let green = 0;
    let blue = 0;
    let total = 0;

    for (let i = 0; i < imgData.length; i += 4) {
        if (imgData[i + 3] !== 0) {
            red += imgData[i + 0];
            green += imgData[i + 1];
            blue += imgData[i + 2];
            total++;
        }
    }

    let avgRed = Math.floor(red / total);
    let avgGreen = Math.floor(green / total);
    let avgBlue = Math.floor(blue / total);

    return "rgba(" + avgRed + "," + avgGreen + "," + avgBlue + ", 1)";
};

// process uploaded image to extract average rgba
function findAvgColor() {
    const pixels = context.getImageData(10, 10, 280, 180);
    const averageRGBA = getAverageRGB(pixels.data);
    document.getElementById("color_palette").style.backgroundColor = averageRGBA;
    console.log(averageRGBA);
}
