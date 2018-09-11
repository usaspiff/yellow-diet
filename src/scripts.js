function el(id) {
    return document.getElementById(id);
}

var canvas = el("colors_sketch");
var context = canvas.getContext("2d");

function readImage() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, 640, 480);
                findAvgColor();
            };
            img.src = e.target.result;
        };
        FR.readAsDataURL(this.files[0]);
    }
}

el("fileUpload").addEventListener("change", readImage, false);

// helpers
var getAverageRGB = function (imgData) {
    var red = 0;
    var green = 0;
    var blue = 0;
    var total = 0;

    for (var i = 0; i < imgData.length; i += 4) {
        if (imgData[i + 3] !== 0) {
            red += imgData[i + 0];
            green += imgData[i + 1];
            blue += imgData[i + 2];
            total++;
        }
    }

    var avgRed = Math.floor(red / total);
    var avgGreen = Math.floor(green / total);
    var avgBlue = Math.floor(blue / total);

    return "rgba(" + avgRed + "," + avgGreen + "," + avgBlue + ", 1)";
};

// process uploaded image to extract average rgba
function findAvgColor() {
    var pixels = context.getImageData(50, 50, 540, 380);
    var averageRGBA = getAverageRGB(pixels.data);
    document.getElementById("color_palette").style.backgroundColor = averageRGBA;
    console.log(averageRGBA);
}
