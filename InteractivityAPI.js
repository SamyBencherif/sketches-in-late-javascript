// @title: InteractivityAPI
// @author: Samy A. Bencherif
// @desc: This file manages events, context, and shared scope.

const interactive = {

    // a sketch that is pending confirmation
    target_sketch: null,

    // the sketch that is currently on screen
    active_sketch: null,

    ctx: null,
    width: null,
    height: null,

    play: function(sketch) {

        // hide the directory listing
        document.getElementById("directory-listing").classList.add("hidden")

        // show the canvas
        document.getElementById("sketch-canvas").classList.remove("hidden")

        // this assignment will enable almost all event functions
        interactive.target_sketch = sketch

        // except for this one, we need to call it once
        if (sketch.start)
            sketch.start()

        // activate event functions: loop, mousedown, keydown, etc
        interactive.register()
    },

    go_home: function() {
        // hide the canvas
        document.getElementById("sketch-canvas").classList.add("hidden")

        // show the directory listing
        document.getElementById("directory-listing").classList.remove("hidden")

        interactive.unregister()
    },

    adventure_entry_scene: function()
    {            
        // Adventure Entry Screen
        interactive.ctx.fillStyle = "black"
        interactive.ctx.fillRect(0, 0, interactive.width, interactive.height)

        interactive.ctx.textBaseline = "middle"
        interactive.ctx.textAlign = "center"
        interactive.ctx.fillStyle = "white"
        interactive.ctx.fillText("Press ESC at any time to end this adventure. " + 
        "Click to continue.", interactive.width/2, interactive.height/2)
    },

    unimplemented_adventure_scene: function()
    {            
        // Adventure Entry Screen
        interactive.ctx.fillStyle = "white"
        interactive.ctx.fillRect(0, 0, interactive.width, interactive.height)

        interactive.ctx.textBaseline = "middle"
        interactive.ctx.textAlign = "center"
        interactive.ctx.fillStyle = "blue"
        interactive.ctx.fillText("No Adventure Here. Press ESC.", interactive.width/2, interactive.height/2)
    },

    end_adventure_scene: function()
    {            
        // Adventure Entry Screen
        interactive.ctx.fillStyle = "white"
        interactive.ctx.fillRect(0, 0, interactive.width, interactive.height)

        interactive.ctx.textBaseline = "middle"
        interactive.ctx.textAlign = "center"
        interactive.ctx.fillStyle = "red"
        interactive.ctx.fillText("End of Adventure. Press ESC.", interactive.width/2, interactive.height/2)
    },

    apply_default_styles: function()
    {

        interactive.accessible_text = false

        if (interactive.accessible_text)
        {
            interactive.font = {
                size: 24
            }
        }
        else
        {
            interactive.font = {
                size: 10
            }
        }

        interactive.ctx.font = interactive.font.size + "px Arial"
    },

    loop: function()
    {
        if (interactive.active_sketch != null)
        {
            if (interactive.active_sketch.loop == null)
            {
                interactive.ctx.save()
                interactive.apply_default_styles()
                interactive.unimplemented_adventure_scene()
                interactive.ctx.restore()
            }
            else
            {
                interactive.ctx.save()
                interactive.apply_default_styles()
                interactive.active_sketch.loop()
                interactive.ctx.restore()
            }
        }
        else
        {
            interactive.ctx.save()
            interactive.apply_default_styles()
            interactive.adventure_entry_scene()
            interactive.ctx.restore()
        }

        if (interactive.should_loop)
            requestAnimationFrame(interactive.loop)
    },

    keydown: function(ev) {

        if (ev.keyCode == 27)
        {
            interactive.go_home()
            return
        }

        if (interactive.active_sketch == null) return
        if (interactive.active_sketch.keydown == null) return
        interactive.active_sketch.keydown(ev)
    },

    keyup: function(ev) {
        if (interactive.active_sketch == null) return
        if (interactive.active_sketch.keyup == null) return
        interactive.active_sketch.keyup(ev)
    },

    keypress: function(ev) {
        if (interactive.active_sketch == null) return
        if (interactive.active_sketch.keypress == null) return
        interactive.active_sketch.keypress(ev)
    },

    mousedown: function(ev) {
        if (interactive.active_sketch == null) 
        {
            if (interactive.target_sketch == null) return

            interactive.active_sketch = interactive.target_sketch
        } else 
        {
            if (interactive.active_sketch.mousedown == null) return
            interactive.active_sketch.mousedown(ev)
        }
    },

    mouseup: function(ev) {
        if (interactive.active_sketch == null) return
        if (interactive.active_sketch.mouseup == null) return
        interactive.active_sketch.mouseup(ev)
    },

    mousemove: function(ev) {
        if (interactive.active_sketch == null) return
        if (interactive.active_sketch.mousemove == null) return
        interactive.active_sketch.mousemove(ev)
    },

    resize: function(ev) {

        document.getElementById("sketch-canvas").style.width = window.innerWidth + "px"
        document.getElementById("sketch-canvas").width = window.innerWidth

        document.getElementById("sketch-canvas").style.height = window.innerHeight + "px"
        document.getElementById("sketch-canvas").height = window.innerHeight

        interactive.width = window.innerWidth
        interactive.height = window.innerHeight

        if (interactive.active_sketch == null) return
        if (interactive.active_sketch.resize == null) return

        interactive.active_sketch.resize(ev)
    },

    register: function() {
        interactive.ctx = document.getElementById("sketch-canvas").getContext("2d")
        document.body.addEventListener("keydown", interactive.keydown)
        document.body.addEventListener("keyup", interactive.keyup)
        document.body.addEventListener("keypress", interactive.keypress)
        document.body.addEventListener("mousedown", interactive.mousedown)
        document.body.addEventListener("mouseup", interactive.mouseup)
        document.body.addEventListener("mousemove", interactive.mousemove)
        window.addEventListener("resize", interactive.resize)
        interactive.should_loop = true
        interactive.resize()
        requestAnimationFrame(interactive.loop)
    },

    unregister: function() {
        document.body.removeEventListener("keydown", interactive.keydown)
        document.body.removeEventListener("keyup", interactive.keyup)
        document.body.removeEventListener("keypress", interactive.keypress)
        document.body.removeEventListener("mousedown", interactive.mousedown)
        document.body.removeEventListener("mouseup", interactive.mouseup)
        document.body.removeEventListener("mousemove", interactive.mousemove)
        window.removeEventListener("resize", interactive.resize)
        interactive.active_sketch = null
        interactive.should_loop = false
    },

    load_scene: function(sketch, scene) {
        sketch.keydown = scene.keydown
        sketch.keyup = scene.keyup
        sketch.keypress = scene.keypress
        sketch.mousedown = scene.mousedown
        sketch.mouseup = scene.mouseup
        sketch.mousemove = scene.mousemove
        sketch.resize = scene.resize

        if (scene.start)
            scene.start()

        sketch.loop = scene.loop
    }
}