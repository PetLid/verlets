import PhysicsComponent from "./components/physics-component.js";

class Point
{
    constructor(options)
    {
        this.pos = { x: options.pos.x, y: options.pos.y };
        this.oldPos = options.oldPos ? { x: options.oldPos.x, y: options.oldPos.y } : { x: this.pos.x, y: this.pos.y };

        this.pinned = options.pinned || false;

        this.physicsComponent = new PhysicsComponent(this, { gravity: 1.81, drag: 10000 });
    }

    update(state)
    {
        var pos = this.pos,
            oldPos = this.oldPos;

        var dt = state.dt;

        if (!this.pinned)
        {
            var vx = pos.x - oldPos.x,
                vy = pos.y - oldPos.y;

            // Save unmodified position since physics component changes it
            var uPos = { x: pos.x, y: pos.y };

            // Modifies pos.x, must be done after calculating velocity
            this.physicsComponent.update(state);

            oldPos.x = uPos.x;
            oldPos.y = uPos.y;

            pos.x += vx; //+ a.x * dt * dt;
            pos.y += vy; //+ a.y * dt * dt;
        }

        this.constrain(state.boundaries);
    }

    constrain(boundaries)
    {
        if (!this.pinned)
        {
            var pos = this.pos,
                oldPos = this.oldPos;

            var friction = .85;

            var vx = (this.pos.x - this.oldPos.x) * friction,
                vy = (this.pos.y - this.oldPos.y) * friction;

            if (pos.y > boundaries.height)
            {
                this.pos.y = boundaries.height;
                this.oldPos.y = pos.y + vy;
                this.pos.x = oldPos.x + vx;
            }

            else if (pos.y < 0)
            {
                this.pos.y = 0;
                this.oldPos.y = pos.y + vy;
            }

            if (pos.x > boundaries.width)
            {
                this.pos.x = boundaries.width;
                this.oldPos.x = pos.x + vx;
            }

            else if (pos.x < 0)
            {
                pos.x = 0;
                oldPos.x = pos.x + vx;
            }
        }
    }

    render(ctx)
    {
        var pos = this.pos;

        var size = 5;

        ctx.save();

        ctx.fillStyle = this.pinned ? "red": "black";
        ctx.fillRect(pos.x - size / 2, pos.y - size / 2, 5, 5);

        ctx.restore();
    }
}

module.exports = Point;
