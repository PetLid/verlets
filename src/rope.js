import Point from "./point.js";
import Joint from "./joint.js";

class Rope
{
    constructor(pos, length, resolution)
    {
        //this.pos = { x: pos.x, y: pos.y };

        length = length || 200;

        resolution = resolution || 10;

        //this.points = [ new Point({ pos: { this.pos.x, this.pos.y } } ];

        this.points = [];
        this.joints = [];

        for (var i = 0; i < resolution; i += 1)
        {
            this.points[i] = new Point({ pos: { x: pos.x + Math.random() * 5 - 2.5, y: pos.y + i * length / resolution }});
        }

        for (var i = 0; i < resolution - 1; i += 1)
        {
            this.joints[i] = new Joint(this.points[i], this.points[i+1], false, false);
        }

        // Pin base
        this.points[0].pinned = true;
    }

    update(state)
    {
        for (var i = 0; i < this.points.length; i += 1)
        {
            this.points[i].update(state);
        }

        for (var i = 0; i < this.joints.length; i += 1)
        {
            this.joints[i].update(state);
        }
    }

    render(ctx)
    {
        ctx.save();

        ctx.beginPath();


        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 5;

        var points = this.points;


        ctx.moveTo(points[0].pos.x, points[0].pos.y);

        for (var i = 1; i < points.length - 1; i += 1)
        {
            var xc = (points[i].pos.x + points[i + 1].pos.x) / 2;
            var yc = (points[i].pos.y + points[i + 1].pos.y) / 2;

            ctx.quadraticCurveTo(points[i].pos.x, points[i].pos.y, xc, yc);
        }

        ctx.lineTo(points[points.length-1].pos.x, points[points.length-1].pos.y);
        ctx.stroke();

        ctx.restore();
    }

    collidesWith(point)
    {
      var edges = this.joints,
          index
          ;

      var collides = false;

      // For each edge
      for(index = 0; index < edges.length && !collides; index += 1)
      {
          collides = edges[index].collidesWith(point);
      }

      if (collides)
      {
        index -= 1;

        var vector = { x: edges[index].b.pos.x - point.x, y: edges[index].b.pos.y - point.y };

        // !!! Change to nearest point
        edges[index].b.physicsComponent.addForce(vector, 100 * 100);

        console.log("Collision!!!");
      }
    }

}

module.exports = Rope;
