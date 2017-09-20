# cco

*coo* is a tiny tool to transfer color.

## Install

```bash
npm install coo
```

## Usage

```javascript
import cco from 'cco';

cco.getRgb('#ccc'); // {r: 204, g: 204, b: 204}
cco.getHsl('#ccc'); // {h: 0, s: 0, l: 0.8}
cco.isHex('#ccc'); // true

cco.lighten('#ccc', '10%'); // hsl(0, 0%, 90%)
cco.darken('#ccc', '10%'); // hsl(0, 0%, 70%)
cco.hexToRgb('#ccc'); // {r: 204, g: 204, b: 204, rgb: "rgb(204,204,204)"}
```
## LICENSE

[MIT](./LICENSE)
