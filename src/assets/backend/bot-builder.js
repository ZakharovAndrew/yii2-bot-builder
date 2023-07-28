console.log('Bot Builder Loaded');

class BotBuilder  {
  // calculate distance
  function distance(point1, point2)
  {
      const dx = point1.x - point2.x;
      const dy = point1.y - point2.y;
    
      return Math.sqrt(dx * dx + dy * dy);
  }
}
