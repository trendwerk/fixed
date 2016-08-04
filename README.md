# Fixed
Fixed element when scrolling, up until a certain point.

Requires jQuery.

## Install
```sh
bower install trendwerk/fixed --save
```

## Usage
Use the jQuery plugin on an element you want to become fixed.

```js
$('.element').fixed();
```

## Options
| Option | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| `minWidth` | `0` | No | Minimum window width from which the element becomes fixed
| `offset` | `{bottom: 0, top: 0}` | No | Optional offsets: below the element and from the top of the window
| `until` | `null` | No | Provide a jQuery element from which the element is not allowed to scroll past

### Example
An example implementation with some options:

```js
$('.sidebar').fixed({
  minWidth: 981,
  offset: {
    bottom: 20,
    top: 10,
  },
  until: $('.footer'),
});
```
