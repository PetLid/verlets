import World from "../world.js";

class PhysicsComponent
{
    constructor(obj, options)
    {
        this.obj = obj;
        options = options || {};
        this.gravity = options.gravity || 0;
        this.drag = options.drag || 5 * 100 * 10;
        this.forces = { x: 0, y: 0 };
    }

    update(state)
    {
        this.drage();

        // Add gravity
        this.addForce({ x: 0, y: World.gravity });

        //console.log("grav: " + World.gravity);

        var obj = this.obj,
            dt = state.dt;

        var a = this.forces;

        obj.pos.x += a.x * dt * dt;
        obj.pos.y += a.y * dt * dt;


        // Reset forces
        this.forces.x = 0;
        this.forces.y = 0;
    }

    drage()
    {
        var obj = this.obj;
        var pos = obj.pos,
            oldPos = obj.oldPos;

        var vx = pos.x - oldPos.x,
            vy = pos.y - oldPos.y,
            drag = World.drag; //this.drag;

        //console.log("Stragne");

        //console.log(World.drag + " vx: " + vx);

        var dragForce = { x: -1 * drag * vx * vx * vx / Math.abs(vx + 0.001), y: -1 * drag * vy * vy * vy / Math.abs(vy + 0.001) };

        //console.log("Adding force " + dragForce.x + "x" + dragForce.y);
        this.addForce(dragForce);
    }


    addForce(a, m)
    {
        m = m || 1;

        this.forces.x += m * a.x;
        this.forces.y += m * a.y;
    }
}

module.exports = PhysicsComponent;
