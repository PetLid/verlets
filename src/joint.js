'use strict';

class Joint {

    constructor(a, b, distance, keepDistance)
    {
        this.a = a;
        this.b = b;

        this.maxDistance = distance ||  Math.sqrt(Math.pow(a.pos.x - b.pos.x, 2) + Math.pow(a.pos.y - b.pos.y, 2));
        this.keepDistance = keepDistance || true;
    }

    update(state)
    {
        var a = this.a,
            b = this.b;

        var dt = state.dt;

        var distance = Math.sqrt(Math.pow(a.pos.x - b.pos.x, 2) + Math.pow(a.pos.y - b.pos.y, 2));
        var diff = this.maxDistance - distance;

        // Percentage of movement
        var pom = (diff / distance) / 2;


       if (distance > this.maxDistance || this.keepDistance)
       {
            var dx = b.pos.x - a.pos.x;
            var dy = b.pos.y - a.pos.y;

            var offsetX = dx * pom;
            var offsetY = dy * pom;

            if (!a.pinned)
            {
                if (typeof a.vel !== "undefined")
                {
                    a.vel.x -= offsetX;
                    a.vel.y -= offsetY;
                }
                else
                {
                    a.pos.x -= offsetX;
                    a.pos.y -= offsetY;
                }
            }

            if (!b.pinned)
            {
                if (typeof b.vel !== "undefined")
                {
                    b.vel.x += offsetX;
                    b.vel.y += offsetY;
                }
                else {
                    // No anchors
                    b.pos.x += offsetX;
                    b.pos.y += offsetY;
                }
            }

       }
    }

    render(ctx)
    {
        var a = this.a,
            b = this.b;

        ctx.save();

        //ctx.strokeStyle = "#888";
        //ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(a.pos.x, a.pos.y);
        ctx.lineTo(b.pos.x, b.pos.y);
        ctx.stroke();

        ctx.restore();
    }
}

module.exports = Joint;
