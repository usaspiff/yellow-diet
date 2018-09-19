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

    return "rgb(" + avgRed + "," + avgGreen + "," + avgBlue + ")";
};

// process uploaded image to extract average rgba
// removed 10 pixels all around in const pixels to create a border and prevent content around the center of the image to be cumputed.
function findAvgColor() {
    const pixels = context.getImageData(10, 10, 280, 180);
    const averageRGBA = getAverageRGB(pixels.data);
    document.getElementById("color_palette").style.backgroundColor = averageRGBA;
    document.getElementById("result-rgb").innerHTML = averageRGBA;
    console.log(averageRGBA);
    isItYellow(averageRGBA);
}

// function to indicate user if their food is yellow or not
function isItYellow(rgb) {
    let rgbValuesFilter = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    let rgbArray = rgbValuesFilter.exec(rgb);
    console.log("It is " + rgbArray);
    let r = rgbArray[0];
    let g = rgbArray[1];
    let a = rgbArray[2];

    if(r < 230) {
        document.getElementById("ml-summary").innerHTML = "It's not yellow!";
    } else if(
         g < 150
    ) {
        document.getElementById("ml-summary").innerHTML = "It's not yellow!";
    } else if(
        g > r
    ) {
        document.getElementById("ml-summary").innerHTML = "It's not yellow!";
    } else if(
        r-g > 80
    ) {
        document.getElementById("ml-summary").innerHTML = "It's not yellow!";
    } else if(
        g-b < 100
    ) {
        document.getElementById("ml-summary").innerHTML = "It's not yellow!";
    } else {
        document.getElementById("ml-summary").innerHTML = "Your food is yellow!";
    }

}