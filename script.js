const canvas = document.getElementById("pookalam");
const ctx = canvas.getContext("2d");

let W;
let H;
let cx;
let cy;

let startTime = null;

const ANIMATION_TIME = 10000;




const C = {

    yellow: "#f6c329",
    gold: "#d99a1d",

    orange: "#ed7628",
    lightOrange: "#f28b2c",

    red: "#d93630",
    deepRed: "#a92832",

    maroon: "#70172d",

    cream: "#fff7df",

    background: "#f8edcf"
};



function resizeCanvas() {


    const size = Math.min(
        window.innerWidth * 0.88,
        window.innerHeight * 0.78,
        900
    );

    const dpr = window.devicePixelRatio || 1;

    W = size;
    H = size;

    canvas.width = W * dpr;
    canvas.height = H * dpr;

    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    cx = W / 2;
    cy = H / 2;
}


function clamp(value) {

    return Math.max(
        0,
        Math.min(1, value)
    );
}


function ease(value) {

    value = clamp(value);

    return value * value * (3 - 2 * value);
}


function polar(radius, angle) {

    return {

        x:
            cx +
            Math.cos(angle) * radius,

        y:
            cy +
            Math.sin(angle) * radius
    };
}




function circle(
    x,
    y,
    radius,
    color,
    opacity = 1
) {

    ctx.save();

    ctx.globalAlpha = opacity;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = color;

    ctx.fill();

    ctx.restore();
}



function petal(
    x,
    y,
    length,
    width,
    angle,
    color,
    opacity = 1
) {

    ctx.save();

    ctx.translate(
        x,
        y
    );

    ctx.rotate(angle);

    ctx.globalAlpha = opacity;

    ctx.beginPath();

    ctx.moveTo(
        0,
        0
    );

    ctx.bezierCurveTo(

        width,
        -length * 0.28,

        width * 0.95,
        -length * 0.72,

        0,
        -length
    );

    ctx.bezierCurveTo(

        -width * 0.95,
        -length * 0.72,

        -width,
        -length * 0.28,

        0,
        0
    );

    ctx.closePath();

    ctx.fillStyle = color;

    ctx.fill();

    ctx.restore();
}


function flower(
    x,
    y,
    radius,
    petalCount,
    petalColor,
    centerColor,
    opacity = 1
) {

    for (
        let i = 0;
        i < petalCount;
        i++
    ) {

        const angle =
            i *
            Math.PI *
            2 /
            petalCount;

        petal(

            x,
            y,

            radius,

            radius * 0.38,

            angle,

            petalColor,

            opacity
        );
    }


    circle(
        x,
        y,
        radius * 0.20,
        centerColor,
        opacity
    );


    circle(
        x,
        y,
        radius * 0.055,
        C.gold,
        opacity
    );
}


function curvedShape(
    angle,
    innerRadius,
    outerRadius,
    width,
    color,
    opacity = 1
) {

    const half =
        width / 2;


    const left =
        polar(
            innerRadius,
            angle - half
        );


    const right =
        polar(
            innerRadius,
            angle + half
        );


    const tip =
        polar(
            outerRadius,
            angle
        );


    const leftControl =
        polar(
            outerRadius * 0.70,
            angle -
            half * 1.10
        );


    const rightControl =
        polar(
            outerRadius * 0.70,
            angle +
            half * 1.10
        );


    const base =
        polar(
            innerRadius * 0.48,
            angle
        );


    ctx.save();

    ctx.globalAlpha =
        opacity;


    ctx.beginPath();


    ctx.moveTo(
        left.x,
        left.y
    );


    ctx.bezierCurveTo(

        leftControl.x,
        leftControl.y,

        tip.x,
        tip.y,

        tip.x,
        tip.y
    );


    ctx.bezierCurveTo(

        rightControl.x,
        rightControl.y,

        right.x,
        right.y,

        right.x,
        right.y
    );


    ctx.quadraticCurveTo(

        base.x,
        base.y,

        left.x,
        left.y
    );


    ctx.closePath();

    ctx.fillStyle =
        color;

    ctx.fill();

    ctx.restore();
}



function drawBase(progress) {

    const p =
        ease(progress);


    const R =
        W * 0.425;




    circle(
        cx,
        cy,
        R,
        C.maroon,
        p
    );


    circle(
        cx,
        cy,
        R * 0.968,
        C.gold,
        p
    );



    circle(
        cx,
        cy,
        R * 0.947,
        C.cream,
        p
    );


    circle(
        cx,
        cy,
        R * 0.930,
        C.red,
        p
    );

    circle(
        cx,
        cy,
        R * 0.900,
        C.orange,
        p
    );


    circle(
        cx,
        cy,
        R * 0.862,
        C.yellow,
        p
    );
}



function outerFlowers(progress) {

    const p =
        ease(progress);


    const count = 56;

    const radius =
        W * 0.377;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            Math.PI *
            2 /
            count;


        const pos =
            polar(
                radius,
                angle
            );


        let color;


        if (
            i % 4 === 0
        ) {

            color =
                C.cream;

        }
        else if (
            i % 2 === 0
        ) {

            color =
                C.orange;

        }
        else {

            color =
                C.yellow;
        }


        flower(

            pos.x,
            pos.y,

            W * 0.017,

            6,

            color,

            C.maroon,

            p
        );
    }
}



function outerPetals(progress) {

    const p =
        ease(progress);


    const count = 32;

    const radius =
        W * 0.335;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            Math.PI *
            2 /
            count;


        const pos =
            polar(
                radius,
                angle
            );


        petal(

            pos.x,
            pos.y,

            W * 0.060,

            W * 0.025,

            angle,

            i % 2 === 0
                ? C.orange
                : C.red,

            p
        );
    }
}



function mainSpokes(progress) {

    const p =
        ease(progress);


    const count = 8;

    const spacing =
        Math.PI *
        2 /
        count;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            spacing -
            Math.PI / 2;



        curvedShape(

            angle,

            W * 0.075,

            W * 0.340,

            spacing * 0.62,

            C.red,

            p
        );



        curvedShape(

            angle,

            W * 0.105,

            W * 0.300,

            spacing * 0.40,

            C.orange,

            p
        );



        curvedShape(

            angle,

            W * 0.125,

            W * 0.255,

            spacing * 0.25,

            C.yellow,

            p
        );


        curvedShape(

            angle,

            W * 0.140,

            W * 0.225,

            spacing * 0.105,

            C.cream,

            p
        );
    }
}



function spokeFlowers(progress) {

    const p =
        ease(progress);


    const count = 8;

    const spacing =
        Math.PI *
        2 /
        count;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            spacing -
            Math.PI / 2;


        const data = [

            {
                radius: 0.315,
                size: 0.017,
                color: C.cream
            },

            {
                radius: 0.275,
                size: 0.015,
                color: C.orange
            },

            {
                radius: 0.235,
                size: 0.014,
                color: C.cream
            },

            {
                radius: 0.195,
                size: 0.012,
                color: C.yellow
            }
        ];


        data.forEach(
            (item, index) => {

                const pos =
                    polar(

                        W *
                        item.radius,

                        angle
                    );


                flower(

                    pos.x,
                    pos.y,

                    W *
                    item.size,

                    index % 2 === 0
                        ? 6
                        : 7,

                    item.color,

                    C.maroon,

                    p
                );
            }
        );
    }
}



function betweenSpokeMotifs(progress) {

    const p =
        ease(progress);


    const count = 8;

    const spacing =
        Math.PI *
        2 /
        count;


    for (
        let i = 0;
        i < count;
        i++
    ) {



        const angle =
            i *
            spacing -
            Math.PI / 2 +
            spacing / 2;



        curvedShape(

            angle,

            W * 0.075,

            W * 0.285,

            spacing * 0.38,

            C.orange,

            p
        );



        curvedShape(

            angle,

            W * 0.105,

            W * 0.235,

            spacing * 0.20,

            C.deepRed,

            p
        );




        const mainFlower =
            polar(
                W * 0.255,
                angle
            );


        flower(

            mainFlower.x,
            mainFlower.y,

            W * 0.023,

            7,

            C.cream,

            C.maroon,

            p
        );


        const smallFlower =
            polar(
                W * 0.185,
                angle
            );


        flower(

            smallFlower.x,
            smallFlower.y,

            W * 0.015,

            6,

            C.orange,

            C.yellow,

            p
        );
    }
}


function secondaryRing(progress) {

    const p =
        ease(progress);


    const count = 24;

    const radius =
        W * 0.305;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            Math.PI *
            2 /
            count;


        const pos =
            polar(
                radius,
                angle
            );


        flower(

            pos.x,
            pos.y,

            W * 0.010,

            6,

            i % 2 === 0
                ? C.cream
                : C.orange,

            C.maroon,

            p
        );
    }
}



function innerPetalRing(progress) {

    const p =
        ease(progress);


    const count = 16;

    const radius =
        W * 0.155;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            Math.PI *
            2 /
            count;


        const pos =
            polar(
                radius,
                angle
            );


        petal(

            pos.x,
            pos.y,

            W * 0.060,

            W * 0.023,

            angle,

            i % 2 === 0
                ? C.red
                : C.orange,

            p
        );
    }
}



function innerFlowers(progress) {

    const p =
        ease(progress);


    const count = 16;

    const radius =
        W * 0.125;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            Math.PI *
            2 /
            count;


        const pos =
            polar(
                radius,
                angle
            );


        flower(

            pos.x,
            pos.y,

            W * 0.014,

            6,

            C.cream,

            C.maroon,

            p
        );
    }
}



function centerFlower(progress) {

    const p =
        ease(progress);


    if (p <= 0) {
        return;
    }



    for (
        let i = 0;
        i < 14;
        i++
    ) {

        petal(

            cx,
            cy,

            W * 0.092,

            W * 0.039,

            i *
            Math.PI *
            2 /
            14,

            i % 2 === 0
                ? C.deepRed
                : C.red,

            p
        );
    }



    for (
        let i = 0;
        i < 11;
        i++
    ) {

        petal(

            cx,
            cy,

            W * 0.066,

            W * 0.028,

            i *
            Math.PI *
            2 /
            11,

            C.orange,

            p
        );
    }




    for (
        let i = 0;
        i < 9;
        i++
    ) {

        petal(

            cx,
            cy,

            W * 0.044,

            W * 0.020,

            i *
            Math.PI *
            2 /
            9,

            C.yellow,

            p
        );
    }



    circle(

        cx,
        cy,

        W * 0.031 * p,

        C.maroon
    );


    circle(

        cx,
        cy,

        W * 0.013 * p,

        C.gold
    );
}



function finalDetails(progress) {

    const p =
        ease(progress);


    const count = 32;

    const radius =
        W * 0.350;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            Math.PI *
            2 /
            count;


        const pos =
            polar(
                radius,
                angle
            );


        flower(

            pos.x,
            pos.y,

            W * 0.007,

            5,

            i % 2 === 0
                ? C.cream
                : C.orange,

            C.maroon,

            p
        );
    }
}



function draw(progress) {

    ctx.clearRect(
        0,
        0,
        W,
        H
    );



    ctx.fillStyle =
        C.background;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );



    drawBase(

        clamp(
            progress / 0.08
        )
    );



    if (
        progress > 0.05
    ) {

        outerFlowers(

            clamp(
                (progress - 0.05) /
                0.10
            )
        );
    }



    if (
        progress > 0.12
    ) {

        outerPetals(

            clamp(
                (progress - 0.12) /
                0.10
            )
        );
    }


    if (
        progress > 0.20
    ) {

        mainSpokes(

            clamp(
                (progress - 0.20) /
                0.14
            )
        );
    }




    if (
        progress > 0.30
    ) {

        spokeFlowers(

            clamp(
                (progress - 0.30) /
                0.11
            )
        );
    }



    if (
        progress > 0.40
    ) {

        betweenSpokeMotifs(

            clamp(
                (progress - 0.40) /
                0.14
            )
        );
    }



    if (
        progress > 0.52
    ) {

        secondaryRing(

            clamp(
                (progress - 0.52) /
                0.09
            )
        );
    }




    if (
        progress > 0.60
    ) {

        innerPetalRing(

            clamp(
                (progress - 0.60) /
                0.09
            )
        );
    }


   

    if (
        progress > 0.68
    ) {

        innerFlowers(

            clamp(
                (progress - 0.68) /
                0.08
            )
        );
    }




    if (
        progress > 0.76
    ) {

        centerFlower(

            clamp(
                (progress - 0.76) /
                0.12
            )
        );
    }



    if (
        progress > 0.88
    ) {

        finalDetails(

            clamp(
                (progress - 0.88) /
                0.12
            )
        );
    }
}



function animate(timestamp) {

    if (!startTime) {

        startTime =
            timestamp;
    }


    const elapsed =
        timestamp -
        startTime;


    const progress =
        clamp(
            elapsed /
            ANIMATION_TIME
        );


    draw(progress);


    requestAnimationFrame(
        animate
    );
}




canvas.addEventListener(
    "click",
    () => {

        startTime = null;
    }
);




window.addEventListener(
    "resize",
    resizeCanvas
);




resizeCanvas();

requestAnimationFrame(
    animate
);
