// Check if two arrays are equals
const arrayEqual = (a1, a2) => a1.length === a2.length && a1.every((e, i) => e === a2[i]);

// Generate a random number between a lower and an upper limit
const randomNumberGenerator = (minimun, maximun) => {
    return Math.floor(Math.random() * (maximun - minimun + 1) + minimun);
};

// Generate a random color in the RGB format to be use as a CSS property
const genRGBforCSS = () => {
    return 'rgb(' + randomNumberGenerator(80, 235) + ', '+ randomNumberGenerator(30, 235) + ', '+ randomNumberGenerator(30, 235) + ')';
};

// Get all the following CSS classes: circle-img-color-*
const classProcessing = (classArray) => {
    for (let i = 0; i < classArray.length; i++) {
        tmpArray = classArray[i].split("-").slice(0, 3);

        if(arrayEqual(tmpArray, ['circle', 'img', 'color']) == true) {
            return classArray[i];
        } 
    }
};

// Allocate a random color to all the circles with a camera icon
const randomCircleColorImage = () => {
    let class_list = [];

    document.querySelectorAll('.circle-img-border').forEach(e=>class_list.push(classProcessing(e.getAttribute('class').split(" "))));

    for (let i = 0; i < class_list.length; i++) {
        $('.' + class_list[i]).css('background-color', genRGBforCSS());
    }
};

randomCircleColorImage();