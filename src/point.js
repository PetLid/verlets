class Point
{
    constructor(options)
    {
        this.pos = { x: options.pos.x, y: options.pos.y };
        this.oldPos = options.oldPos ? { x: options.oldPos.x, y: options.oldPos.y } : { x: this.pos.x, y: this.pos.y };

        this.pinned = options.pinned || false;
    }

    update(state)
    {
        var pos = this.pos,
            oldPos = this.oldPos;

        var a = { x: 0, y: 9.82 * 100 };

        var dt = state.dt;

        if (!this.pinned)
        {
            var vx = pos.x - oldPos.x,
                vy = pos.y - oldPos.y;

            oldPos.x = pos.x;
            oldPos.y = pos.y;

            pos.x += vx + a.x * dt * dt;
            pos.y += vy + a.y * dt * dt;
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

        ctx.fillRect(pos.x - size / 2, pos.y - size / 2, 5, 5);
    }
}

module.exports = Point;
