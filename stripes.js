function colorize(color){
    let base  = color.replace("#","");
    let red   = parseInt(base.slice(0,2),16);
    let green = parseInt(base.slice(2,4),16);
    let blue  = parseInt(base.slice(4,6),16);
    return [red, green, blue];
}

function randrange(min,max){
    return Math.random() * (max - min) + min;
}

function render(ctx, width = 1000, height = 1000){
    console.log(ctx);
    let space = 0;
    let squeeze = 60;
    let stripe_width = 8;

    let base_color = "#d0f0d0";

    let [r,g,b] = colorize(base_color);
    let min_color = Math.min(r,g,b);
    let max_color = Math.max(r,g,b);


    // rendering the stripes
    for (var i = 0; i <= width/stripe_width; i++) {

        var rd = randrange(  0-min_color+squeeze,
                255-max_color-squeeze);
        nr = Math.round(r + rd);
        ng = Math.round(g + rd);
        nb = Math.round(b + rd);

        ctx.fillStyle =`rgb(${nr},${ng},${nb})`;
        ctx.fillRect ((stripe_width+space)*i, 0, stripe_width, height);
    }


    var grad = ctx.createLinearGradient(width/2,0,width/3,height);
    grad.addColorStop(0.1, base_color);
    grad.addColorStop(0.6, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,width,height);


}
