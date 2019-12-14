
const fillRotatedRect = function(ctx, x, y, w, h)
{
    const d = 1.3
    ctx.beginPath()
    ctx.moveTo(x+w/2-w/2/d, y+h/2-h/2/d)
    ctx.lineTo(x+w/d, y+h/2-h/2/d)
    ctx.lineTo(x+w/2+w/2*d, y+h/d)
    ctx.lineTo(x+w/2-w/2*d, y+h/d)
    ctx.lineTo(x+w/2-w/2/d, y+h/2-h/2/d)
    ctx.fill()
}

function distance(x1,y1,x2,y2)
{
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
}

const artofwar = {

    scenes: {
        intro: {

            start: function()
            {
                artofwar.scenes.intro.clicks = 0
            },

            mousedown: function(ev)
            {
                artofwar.scenes.intro.clicks++

                if (artofwar.scenes.intro.clicks == 1)
                    interactive.load_scene(artofwar, artofwar.scenes.greenball)
            },

            loop: function()
            {
                const ctx = interactive.ctx

                ctx.fillStyle = "black"
                ctx.fillRect(0, 0, interactive.width, interactive.height)

                interactive.ctx.textBaseline = "middle"
                interactive.ctx.textAlign = "center"
                interactive.ctx.fillStyle = "white"
                interactive.ctx.font = "24px Times New Roman"
                ctx.fillText("~ Evade the Bees ~", interactive.width/2, interactive.height/2)

                // todo figure out how to play sounds/Annoying_Alien...
            }
        },

        greenball: {

            start: function()
            {
                artofwar.scenes.greenball.ball_y_pos = 100
                artofwar.scenes.greenball.ball_y_vel = 0
                artofwar.scenes.greenball.cursor = [0,0]

                artofwar.scenes.greenball.ball_color = "rgb(10,200,70)"
                artofwar.scenes.greenball.goaround = 0

                artofwar.scenes.greenball.gravity = true
            },

            mousemove: function(ev)
            {
                artofwar.scenes.greenball.cursor[0] = ev.offsetX
                artofwar.scenes.greenball.cursor[1] = ev.offsetY
            },

            mousedown: function(ev)
            {
                // when I click,
                if (distance(interactive.width/2 + artofwar.scenes.greenball.ball_y_pos * .3, 
                    interactive.height/2 - artofwar.scenes.greenball.ball_y_pos, 
                    artofwar.scenes.greenball.cursor[0],
                    artofwar.scenes.greenball.cursor[1]) <= 20)
                {
                    // if it's green,
                    if (artofwar.scenes.greenball.ball_color == "rgb(10,200,70)" &&
                    artofwar.scenes.greenball.goaround == 0)
                    {
                        // become purple
                        artofwar.scenes.greenball.ball_color = "rgb(123,33,220)"
                    }
                    // if it's purple (after another click)
                    else if (artofwar.scenes.greenball.ball_color == "rgb(123,33,220)" &&
                    artofwar.scenes.greenball.goaround == 0)
                    {
                        // turn deep blue
                        artofwar.scenes.greenball.ball_color = "rgb(13,33,220)"
                    }
                    else if (artofwar.scenes.greenball.ball_color == "rgb(13,33,220)" &&
                    artofwar.scenes.greenball.goaround == 0)
                    {
                        // now red
                        artofwar.scenes.greenball.ball_color = "rgb(226,15,45)"

                        // we also define a "goaround", the next time things will be different
                        artofwar.scenes.greenball.goaround = 1
                    } 
                    // from red
                    else if (artofwar.scenes.greenball.ball_color == "rgb(226,15,45)" &&
                    artofwar.scenes.greenball.goaround == 1)
                    {
                        // become green
                        artofwar.scenes.greenball.ball_color = "rgb(10,200,70)"
                    }
                    // green becomes 
                    else if (artofwar.scenes.greenball.ball_color == "rgb(10,200,70)" &&
                    artofwar.scenes.greenball.goaround == 1)
                    {
                        // purple
                        artofwar.scenes.greenball.ball_color = "rgb(123,33,220)"
                    }
                    // purple makes
                    else if (artofwar.scenes.greenball.ball_color == "rgb(123,33,220)" &&
                    artofwar.scenes.greenball.goaround == 1)
                    {
                        // blue
                        artofwar.scenes.greenball.ball_color = "rgb(13,33,220)"
                    }
                    // but blue
                    else if (artofwar.scenes.greenball.ball_color == "rgb(13,33,220)" &&
                    artofwar.scenes.greenball.goaround == 1)
                    {
                        // makes yellow this time!
                        artofwar.scenes.greenball.ball_color = "rgb(226,195,45)"
                    }
                }

                // if mouse clicks shadow
                if (distance(interactive.width/2 - artofwar.scenes.greenball.ball_y_pos * 1.2, 
                    (interactive.height/2 + artofwar.scenes.greenball.ball_y_pos * .5) + 15, 
                    artofwar.scenes.greenball.cursor[0],
                    artofwar.scenes.greenball.cursor[1]) <= 20 + artofwar.scenes.greenball.ball_y_pos/20)
                {
                    // only if the ball is yellow
                    if (artofwar.scenes.greenball.ball_color == "rgb(226,195,45)" && artofwar.scenes.greenball.gravity)
                    {   
                        artofwar.scenes.greenball.gravity = false
                        artofwar.scenes.greenball.ball_y_vel = 0

                        interactive.load_scene(artofwar, {loop: interactive.end_adventure_scene})
                    }
                }
            },

            loop: function()
            {
                // backdrop
                const ctx = interactive.ctx
                ctx.fillStyle = "rgb(30, 125, 212)"
                ctx.fillRect(0, 0, interactive.width, interactive.height)

                // selection indicator thickness
                ctx.lineWidth = 3

                // green ball shadow
                ctx.fillStyle = "rgb(10, 10, 40, .1)"
                ctx.beginPath()
                ctx.save()
                ctx.scale(1,.5)
                ctx.arc(interactive.width/2 - artofwar.scenes.greenball.ball_y_pos * 1.2, 
                    (interactive.height/2 + artofwar.scenes.greenball.ball_y_pos * .5)*2 + 30, 
                    20 + artofwar.scenes.greenball.ball_y_pos/20, 0, 7)
                ctx.restore()
                ctx.fill()

                // if mouse hovers over shadow, add indicator
                if (distance(interactive.width/2 - artofwar.scenes.greenball.ball_y_pos * 1.2, 
                    (interactive.height/2 + artofwar.scenes.greenball.ball_y_pos * .5) + 15, 
                    artofwar.scenes.greenball.cursor[0],
                    artofwar.scenes.greenball.cursor[1]) <= 20 + artofwar.scenes.greenball.ball_y_pos/20)
                {
                    // only if the ball is yellow
                    if (artofwar.scenes.greenball.ball_color == "rgb(226,195,45)" && artofwar.scenes.greenball.gravity)
                        ctx.fill()
                }

                // green ball
                ctx.fillStyle = artofwar.scenes.greenball.ball_color
                ctx.beginPath()
                ctx.arc(interactive.width/2 + artofwar.scenes.greenball.ball_y_pos * .3, 
                    interactive.height/2 - artofwar.scenes.greenball.ball_y_pos, 20, 0, 7)

                ctx.fill()

                // if mouse hovers over ball, add indicator
                if (distance(interactive.width/2 + artofwar.scenes.greenball.ball_y_pos * .3, 
                    interactive.height/2 - artofwar.scenes.greenball.ball_y_pos, 
                    artofwar.scenes.greenball.cursor[0],
                    artofwar.scenes.greenball.cursor[1]) <= 20)
                {
                    // unless the ball is yellow
                    if (artofwar.scenes.greenball.ball_color != "rgb(226,195,45)")
                        ctx.stroke()
                }

                // physics
                artofwar.scenes.greenball.ball_y_pos += artofwar.scenes.greenball.ball_y_vel

                if (artofwar.scenes.greenball.gravity)
                    artofwar.scenes.greenball.ball_y_vel -= .05

                    if (artofwar.scenes.greenball.ball_y_pos <= 0)
                    artofwar.scenes.greenball.ball_y_vel = Math.abs(artofwar.scenes.greenball.ball_y_vel)
            }
        }

    },

    start: function()
    {
        interactive.load_scene(artofwar, artofwar.scenes.intro)
    }
}