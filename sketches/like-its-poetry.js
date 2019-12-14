
const likeitspoetry = {

    start: function()
    {
        likeitspoetry.walking = {x:0, y:200, vy:0}
    },

    loop: function ()
    {
        const ctx = interactive.ctx


        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, interactive.width, interactive.height)

        ctx.fillStyle = "black"
        ctx.font = "30px 'Times New Roman'"
        ctx.textBaseline = "top"
        ctx.textAlign = "left"

        ctx.fillText("You are", 0, 0)
        ctx.fillText("Walking", likeitspoetry.walking.x, likeitspoetry.walking.y)

        ctx.textAlign = "right"
        ctx.fillText("until you hit a wall.", interactive.width, 200)


        likeitspoetry.walking.y -= likeitspoetry.walking.vy/60
        likeitspoetry.walking.vy -= 10

        if (likeitspoetry.walking.y > 200)
        {
            likeitspoetry.walking.y = 200
            likeitspoetry.walking.vy = 0
        }
    },

    keydown: function(ev) {

        if (ev.keyCode == 39 && likeitspoetry.walking.x < interactive.width - 344)
        {
            likeitspoetry.walking.x += 10
        }
        if (ev.keyCode == 37)
        {
            likeitspoetry.walking.x -= 10

            if (likeitspoetry.walking.x < 0)
                likeitspoetry.walking.x = 0
        }
        if (ev.keyCode == 32 && likeitspoetry.walking.y == 200)
        {
            likeitspoetry.walking.vy = 200
        }
    }
}