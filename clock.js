//Copyright (c) 2026 xerrortm
//MIT license. For more license information, check the GitHub LICENSE page
//Clock.js V1.2
(()=>{const M="January February March April May June July August September October November December".split(" "),W="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
const f=(t,d,x,y,h=d.getHours())=>t.replace(/h|m|s|D|M|Y|W|A/g,a=>a=="h"?String(y==12?h%12||12:h).padStart(2,0):a=="m"?String(d.getMinutes()).padStart(2,0):a=="s"?String(d.getSeconds()).padStart(2,0):a=="D"?String(d.getDate()).padStart(2,0):a=="M"?x?M[d.getMonth()]:String(d.getMonth()+1).padStart(2,0):a=="Y"?d.getFullYear():a=="A"?h<12?"AM":"PM":x?W[d.getDay()]:d.getDay());
const z=d=>d, p=(d,z)=>!z||isNaN(z)?d:new Date(d.getTime()+(+z+d.getTimezoneOffset()/60)*36e5);
function t(){
const n=new Date();
document.querySelectorAll("[clock-time],[clock-date]").forEach(e=>{
let d=n,z=e.getAttribute("clock-zone"),y=e.getAttribute("clock-type")||24;
d=p(d,z); if(y!=12&&y!=24)return;
e.textContent=f(e.getAttribute("clock-time")||e.getAttribute("clock-date"),d,e.hasAttribute("clock-date"),y);
});
}
class Clock{constructor(c={}){this.t=c.time||"h:m:s";this.d=c.date||"";this.z=c.zone||0;this.y=c.type||24;this.u();setInterval(()=>this.u(),1e3)}
u(){let d=p(new Date(),this.z);this.T=f(this.t,d,0,this.y);this.D=this.d?f(this.d,d,1,this.y):"";this.l?.forEach(x=>x({time:this.T,date:this.D,raw:d}))}
on(e,f){(this.l??=[]).push(f)}
get time(){return this.T}get date(){return this.D}}
window.Clock=Clock;
t();setInterval(t,1e3);
})();
