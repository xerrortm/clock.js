//Copyright (c) 2026 xerrortm
//MIT license. For more license information, check the GitHub LICENSE page
//Clock.js V3 beta
(()=>{
const M="January February March April May June July August September October November December".split(" "),
W="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
const clocks = [];
const f=(t,d,x,y,h=d.getHours())=>
(t||"h:m:s").replace(/h|m|s|D|M|Y|W|A/g,a=>
a=="h"?String(y==12?h%12||12:h).padStart(2,0):
a=="m"?String(d.getMinutes()).padStart(2,0):
a=="s"?String(d.getSeconds()).padStart(2,0):
a=="D"?String(d.getDate()).padStart(2,0):
a=="M"?x?M[d.getMonth()]:String(d.getMonth()+1).padStart(2,0):
a=="Y"?d.getFullYear():
a=="A"?h<12?"AM":"PM":
x?W[d.getDay()]:d.getDay()
);
const p=(d,z)=>!z||isNaN(z)?d:new Date(d.getTime()+(+z+d.getTimezoneOffset()/60)*36e5);
function tick(){
  const now = new Date();
  document.querySelectorAll("[clock-time],[clock-date]").forEach(e=>{
    let d=now,
    z=+e.getAttribute("clock-zone"),
    y=+e.getAttribute("clock-type")||24;
    d=p(d,z);
    if(y!=12&&y!=24)return;
    e.textContent=f(
      e.getAttribute("clock-time")||e.getAttribute("clock-date"),
      d,
      e.hasAttribute("clock-date"),
      y
    );
  });
  for(const c of clocks){
    c._u(now);
  }
}
class _Clock{
  constructor(c={}){
    this.t=c.time||"h:m:s";
    this.d=c.date||"";
    this.z=c.zone||0;
    this.y=c.type||24;
    this.l=[];

    clocks.push(this);
  }
  _u(now){
    let d = p(now, this.z);
    this.T = f(this.t,d,0,this.y);
    this.D = this.d ? f(this.d,d,1,this.y) : "";
    this.l.forEach(fn=>fn({
      time:this.T,
      date:this.D,
      raw:d
    }));
  }
  on(fn){
    this.l.push(fn);
  }
  get time(){ return this.T }
  set time(v){ this.t=v }

  get date(){ return this.D }
  set date(v){ this.d=v }
}
function Clock(c={}){
  const core = new _Clock(c);
  return new Proxy(core,{
    set(t,p,v){
      if(p==="time"){ t.t=v; return true }
      if(p==="date"){ t.d=v; return true }
      if(p==="zone"){ t.z=v; return true }
      if(p==="type"){ t.y=v; return true }
      t[p]=v; return true;
    },
    get(t,p){
      if(p==="time") return t.T;
      if(p==="date") return t.D;
      return t[p];
    }
  });
}
Clock.isWeekend=d=>{
  d=d||new Date();
  return d.getDay()==0||d.getDay()==6;
};
Clock.isLeapYear=y=>{
  y=y instanceof Date?y.getFullYear():y||new Date().getFullYear();
  return y%4==0&&(y%100||y%400==0);
};
Clock.isNight=d=>{
  d=d||new Date();
  let h=d.getHours();
  return h<6||h>=18;
};
setInterval(tick, 100);
window.Clock = Clock;
})();
