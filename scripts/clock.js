function Clock()
{
  this.time = function()
  {
    var o     = new Orbit();
    var i     = this.remap(o.t, 0, 87661536, 0, 360);
    var year  = this.remap(o.y % 1, 0, 1, 0, 360);
    var month = this.remap(o.m, 0, 12, year, 360);
    var day   = this.remap(o.d, 0, 30, month, 360);
    var time  = this.remap(o.t, 0, 87661536, day, 360);
    var sec   = this.remap(o.s, 0, 87661.536, time, 360);
    var msec  = this.remap(o.ms, 0, 8766.1536, sec, 360);
    var mmsec = this.remap(o.mms,0, 876.61536, msec, 360);

    return {y:year, m:month, d:day, t:time, s:sec, ms:msec, mms:mmsec, i:i};
  }

  this.format = function()
  {
    var t = this.time().i;
    t = t < 10 ? `00${t}` : t < 100 ? `0${t}` : this.time().i;
    t = new String(t).replace('.','');
    return {deg:t.substr(0,3),part:t.substr(3,3)};
  }

  this.toString = function()
  {
    return `${this.format().deg}:${this.format().part}`
  }

  this.remap = function(value, x1, y1, x2, y2)
  {
    return x2 + (value - x1) * (y2 - x2) / (y1 - x1);
  }
}