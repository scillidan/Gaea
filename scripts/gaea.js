function Gaea()
{
  this.clock = new Clock();
  this.cal = new Calendar();

  this.el = document.createElement("canvas"); 
  this.size = {width:window.innerWidth,height:window.innerHeight,ratio:2};
  this.el.id = "gaea";
  this.el.width = this.size.width * this.size.ratio;
  this.el.height = this.size.height * this.size.ratio;
  this.style = {padding:100,font_size:20,stroke_width:1.5};

  this.start = function()
  {
    document.body.appendChild(this.el);
    setInterval(() => { this.update(); },17);
  }

  this.context = function()
  {
    return this.el.getContext('2d');
  }

  this.clear = function()
  {
    this.context().clearRect(0, 0, this.size.width * this.size.ratio, this.size.height * this.size.ratio);
  }

  this.draw_clock = function()
  {
    var ctx = this.context();
    var cx = this.size.width * this.size.ratio / 2;
    var cy = this.size.height * this.size.ratio / 2;
    ctx.strokeStyle = '#FFF';
    ctx.fillStyle = '#FFF';
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    font_size = this.style.font_size;
    ctx.font = `${font_size}px input_mono_regular`;
    ctx.lineWidth = this.style.stroke_width;
    var time = this.clock.time();
    
    ctx.beginPath();
    this.hand(ctx, cx, cy, time.y, 0.35, `Y${this.cal.y}`, 0.02);
    this.hand(ctx, cx, cy, time.m, 0.35, `M${this.cal.m}`, 0.03);
    this.hand(ctx, cx, cy, time.d, 0.35, `D${this.cal.d}`, 0.04);
    this.hand(ctx, cx, cy, time.t, 0.35, `T${String(this.clock).substr(0,3)}`, 0.05);
    ctx.stroke(new Path2D(this.needle(cx, cy, time.s, 0.35)));
    ctx.stroke(new Path2D(this.needle(cx, cy, time.ms, 0.35)));
    ctx.stroke(new Path2D(this.needle(cx, cy, time.mms, 0.35)));

    //sun
    ctx.fill(new Path2D(this.circle(cx, cy, 0.2)));
    //orbit
    ctx.setLineDash([2, 10]);
    ctx.stroke(new Path2D(this.circle(cx, cy, 0.35)));
    ctx.stroke(new Path2D(this.needle(cx, cy, 0, 0.35)));
    //num
    ctx.fillStyle = '#000';
    ctx.fillText(`${this.cal.y} ${this.cal.m} ${this.cal.d} ${this.clock}`, cx, cy);
    //earth
    ctx.fill(new Path2D(this.circle(this.orbit(cx, cy, time.y, 0.35).x, this.orbit(cx, cy, time.y, 0.35).y, 0.01)));
    ctx.fillStyle = '#FFF';
    ctx.setLineDash([0,0])
    ctx.stroke(new Path2D(this.circle(this.orbit(cx, cy, time.y, 0.35).x, this.orbit(cx, cy, time.y, 0.35).y, 0.01)));
  }

  this.hand = function(ctx, x, y, time, radius, label, offset)
  {
    ctx.stroke(new Path2D(this.needle(x, y, time, radius)));
    ctx.fillText(`${label}`, this.orbit(x, y, time, radius+offset).x,  this.orbit(x, y, time, radius+offset).y);
  }

  this.orbit = function(x, y, t, r)
  {
    var x = x - y*2* r * Math.cos((t-90)*Math.PI/180);
    var y = y - y*2*-r * Math.sin((t-90)*Math.PI/180);
    return {x:x, y:y};
  }

  this.circle = function(x, y, r)
  {
    return `M ${x}, ${y} m ${-r*this.size.height*2}, 0 a ${r*this.size.height*2},${r*this.size.height*2} 0 1, 1 0, 0.1`;
  }

  this.needle = function(x, y, t, r)
  {
    return `M ${x}, ${y} L ${this.orbit(x, y, t, r).x} ${this.orbit(x, y, t, r).y}`;
  }

  this.update = function()
  {
    gaea.size = {width:window.innerWidth,height:window.innerHeight,ratio:2};
    this.el.width = this.size.width * this.size.ratio;
    this.el.height = this.size.height * this.size.ratio;
    
    this.clear();
    this.draw_clock();
  }

  window.onresize = function(event)
  {
    gaea.size = {width:window.innerWidth,height:window.innerHeight,ratio:2};
    gaea.update();
  };
}