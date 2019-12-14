
/*
SCENES
------
clickable-initial: clickable white square
monologue-secondary: talking green square who leaves, backdrop is draggable
dialogue-tertiary: pink baby square who talks with you
*/



const wishingwell = {

    start: function()
    {
        interactive.load_scene(wishingwell, wishingwell.scenes.clickable_initial)
    },

    scenes: {
        clickable_initial: {
            start: function()
            {
                // dark green background
                wishingwell.scenes.clickable_initial.bg_initial = "rgb(0, 49, 0)"
        
                // smaller green square
                wishingwell.scenes.clickable_initial.square_secondary_size = 30
                wishingwell.scenes.clickable_initial.square_secondary_color = "rgb(0, 32, 0)"

                wishingwell.scenes.clickable_initial.square_initial_size = 50
                // color is defined differently here because we use transparency
                wishingwell.scenes.clickable_initial.square_initial_color = [255,255,255]
                wishingwell.scenes.clickable_initial.square_initial_anim_timer = 0
                wishingwell.scenes.clickable_initial.square_initial_anim_active = false
                wishingwell.scenes.clickable_initial.square_initial_rotate_speed = .01
                wishingwell.scenes.clickable_initial.square_initial_expand_speed = .1
        
                wishingwell.scenes.clickable_initial.square_initial_mouse_hit = false
            },
        
            mousemove: function(ev)
            {
                wishingwell.scenes.clickable_initial.square_initial_mouse_hit = (ev.offsetX > interactive.width / 2 - wishingwell.scenes.clickable_initial.square_initial_size/2 && 
                    ev.offsetX < interactive.width / 2 + wishingwell.scenes.clickable_initial.square_initial_size/2 && 
                    ev.offsetY > interactive.height / 2 - wishingwell.scenes.clickable_initial.square_initial_size/2 && 
                    ev.offsetY < interactive.height / 2 + wishingwell.scenes.clickable_initial.square_initial_size/2)
            },
        
            mousedown: function(ev)
            {
                if (wishingwell.scenes.clickable_initial.square_initial_mouse_hit)
                    wishingwell.scenes.clickable_initial.square_initial_anim_active = true
            },
        
            loop: function()
            {
                const ctx = interactive.ctx
        
                // dark green background
                ctx.fillStyle = wishingwell.scenes.clickable_initial.bg_initial
                ctx.fillRect(0, 0, interactive.width, interactive.height)
        
                ctx.save()
                ctx.translate(interactive.width/2, interactive.height/2)
                
                // green square
                ctx.fillStyle = wishingwell.scenes.clickable_initial.square_secondary_color
                ctx.fillRect(
                    -wishingwell.scenes.clickable_initial.square_secondary_size/2, 
                    -wishingwell.scenes.clickable_initial.square_secondary_size/2, 
                    wishingwell.scenes.clickable_initial.square_secondary_size,
                    wishingwell.scenes.clickable_initial.square_secondary_size
                )
                
                // white square
                ctx.rotate(wishingwell.scenes.clickable_initial.square_initial_anim_timer * wishingwell.scenes.clickable_initial.square_initial_rotate_speed)
                ctx.fillStyle = "rgb(" + wishingwell.scenes.clickable_initial.square_initial_color[0] + "," + 
                wishingwell.scenes.clickable_initial.square_initial_color[1] + "," + 
                wishingwell.scenes.clickable_initial.square_initial_color[2] + "," + 
                (1-wishingwell.scenes.clickable_initial.square_initial_anim_timer/100) + ")"
        
                ctx.lineWidth = 3
                if (!wishingwell.scenes.clickable_initial.square_initial_anim_active)
                    ctx.strokeStyle = wishingwell.scenes.clickable_initial.square_initial_mouse_hit ? "hotpink" : "rgb(0,0,0,0)"
                else
                    ctx.strokeStyle = "rgb(0,0,0,0)"
        
                ctx.strokeRect(
                    -wishingwell.scenes.clickable_initial.square_initial_size/2, 
                    -wishingwell.scenes.clickable_initial.square_initial_size/2, 
                    wishingwell.scenes.clickable_initial.square_initial_size,
                    wishingwell.scenes.clickable_initial.square_initial_size
                )
                ctx.fillRect(
                    -wishingwell.scenes.clickable_initial.square_initial_size/2 - wishingwell.scenes.clickable_initial.square_initial_anim_timer * wishingwell.scenes.clickable_initial.square_initial_expand_speed, 
                    -wishingwell.scenes.clickable_initial.square_initial_size/2 - wishingwell.scenes.clickable_initial.square_initial_anim_timer * wishingwell.scenes.clickable_initial.square_initial_expand_speed, 
                    wishingwell.scenes.clickable_initial.square_initial_size/2,
                    wishingwell.scenes.clickable_initial.square_initial_size/2
                )
                ctx.fillRect(
                    wishingwell.scenes.clickable_initial.square_initial_anim_timer * wishingwell.scenes.clickable_initial.square_initial_expand_speed, 
                    -wishingwell.scenes.clickable_initial.square_initial_size/2 - wishingwell.scenes.clickable_initial.square_initial_anim_timer * wishingwell.scenes.clickable_initial.square_initial_expand_speed, 
                    wishingwell.scenes.clickable_initial.square_initial_size/2,
                    wishingwell.scenes.clickable_initial.square_initial_size/2
                )
                ctx.fillRect(
                    -wishingwell.scenes.clickable_initial.square_initial_size/2 - wishingwell.scenes.clickable_initial.square_initial_anim_timer * wishingwell.scenes.clickable_initial.square_initial_expand_speed, 
                    wishingwell.scenes.clickable_initial.square_initial_anim_timer * wishingwell.scenes.clickable_initial.square_initial_expand_speed, 
                    wishingwell.scenes.clickable_initial.square_initial_size/2,
                    wishingwell.scenes.clickable_initial.square_initial_size/2
                )
                ctx.fillRect(
                    wishingwell.scenes.clickable_initial.square_initial_anim_timer * wishingwell.scenes.clickable_initial.square_initial_expand_speed, 
                    wishingwell.scenes.clickable_initial.square_initial_anim_timer * wishingwell.scenes.clickable_initial.square_initial_expand_speed, 
                    wishingwell.scenes.clickable_initial.square_initial_size/2,
                    wishingwell.scenes.clickable_initial.square_initial_size/2
                )
                ctx.restore()
        
                // Good ole classic CPU dependent animation speed
                // run this line 100 times, over duration of animation, to explode the square
                if (wishingwell.scenes.clickable_initial.square_initial_anim_active)
                    wishingwell.scenes.clickable_initial.square_initial_anim_timer ++

                if (wishingwell.scenes.clickable_initial.square_initial_anim_timer >= 100)
                    interactive.load_scene(wishingwell, wishingwell.scenes.monologue_secondary)
            }
        },

        monologue_secondary: {
            start: function()
            {
                wishingwell.scenes.monologue_secondary.square_secondary_timer = 0
                wishingwell.scenes.monologue_secondary.free_drag = false
                wishingwell.scenes.monologue_secondary.free_drag_coords = [0,0]
                wishingwell.scenes.monologue_secondary.mouse_down = false

                wishingwell.scenes.dialogue_tertiary.bg_color  = "rgb(251, 252, 255)"
                wishingwell.scenes.dialogue_tertiary.square_color = "rgb(251, 133, 211)"

                wishingwell.scenes.dialogue_tertiary.square_size = 20
            },

            mousedown: function(ev)
            {
                wishingwell.scenes.monologue_secondary.mouse_down = true
            },

            mouseup: function(ev)
            {
                wishingwell.scenes.monologue_secondary.mouse_down = false
            },

            mousemove: function(ev)
            {
                if (wishingwell.scenes.monologue_secondary.mouse_down &&
                    wishingwell.scenes.monologue_secondary.free_drag)
                {
                    wishingwell.scenes.monologue_secondary.free_drag_coords[0] += ev.movementX
                    wishingwell.scenes.monologue_secondary.free_drag_coords[1] += ev.movementY
                }
            },

            loop: function()
            {
                const ctx = interactive.ctx

                if (!wishingwell.scenes.monologue_secondary.mouse_down &&
                    wishingwell.scenes.monologue_secondary.free_drag)
                {
                    wishingwell.scenes.monologue_secondary.free_drag_coords[0] *= 1.03
                    wishingwell.scenes.monologue_secondary.free_drag_coords[1] *= 1.03
                }

                if (Math.abs(wishingwell.scenes.monologue_secondary.free_drag_coords[0]) > interactive.width)
                    interactive.load_scene(wishingwell, wishingwell.scenes.dialogue_tertiary)

                // hidden white background
                ctx.fillStyle = wishingwell.scenes.dialogue_tertiary.bg_color
                ctx.fillRect(0, 0, interactive.width, interactive.height)

                // hidden pink square
                ctx.fillStyle = wishingwell.scenes.dialogue_tertiary.square_color
                ctx.fillRect(interactive.width/2 - wishingwell.scenes.dialogue_tertiary.square_size/2, 
                    interactive.height/2 - wishingwell.scenes.dialogue_tertiary.square_size/2,
                    wishingwell.scenes.dialogue_tertiary.square_size,
                    wishingwell.scenes.dialogue_tertiary.square_size)

                // dark green background
                ctx.fillStyle = wishingwell.scenes.clickable_initial.bg_initial
                ctx.fillRect(wishingwell.scenes.monologue_secondary.free_drag_coords[0], 
                    wishingwell.scenes.monologue_secondary.free_drag_coords[1], 
                    interactive.width, interactive.height)

                // darker green square
                ctx.save()
                ctx.translate(interactive.width/2, interactive.height/2)
                
                if (wishingwell.scenes.monologue_secondary.square_secondary_timer >= 160)
                {
                    ctx.translate(0, 4*(wishingwell.scenes.monologue_secondary.square_secondary_timer - 160))
                    ctx.rotate(
                        (wishingwell.scenes.monologue_secondary.square_secondary_timer - 160) * .07
                    )

                }

                if (4*(wishingwell.scenes.monologue_secondary.square_secondary_timer - 160) > 
                interactive.height + wishingwell.scenes.clickable_initial.square_secondary_size * 2)
                {
                    // green square is done falling
                    wishingwell.scenes.monologue_secondary.free_drag = true

                    //interactive.load_scene(wishingwell, wishingwell.scenes.dialogue_tertiary)
                }

                ctx.fillStyle = wishingwell.scenes.clickable_initial.square_secondary_color
                ctx.fillRect(
                    -wishingwell.scenes.clickable_initial.square_secondary_size/2, 
                    -wishingwell.scenes.clickable_initial.square_secondary_size/2, 
                    wishingwell.scenes.clickable_initial.square_secondary_size,
                    wishingwell.scenes.clickable_initial.square_secondary_size
                )

                if (wishingwell.scenes.monologue_secondary.square_secondary_timer > 60 &&
                    wishingwell.scenes.monologue_secondary.square_secondary_timer < 160)
                {
                    ctx.fillStyle = "white"
                    ctx.fillText("I wasn't planning to meet you this way.", 
                    30, -30)
                }
                ctx.restore()

                wishingwell.scenes.monologue_secondary.square_secondary_timer ++
            }
        },

        dialogue_tertiary: {

            start: function()
            {
                wishingwell.scenes.dialogue_tertiary.bg_color  = "rgb(251, 252, 255)"
                wishingwell.scenes.dialogue_tertiary.square_color = "rgb(251, 133, 211)"

                wishingwell.scenes.dialogue_tertiary.square_size = 20
                wishingwell.scenes.dialogue_tertiary.cursor = [0,0]

                wishingwell.scenes.dialogue_tertiary.decision = null

                wishingwell.scenes.dialogue_tertiary.question = "Do you think the little green square is going to come back?"
                wishingwell.scenes.dialogue_tertiary.reply1 = "Maybe."
                wishingwell.scenes.dialogue_tertiary.reply2 = "No."

                wishingwell.scenes.dialogue_tertiary.waiting = false
                wishingwell.scenes.dialogue_tertiary.wait_timer = 6000 // about 100 seconds
            },

            mousemove: function(ev)
            {
                wishingwell.scenes.dialogue_tertiary.cursor[0] = ev.offsetX
                wishingwell.scenes.dialogue_tertiary.cursor[1] = ev.offsetY
            },

            mousedown: function(ev)
            {
                if (wishingwell.scenes.dialogue_tertiary.question == "Do you think the little green square is going to come back?" &&
                    wishingwell.scenes.dialogue_tertiary.decision == "Maybe.")
                {
                    wishingwell.scenes.dialogue_tertiary.question = "Gosh, I sure hope so."
                    wishingwell.scenes.dialogue_tertiary.reply1 = null
                    wishingwell.scenes.dialogue_tertiary.reply2 = null
                    wishingwell.scenes.dialogue_tertiary.decision = null
                    
                }
                else if ((wishingwell.scenes.dialogue_tertiary.question == "Do you think the little green square is going to come back?" &&
                wishingwell.scenes.dialogue_tertiary.decision == "No.") ||
                (wishingwell.scenes.dialogue_tertiary.question == "Can we wait?" && 
                wishingwell.scenes.dialogue_tertiary.decision == "No."))
                {
                    wishingwell.scenes.dialogue_tertiary.question = "Why do you say that?"
                    wishingwell.scenes.dialogue_tertiary.reply1 = "I made green go away forever."
                    wishingwell.scenes.dialogue_tertiary.reply2 = "I hurt green."
                    wishingwell.scenes.dialogue_tertiary.decision = null
                }
                else if (wishingwell.scenes.dialogue_tertiary.question == "Why do you say that?" && 
                wishingwell.scenes.dialogue_tertiary.decision != null)
                {
                    wishingwell.scenes.dialogue_tertiary.question = "Oh."
                    wishingwell.scenes.dialogue_tertiary.reply1 = null
                    wishingwell.scenes.dialogue_tertiary.reply2 = null
                    wishingwell.scenes.dialogue_tertiary.decision = null   
                }
                else if (wishingwell.scenes.dialogue_tertiary.question == "Oh.")
                {
                    wishingwell.scenes.dialogue_tertiary.question = "I wish you hadn't done that."
                    wishingwell.scenes.dialogue_tertiary.reply1 = null
                    wishingwell.scenes.dialogue_tertiary.reply2 = null
                    wishingwell.scenes.dialogue_tertiary.decision = null
                }
                else if (wishingwell.scenes.dialogue_tertiary.question == "Gosh, I sure hope so.")
                {
                    wishingwell.scenes.dialogue_tertiary.question = "Can we wait?"
                    wishingwell.scenes.dialogue_tertiary.reply1 = "Yes."
                    wishingwell.scenes.dialogue_tertiary.reply2 = "No."
                    wishingwell.scenes.dialogue_tertiary.decision = null
                }
                else if (wishingwell.scenes.dialogue_tertiary.question == "Can we wait?" && 
                wishingwell.scenes.dialogue_tertiary.decision == "Yes.")
                {
                    wishingwell.scenes.dialogue_tertiary.question = null
                    wishingwell.scenes.dialogue_tertiary.reply1 = null
                    wishingwell.scenes.dialogue_tertiary.reply2 = null
                    wishingwell.scenes.dialogue_tertiary.waiting = true
                }
                else if (wishingwell.scenes.dialogue_tertiary.question == "I wish you hadn't done that.")
                { 
                    interactive.load_scene(wishingwell, {loop: interactive.end_adventure_scene})
                }
                else if (wishingwell.scenes.dialogue_tertiary.question == "Is green really coming back?" &&
                wishingwell.scenes.dialogue_tertiary.decision == "No.")
                {
                    interactive.load_scene(wishingwell, {loop: interactive.end_adventure_scene})
                }
                
            },

            loop: function()
            {
                const ctx = interactive.ctx

                 // white background
                 ctx.fillStyle = wishingwell.scenes.dialogue_tertiary.bg_color
                 ctx.fillRect(0, 0, interactive.width, interactive.height)
 
                 // pink square
                 ctx.fillStyle = wishingwell.scenes.dialogue_tertiary.square_color
                 ctx.fillRect(interactive.width/2 - wishingwell.scenes.dialogue_tertiary.square_size/2, 
                     interactive.height/2 - wishingwell.scenes.dialogue_tertiary.square_size/2,
                     wishingwell.scenes.dialogue_tertiary.square_size,
                     wishingwell.scenes.dialogue_tertiary.square_size)


                const dialog_offset_x = -200
                const dialog_hitbox_width = 400

                if (wishingwell.scenes.dialogue_tertiary.question != null)
                {
                    ctx.fillStyle = "black"
                    ctx.fillText(wishingwell.scenes.dialogue_tertiary.question, 
                    interactive.width/2 + dialog_offset_x, interactive.height/2 - 30)
                }

                if (wishingwell.scenes.dialogue_tertiary.waiting)
                {
                    ctx.fillStyle = "black"
                    ctx.save()
                    ctx.font = "30px Arial"

                    // freeze at 94
                    if (wishingwell.scenes.dialogue_tertiary.wait_timer > 94*60)
                        ctx.fillText(~~(wishingwell.scenes.dialogue_tertiary.wait_timer / 60), 
                        interactive.width/2 + dialog_offset_x, interactive.height/2 - 30)
                    else
                        ctx.fillText("94", 
                        interactive.width/2 + dialog_offset_x, interactive.height/2 - 30)
                    
                    ctx.restore()

                    // proceed at 91
                    if (wishingwell.scenes.dialogue_tertiary.wait_timer > 91*60)
                    {
                        wishingwell.scenes.dialogue_tertiary.wait_timer--
                    }
                    else
                    {
                        wishingwell.scenes.dialogue_tertiary.waiting = false
                        wishingwell.scenes.dialogue_tertiary.question = "Is green really coming back?"
                        wishingwell.scenes.dialogue_tertiary.reply1 = "No."
                        wishingwell.scenes.dialogue_tertiary.reply2 = null
                        wishingwell.scenes.dialogue_tertiary.decision = null  
                    }
                }

                if (wishingwell.scenes.dialogue_tertiary.reply1 != null)
                {
                    if (wishingwell.scenes.dialogue_tertiary.cursor[0] > interactive.width/2 + dialog_offset_x &&
                        wishingwell.scenes.dialogue_tertiary.cursor[0] < interactive.width/2 + dialog_hitbox_width + dialog_offset_x &&
                        wishingwell.scenes.dialogue_tertiary.cursor[1] > interactive.height/2 - 30 + interactive.font.size &&
                        wishingwell.scenes.dialogue_tertiary.cursor[1] < interactive.height/2 - 30 + 2*interactive.font.size)
                    {
                        // "maybe" hit box
                        ctx.fillStyle = "#10EECC"
                        ctx.fillRect(interactive.width/2 + dialog_offset_x, interactive.height/2 - 30 + interactive.font.size, dialog_hitbox_width, interactive.font.size)
                    
                        wishingwell.scenes.dialogue_tertiary.decision = wishingwell.scenes.dialogue_tertiary.reply1
                    }
                    else if (wishingwell.scenes.dialogue_tertiary.cursor[0] > interactive.width/2 + dialog_offset_x &&
                        wishingwell.scenes.dialogue_tertiary.cursor[0] < interactive.width/2 + dialog_hitbox_width + dialog_offset_x &&
                        wishingwell.scenes.dialogue_tertiary.cursor[1] > interactive.height/2 - 30 + 2*interactive.font.size &&
                        wishingwell.scenes.dialogue_tertiary.cursor[1] < interactive.height/2 - 30 + 3*interactive.font.size &&
                        wishingwell.scenes.dialogue_tertiary.reply2 != null)
                    {
                        // "no" hit box
                        ctx.fillStyle = "#10EECC"
                        ctx.fillRect(interactive.width/2 + dialog_offset_x, interactive.height/2 - 30 + 2*interactive.font.size, dialog_hitbox_width, interactive.font.size)
                    
                        wishingwell.scenes.dialogue_tertiary.decision = wishingwell.scenes.dialogue_tertiary.reply2
                    }
                    else
                    {
                        wishingwell.scenes.dialogue_tertiary.decision = null
                    }

                    // "maybe" text
                    ctx.fillStyle = "black"
                    ctx.fillText(wishingwell.scenes.dialogue_tertiary.reply1, 
                        interactive.width/2 + dialog_offset_x, interactive.height/2 - 30 + 2*interactive.font.size)

                    // "no" text
                    if (wishingwell.scenes.dialogue_tertiary.reply2 != null)
                    {
                        ctx.fillStyle = "black"
                        ctx.fillText(wishingwell.scenes.dialogue_tertiary.reply2,
                            interactive.width/2 + dialog_offset_x, interactive.height/2 - 30 + 3*interactive.font.size)
                    }
                }
            }
        }
    },
}