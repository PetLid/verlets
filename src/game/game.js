import Point from "../point.js";
import Joint from "../joint.js";
import Box from "../box.js";

export default function()
{
    var canvas,
        points = [],
        joints = [],
        free = false,
        smoothMode = true,
        boxes = [];

    function init(_canvas)
    {
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
                oldPos:
                {
                    x: 149,
                    y: 160
                },
                pinned: true
            }),
            new Point(
            {
                pos:
                {
                    x: 180,
                    y: 160
                },
            })
        ];

        joints = [ new Joint(points[0], points[1]) ];

        boxes[0] = new Box({ pos: { x: 200, y: 300 } });
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

    document.addEventListener("mousedown", function(e)
    {
        console.log("clickity at " + e.clientX + "x" + e.clientY);

        //addJointPoint(e.clientX, e.clientY, e.button != 0);

        addJointBox(e.clientX, e.clientY, e.button != 0);
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
    });

    function addJointBox(x, y, pinned)
    {
        boxes[boxes.length] = new Box({ pos: { x: x, y: y }, size: Math.random() * 20 + 20, rotation: - Math.PI / 4, pinned: pinned });

        var box = boxes[boxes.length-1];

        points[points.length] = box.points[3];
        joints[joints.length] = new Joint(points[points.length - 2], points[points.length - 1]);
        points[points.length] = box.points[1];
    }

    function addJointPoint(x, y, pinned)
    {
        points[points.length] = new Point({ pos: { x: x, y: y }, pinned: pinned });
        joints[joints.length] = new Joint(points[points.length - 2], points[points.length - 1]);

        document.getElementById("nrPoints").innerHTML = points.length;
        document.getElementById("nrJoints").innerHTML = joints.length;
    }

    return {
        'init': init,
        'update': update,
        'render': render
    };
};
