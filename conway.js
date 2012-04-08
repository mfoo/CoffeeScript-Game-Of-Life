(function() {
  var canvas, entities, entities_x, entities_y, entity_size, grid, initialise, iterationCount, new_entities, num_entities, render, step, tick, timerID, toggleEntity;

  canvas = $('#conway')[0];

  iterationCount = 0;

  entity_size = 10;

  entities_x = Math.ceil(canvas.width / entity_size);

  entities_y = Math.ceil(canvas.height / entity_size);

  num_entities = entities_x * entities_y;

  timerID = 0;

  entities = new Array(num_entities);

  new_entities = new Array(num_entities);

  grid = [-1 + -1 * entities_x, -1 * entities_x, 1 + -1 * entities_x, -1, 1, -1 + entities_x, entities_x, 1 + entities_x];

  initialise = function() {
    var i, _results;
    _results = [];
    for (i = 0; 0 <= num_entities ? i < num_entities : i > num_entities; 0 <= num_entities ? i++ : i--) {
      entities[i] = Math.floor(Math.random() + 0.5);
      new_entities[i] = entities[i];
      _results.push(iterationCount = 0);
    }
    return _results;
  };

  render = function() {
    var ctx, i, x, y;
    if (canvas.getContext) {
      ctx = canvas.getContext('2d');
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "orange";
      for (i = 0; 0 <= num_entities ? i <= num_entities : i >= num_entities; 0 <= num_entities ? i++ : i--) {
        x = i % entities_x;
        y = Math.floor(i / entities_x);
        if (entities[i] === 1) {
          ctx.fillRect(entity_size * x, entity_size * y, entity_size, entity_size);
        }
      }
    }
    return $("#iterationNumber").text(iterationCount);
  };

  step = function() {
    var i, j, live_neighbours, tmp, x, y, _i, _len, _ref;
    for (i = 0, _ref = num_entities - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      live_neighbours = 0;
      for (_i = 0, _len = grid.length; _i < _len; _i++) {
        j = grid[_i];
        x = (i + j) % entities_x;
        y = Math.floor((i + j) / entities_x);
        if (x < 0) x = entities_x + x;
        if (y < 0) y = entities_y + y;
        if (x >= entities_x) x = entities_x - x;
        if (y >= entities_y) y = entities_y - y;
        if (entities[y * entities_x + x] === 1) live_neighbours += 1;
        new_entities[i] = entities[i];
        if (live_neighbours < 2 && entities[i] === 1) new_entities[i] = 0;
        if ((live_neighbours === 2 || live_neighbours === 3) && entities[i] === 1) {
          new_entities[i] = 1;
        }
        if (live_neighbours > 3 && entities[i] === 1) new_entities[i] = 0;
        if (live_neighbours === 3 && entities[i] === 0) new_entities[i] = 1;
      }
    }
    tmp = entities;
    entities = new_entities;
    new_entities = tmp;
    return iterationCount++;
  };

  tick = function() {
    step();
    return render();
  };

  toggleEntity = function(event) {
    var column, row;
    row = Math.floor((event.pageX - $("#conway").offset().left) / entity_size);
    column = Math.floor((event.pageY - $("#conway").offset().top) / entity_size);
    entities[entities_x * column + row] = 1 - entities[entities_x * column + row];
    return render();
  };

  initialise();

  render();

  $('#play').click(function() {
    return timerID = setInterval(tick, 60);
  });

  $("#pause").click(function() {
    return clearInterval(timerID);
  });

  $("#stepper").click(function() {
    return tick();
  });

  $("#conway").click(function() {
    return toggleEntity(event);
  });

  $("#randomise").click(function() {
    clearInterval(timerID);
    initialise();
    return render();
  });

}).call(this);
