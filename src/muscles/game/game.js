import Point from "../../point.js";
import Joint from "../../joint.js";
import Box from "../../box.js";
import World from "../../world.js";
import Rope from "../../rope.js";

export default function()
{
    var canvas,
        points = [],
        joints = [],
        free = false,
        smoothMode = true,
        boxes = [],
        rope
        ;

    function init(_canvas)
    {
        World.init();
        World.test();
        World.gravity = 0.0; // !

        canvas = _canvas;

        points =
        [
            new Point(
            {
                pos:
                {
                    x: 150,
                    y: 140
                },
                pinned: false
            }),
            new Point(
            {
                pos:
                {
                    x: 180,
                    y: 160
                },
            }),
            new Point(
            {
                pos:
                {
                    x: 140,
                    y: 180
                },
            })
        ];

        joints = [ new Joint(points[0], points[1]), new Joint(points[1], points[2]) ];


        //boxes[0] = new Box({ pos: { x: 200, y: 300 } });

    }

    function update(state)
    {
        state.boundaries = { width: canvas.width, height: canvas.height };

        for (var i = 0; i < points.length; i += 1)
        {
            points[i].update(state);
        }

        for (var i = 0; i < joints.length; i += 1)
        {
            joints[i].update(state);
        }

        for (var i = 0; i < boxes.length; i += 1)
        {
            boxes[i].update(state);
        }

    }

    function render(ctx)
    {

        ctx.fillStyle = "#000";

        for (var i = 0; i < points.length; i += 1)
        {
            points[i].render(ctx);
        }

        if (smoothMode)
        {
            ctx.strokeStyle = "#ddd";
            ctx.lineWidth = 1;
        }
        else {
            ctx.strokeStyle = "#222";
            ctx.lineWidth = 2;
        }

        for (var i = 0; i < joints.length; i += 1)
        {
            var a = joints[i].a,
                b = joints[i].b;

            var grd = ctx.createLinearGradient(a.pos.x, a.pos.y, b.pos.x, b.pos.y);

            var colorA = a.pinned ? "red": "black";
            var colorB = b.pinned ? "red": "black";

            grd.addColorStop(0, colorA);
            grd.addColorStop(1, colorB);

            ctx.strokeStyle = grd;

            joints[i].render(ctx);
        }

        if (smoothMode)
        {
            ctx.strokeStyle = "#222";
            ctx.lineWidth = 2;
        }
        else {
            ctx.strokeStyle = "#ddd";
            ctx.lineWidth = 1;
        }

        ctx.beginPath();

        ctx.moveTo(points[0].pos.x, points[0].pos.y);

        for (var i = 1; i < points.length - 1; i += 1)
        {
            var xc = (points[i].pos.x + points[i + 1].pos.x) / 2;
            var yc = (points[i].pos.y + points[i + 1].pos.y) / 2;

            ctx.quadraticCurveTo(points[i].pos.x, points[i].pos.y, xc, yc);
        }

        ctx.lineTo(points[points.length-1].pos.x, points[points.length-1].pos.y);
        ctx.stroke();

        for (var i = 0; i < boxes.length; i += 1)
        {
            boxes[i].render(ctx);
        }

    }

    document.addEventListener("mousemove", function(e)
    {
    });

    document.addEventListener("keydown", function(e)
    {
        console.log("you pressed " + e.keyCode);
        // Free all points
        if (e.keyCode == 70)
        {
            for (var i = 0; i < points.length; i += 1)
            {
                points[i].pinned = free;
            }

            free = !free;
        }

        // Change rendering mode
        if (e.keyCode == 82)
        {
            smoothMode = !smoothMode;
        }

        if (e.keyCode == 32)
        {
            World.gravity = -1 * World.gravity;
        }
    });

    return {
        'init': init,
        'update': update,
        'render': render
    };
};
