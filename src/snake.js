const Snake = function(head, body) {
  this.head = head;
  this.body = body;
}

Snake.prototype = {
  getBody: function() {
    return this.body;
  },
  getHead: function() {
    return this.head;
  },
  move: function() {
    this.body.push(this.head);
    this.head = this.head.next();
    return this.body.shift();
  },
  grow: function() {
    this.body.unshift(new Position(Infinity, Infinity, this.direction));
  },
  turnLeft: function() {
    this.head = this.head.turnLeft();
  },
  turnRight: function() {
    this.head = this.head.turnRight();
  },
  isSnakeCollideItself : function() {
    // let body = this.body.sli;
    // console.log(this.body[1].x);
    // console.log(this.body[1].y);
    return this.body.some(function(bodyPosition) {
      return bodyPosition.x == this.head.x && bodyPosition.y == this.head.y;
    });
  }
}
