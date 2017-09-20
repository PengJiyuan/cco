(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.c = factory());
}(this, (function () { 'use strict';

var Color = function Color() {};

// converts hex to RGB
Color.prototype.hexToRGB = function hexToRGB (hex) {
  var rgb = [];

  hex = hex.substr(1);

  // converts #abc to #aabbcc
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }

  hex.replace(/../g, function (color) {
    rgb.push(parseInt(color, 0x10));
  });

  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    rgb: ("rgb(" + (rgb.join(',')) + ")")
  };
};

// converts rgb to HSL
Color.prototype.rgbToHSL = function rgbToHSL (r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
    }
    h /= 6;
  }

  return {
    h: h,
    s: s,
    l: l,
    hsl: ("hsl(" + (h * 360) + ", " + (s * 100) + "%, " + (l * 100) + "%)")
  };
};

// converts hsl to RGB
Color.prototype.hslToRGB = function hslToRGB () {
};

// color lighten
Color.prototype.lighten = function lighten (color, percent) {
  var hsl, h, s, l, rgba, a;
  if(!color || !percent || !/^[0-9]{1,2}%$/.test(percent)) {
    return;
  }
  if(this.isRgba(color)) {
    rgba = this.getRgba(color);
    a = +rgba.a - +( percent.slice(0, -1) / 100 );
    return ("rgba(" + (rgba.r) + ", " + (rgba.g) + ", " + (rgba.b) + ", " + a + ")");
  } else {
    hsl = this.getHsl(color);
    h = +hsl.h;
    s = +hsl.s;
    l = +hsl.l * 100 + +percent.slice(0, -1);

    return ("hsl(" + (h * 360) + ", " + (s * 100) + "%, " + l + "%)");
  }
};

// color darken
Color.prototype.darken = function darken (color, percent) {
  var hsl, h, s, l, rgba, a;
  if(!color || !percent || !/^[0-9]{1,2}%$/.test(percent)) {
    return;
  }
  if(this.isRgba(color)) {
    rgba = this.getRgba(color);
    a = +rgba.a + +( percent.slice(0, -1) / 100 );
    return ("rgba(" + (rgba.r) + ", " + (rgba.g) + ", " + (rgba.b) + ", " + a + ")");
  } else {
    hsl = this.getHsl(color);
    h = +hsl.h;
    s = +hsl.s;
    l = +hsl.l * 100 - +percent.slice(0, -1);

    return ("hsl(" + (h * 360) + ", " + (s * 100) + "%, " + l + "%)");
  }
};

Color.prototype.isHex = function isHex (color) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color);
};

Color.prototype.isRgb = function isRgb (color) {
  return /^rgb\((\s*[0-5]{0,3}\s*,?){3}\)$/.test(color);
};

Color.prototype.isRgba = function isRgba (color) {
  return /^rgba\((\s*[0-5]{0,3}\s*,?){3}[0-9.\s]*\)$/.test(color);
};

Color.prototype.getRgb = function getRgb (color) {
  var rgb, r, g, b;
  if(this.isHex(color)) {
    rgb = this.hexToRGB(color);
    var assign;
      (assign = [ rgb.r, rgb.g, rgb.b ], r = assign[0], g = assign[1], b = assign[2]);
  } else if(this.isRgb(color)) {
    rgb = color.slice(4, -1).split(',');
    var assign$1;
      (assign$1 = [ rgb[0], rgb[1], rgb[2] ], r = assign$1[0], g = assign$1[1], b = assign$1[2]);
  }
  return { r: r, g: g, b: b };
};

Color.prototype.getRgba = function getRgba (color) {
  var rgba, r, g, b, a;
  rgba = color.slice(5, -1).split(',');
  var assign;
    (assign = [ rgba[0], rgba[1], rgba[2], rgba[3] ], r = assign[0], g = assign[1], b = assign[2], a = assign[3]);

  return { r: r, g: g, b: b, a: a };
};

Color.prototype.getHsl = function getHsl (color) {
  var hsl, rgb, r, g, b, h, s, l;
  rgb = this.getRgb(color);
  var assign;
    (assign = [ rgb.r, rgb.g, rgb.b ], r = assign[0], g = assign[1], b = assign[2]);

  hsl = this.rgbToHSL(r, g, b);
  var assign$1;
    (assign$1 = [ hsl.h, hsl.s, hsl.l ], h = assign$1[0], s = assign$1[1], l = assign$1[2]);

  return { h: h, s: s, l: l };
};

var index = new Color();

return index;

})));
