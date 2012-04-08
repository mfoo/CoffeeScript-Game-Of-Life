canvas = $('#conway')[0]
iterationCount = 0

# Specify the width and height of the square used to draw the entities.
entity_size = 10

entities_x = Math.ceil(canvas.width / entity_size)
entities_y = Math.ceil(canvas.height / entity_size)

# The number of entities in our board.
num_entities = entities_x * entities_y

# A single dimensional array to store all the entities. Default value random
# Note: uses row-major ordering
entities = new Array(num_entities)
new_entities = new Array(num_entities)

for i in [0...num_entities]
  entities[i] = Math.floor(Math.random() + 0.5)
  new_entities[i] = entities[i]

render = -> for i in [0..num_entities]
    x = i % entities_x
    y = Math.floor(i / entities_x)
    if canvas.getContext
      ctx = canvas.getContext('2d')
      if entities[i] is 1
        ctx.fillStyle = "orange"
      else
        ctx.fillStyle = "white"
      ctx.fillRect(entity_size * x, entity_size * y, entity_size, entity_size)

    $("#iterationNumber").text(iterationCount)
grid = [
  -1 + -1 * entities_x, -1 * entities_x, 1 + -1 * entities_x,
  -1,   1,
  -1 + entities_x, entities_x, 1 + entities_x
]

step = ->
  for i in [0..num_entities - 1]
    # Get the number of live neighbours from the previous turn.
    # Assume that boundaries wrap around to the other side.
    x = i % entities_x
    y = Math.floor(i / entities_x)
    live_neighbours = 0

    for j in grid
      x = (i + j) % entities_x
      y = Math.floor((i + j) / entities_x)
      if x < 0
        x = entities_x + x
      if y < 0
        y = entities_y + y

      if x >= entities_x
        x = entities_x - x
      if y >= entities_y
        y = entities_y - y
      if canvas.getContext
        ctx = canvas.getContext('2d')
        ctx.fillStyle = "red"
        if entities[y * entities_x + x] is 1
          live_neighbours += 1

        new_entities[i] = entities[i]

        # Any live cell with fewer than two live neighbours dies, as if caused by under-population.
        if live_neighbours < 2 and entities[i] is 1
            new_entities[i] = 0

        # Any live cell with two or three live neighbours lives on to the next generation.
        if (live_neighbours is 2 or live_neighbours is 3) and entities[i] is 1
            new_entities[i] = 1

        # Any live cell with more than three live neighbours dies, as if by overcrowding.
        if live_neighbours > 3 and entities[i] is 1
            new_entities[i] = 0

        # Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        if live_neighbours is 3 and entities[i] is 0
            new_entities[i] = 1

  tmp = entities
  entities = new_entities
  new_entities = tmp
  iterationCount++

tick = ->
    console.log "ticking"
    step()
    render()

toggleEntity = (event) ->
    row = Math.floor((event.pageX - $("#conway").offset().left) / entity_size)
    column = Math.floor((event.pageY - $("#conway").offset().top) / entity_size)
    entities[entities_x * column + row] = 1 - entities[entities_x * column + row]
    render()

render()

timerID = 0

$('#play').click -> timerID = setInterval tick, 60
$("#pause").click -> clearInterval(timerID)
$("#stepper").click -> tick()
$("#conway").click -> toggleEntity(event)
