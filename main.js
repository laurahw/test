var Product = function () {
    this.w = 0;
    this.h = 0;
};
Product.prototype.render = function () {
    var node = document.createElement('div');
    node.setAttribute('style', 'border: 1px solid #000000; padding: 2px; margin: 2px; width:'
        + this.w + 'px; height: ' + this.h + 'px; background-color: ' + this.bg_colour);
    node.innerText = this.name;
    return node;
}

var Treatment = function () {
    var that = new Product();
    that.w = 120;
    that.h = 28;
    return that;
}
Treatment.treatmentMax = 100;


/**
 * Sort the contents of a menu in either accending or decending (depending on
 * flag set) greyscale colour order. NOTE, this will not work with non-greyscale
 * colurs so don't use it for that!
 *
 * @param bool asc true for assending, false for not
 */
function bgSort(input, asc) {
    // Rearange the contents of the menu based on the bg colour
    var tmp = [];
    var asc = asc || false;

    for (i = 0; i < input.length; i++) {
        for (j = 0; j < input.length; j++) {
            var thisColour = parseInt(input[i].bg_colour.replace("#", ''), 16),
                nextColour = parseInt(input[j].bg_colour.replace("#", ''), 16);

            if (asc) {
                if (thisColour < nextColour) {
                    // Switch them around

                    tmp = input[i];
                    input[i] = input[j];
                    input[j] = tmp;
                }
            }
            else {
                if (thisColour > nextColour) {
                    // Switch them around

                    tmp = input[i];
                    input[i] = input[j];
                    input[j] = tmp;
                }
            }
        }
    }
}

// Create a menu
var treatmentMenu = [];

for (var i = 0; i < Treatment.treatmentMax; i++) {
    var t = Treatment();
    t.bg_colour = mk_rnd_greyscale();
    t.name = "Treatment " + i;
    treatmentMenu.push(t);
}



// Now we want to sort the menu so that the background colours are in order.

bgSort(treatmentMenu);

// Now print them all out in pretty html

var out = document.getElementById('output');
var p = document.createElement('p');
p.innerText = 'Treatment Menu: ' + treatmentMenu.length + ' treatments';
out.appendChild(p);
for (var i = 0; i < treatmentMenu.length; i++) {
    var node = treatmentMenu[i].render();
    node.onclick = function () {
        alert("I am number " + i + " in the menu");
    };
    out.appendChild(node);
}

// Make a greyscale colour
function mk_rnd_greyscale() {
    var colour = Math.round((Math.random() * 256)),
        hex = colour.toString(16);
    return '#' + hex + hex + hex;
}
