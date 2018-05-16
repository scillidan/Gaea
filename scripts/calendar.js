//msec per calendar day       = 86400000
//orbital period in msec      = 365.2564 * 86400000 = 31558152960 https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion
//msec in orbital day (deg)   = 31558152960 / 360 = 87661536

function Orbit()
{
  var orbit = 31558152960;
  var span  = 70;
  var birth = new Date('11 11 1988 15:50:00 GMT+10');
  var today = new Date();

  var life  = today-birth;
  var death = new Date(Date.parse(birth) + Date.parse(new Date(orbit * span)));
  var year  = life % orbit;

  this.y = life / orbit;
  this.m = life / (orbit / 12) % 12;
  this.d = life / 87661536 % 30;
  this.t = life % 87661536;
  this.s = life % 87661.536;
  this.ms = life % 8766.1536;
  this.mms = life % 876.61536;
  this.dd = (today - death) / 87661536;

  return this.y, this.m, this.d, this.t, this.s, this.ms, this.mms, this.dd;
}

Date.prototype.gaea = function()
{
  orbit = new Orbit();
  this.y = Math.floor(orbit.y);
  this.m = Math.ceil(orbit.m) < 10 ? `0${Math.ceil(orbit.m)}` : Math.ceil(orbit.m);
  this.d = Math.ceil(orbit.d) < 10 ? `0${Math.ceil(orbit.d)}` : Math.ceil(orbit.d);
  return {y:this.y, m:this.m, d:this.d};
}

function Calendar()
{
  return new Date().gaea();
}