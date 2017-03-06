class World
{
    static init()
    {
        this.gravity = 9.81 * 100;
        this.drag = 1000;
    }

    static test()
    {
        console.log("I AM ALIVE, gravity = " + this.gravity);
    }

    static setGravity(a)
    {
        this.gravity = a * 100;
    }

    static getGravity()
    {
        return this.gravity;
    }
}

module.exports = World;
