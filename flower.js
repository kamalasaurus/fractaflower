//http://www.codeproject.com/Articles/650821/Fractals-in-theory-and-practice << these guys have some cool fractals

var brown = [167, 41, 38];
var green = [153, 207, 28];

var FLOWER = {

  height: 400,
  width: 400,

  canvas: null,
  context: null,

  seedCount: 1500,

  phi: function() {
    //phi ~ 1.6180339887498948482
    return (Math.sqrt(5) + 1) / 2;
  },

  attachCanvas: function() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.height = this.height;
    this.canvas.width = this.width;

    document.body.appendChild(this.canvas);
    return;
  },

  drawFlower: function() {
    var seeds = Array.slice.call(this, new Uint8ClampedArray(this.seedCount));
    seeds
      .map(this.createSeed.bind(this))
      .forEach(this.drawSeed.bind(this));
    return;
  },

  createSeed: function(seed, idx, seeds) {

    var phi = this.phi();
    var theta = 2 * Math.PI * phi * idx;
    var r = Math.pow(idx, phi) / (seeds.length / 2);
    //I don't exactly understand why raising the seed number to phi then dividing by half the total will generate the
    //seed origin coordinate...

    return {
      x: r * Math.cos(theta) + 200,
      y: r * Math.sin(theta) + 200,
      radius: idx / (seeds.length / 4),
      color: this.getColor(r)
    };
  },

  drawSeed: function(seed) {
    this.context.beginPath();
    this.context.arc(
      seed.x,
      seed.y,
      seed.radius,
      0,
      2 * Math.PI,
      false
    );
    this.context.fillStyle = seed.color;
    this.context.fill();
  },

  getColor: function(radius) {
    var col = brown.map(function(color, idx) {
      var b_comp = (200-radius)/200 * color;
      var g_comp = radius/200 * green[idx];
      return Math.round(b_comp + g_comp);
    });
    return 'rgb(' + col.join(',') + ')';
  },

  render: function() {
    var stages = [
      this.attachCanvas,
      this.drawFlower
    ];

    stages.forEach(function(fn) {
      return fn.call(this);
    }.bind(this));
  }
};


(function() {
  FLOWER.render.call(FLOWER);
})();

