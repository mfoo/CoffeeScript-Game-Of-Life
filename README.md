Conway's Game of Life
=====================

![Screenshot](https://github.com/mfoo/CoffeeScript-Game-Of-Life/raw/master/screenshot.png "Conway's Game of Life")

This is a [CoffeeScript](http://coffeescript.org/) implementation of [Conway's
Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using the
HTML5 Canvas element for rendering. It obeys the following four rules as laid
out by the Wikipedia page:

* Any live cell with fewer than two live neighbours dies, as if caused by
  under-population.
* Any live cell with two or three live neighbours lives on to the next
  generation.
* Any live cell with more than three live neighbours dies, as if by
  overcrowding.
* Any dead cell with exactly three live neighbours becomes a live cell, as if
  by reproduction.

Usage
=====
In order to run this yourself, you must execute the Makefile. This will compile
the CoffeeScript into JavaScript. Then simply open `index.html` in your browser.
