import Point from "./point.js";
import Joint from "./joint.js";

class Box
{
    constructor(options)
    {
        this.pos = { x: options.pos.x, y: options.pos.y };
        this.size = options.size || 50;

        this.joints = [];

        var rotation = options.rotation || 0;
        rotation += Math.PI / 4;

        var halfSide = this.size / 2;

        this.points = [
            new Point({ pos: { x: this.pos.x + halfSide * Math.cos(rotation), y: this.pos.y + halfSide * Math.sin(rotation) }}),
            new Point({ pos: { x: this.pos.x + halfSide * Math.cos(rotation + Math.PI/2), y: this.pos.y + halfSide * Math.sin(rotation + Math.PI/2) }}),
            new Point({ pos: { x: this.pos.x + halfSide * Math.cos(rotation + Math.PI), y: this.pos.y + halfSide * Math.sin(rotation + Math.PI) }}),
            new Point({ pos: { x: this.pos.x + halfSide * Math.cos(rotation + 3*Math.PI/2), y: this.pos.y + halfSide * Math.sin(rotation + 3*Math.PI/2) }})
        ];

        if (options.pinned)
        {
            for (var i = 0; i < this.points.length; i += 1)
            {
                this.points[i].pinned = true;
            }
        }

        console.log(this.points);

        for (var i = 0; i < this.points.length-1; i += 1)
        {
            this.joints[i] = new Joint(this.points[i], this.points[i+1]);
        }

        // Connect last with first
        this.joints[this.joints.length] = new Joint(this.points[this.points.length-1], this.points[0]);

        // Stability joint
        this.joints[this.joints.length] = new Joint(this.points[0], this.points[2]);


    }

    update(state)
    {
        var points = this.points,
            joints = this.joints;

        for (var i = 0; i < points.length; i += 1)
        {
            points[i].update(state);
        }

        for (var i = 0; i < joints.length; i += 1)
        {
            joints[i].update(state);
        }
    }

    render(ctx)
    {
        var points = this.points,
            joints = this.joints;

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        for (var i = 0; i < points.length; i += 1)
        {
            points[i].render(ctx);
        }

        for (var i = 0; i < joints.length; i += 1)
        {
            joints[i].render(ctx);
        }
    }
}

module.exports = Box;
