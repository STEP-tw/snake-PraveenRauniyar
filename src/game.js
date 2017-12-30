let Game = function () {
  this.score = 0;
};

Game.prototype.addScore = function(){
  this.score = 10;
  return this.score;
}
