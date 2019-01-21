var positionAdjustedToGrid = function positionAdjustedToGrid(position, gridSize) {
  if (!gridSize) {
    return position;
  }
  var normalizedPosition = position % gridSize;
  var normalizedStartPoint = position - normalizedPosition;
  return normalizedPosition > gridSize / 2 ? normalizedStartPoint + gridSize : normalizedStartPoint;
};

export default positionAdjustedToGrid;