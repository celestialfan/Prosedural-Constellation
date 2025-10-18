const gameboard=document.getElementById("gameboard");
let cameraxposition=0;
let camerayposition=0;
let initialcursorxposition;
let initialcursoryposition;
let zoom=1;
let teamnames=["Tumultuous TRAPPISTs", "Monumental Messiers", "Keplers","Relentless RXs"];
let teamcolors=["#bd3440", "#4087b7", "#f6da52", "#7e027c"];
class star{
    constructor(name, x, y, type, connections){
        this.x=x;
        this.y=y;
        this.name=name;
        this.type=type;
        this.connections=connections;
        this.id;
        this.ele=document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.nametag=document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.lines=[];
        this.pathlist=[document.createElementNS('http://www.w3.org/2000/svg', "path")];
        gameboard.append(this.ele);
        this.ele.append(this.nametag);
        this.ele.id=name;
        if(this.type=="wormhole"){
            this.pathlist.push(document.createElementNS('http://www.w3.org/2000/svg', "path"));
            this.pathlist.push(document.createElementNS('http://www.w3.org/2000/svg', "path"));
        }
        console.log(this.pathlist);
    }
    display(){
        for(let i=0; i<this.connections.length; i++){
            this.lines.push(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
            gameboard.append(this.lines[i]);
            this.lines[i].setAttribute("d", `M${(this.x-cameraxposition)*zoom} ${(this.y-camerayposition)*zoom} L${(starlist[this.connections[i]].x-cameraxposition)*zoom} ${(starlist[this.connections[i]].y-camerayposition)*zoom} Z`);
            this.lines[i].setAttribute("stroke", "rgba(255, 255, 255, 0.5)");
            this.lines[i].setAttribute("stroke-width", zoom);
            //starlist[this.connections[i]].connections.push();
        }
        if(this.type=="sun"){
            this.ele.append(this.pathlist[0]);
            this.pathlist[0].setAttribute("d", `M${(this.x-cameraxposition-2.5)*zoom}, ${(this.y-camerayposition)*zoom} a ${2.5*zoom},${2.5*zoom} 0 1,1 ${5*zoom},0 a ${2.5*zoom},${2.5*zoom} 0 1,1 ${-5*zoom},0`);
        } else if(this.type=="cluster"){
            this.ele.append(this.pathlist[0]);
            this.pathlist[0].setAttribute("d", `M${(this.x-cameraxposition)*zoom} ${(this.y-camerayposition-10)*zoom} L${(this.x-cameraxposition-2.1260191)*zoom} ${(this.y-camerayposition-5.1326641)*zoom} L${(this.x-cameraxposition-7.07107)*zoom} ${(this.y-camerayposition-7.07107)*zoom} L${(this.x-cameraxposition-5.1326641)*zoom} ${(this.y-camerayposition-2.1260191)*zoom} L${(this.x-cameraxposition-10)*zoom} ${(this.y-camerayposition)*zoom} L${(this.x-cameraxposition-5.1326641)*zoom} ${(this.y-camerayposition+2.1260191)*zoom}L${(this.x-cameraxposition-7.07107)*zoom} ${(this.y-camerayposition+7.07107)*zoom} L${(this.x-cameraxposition-2.1260191)*zoom} ${(this.y-camerayposition+5.1326641)*zoom} L${(this.x-cameraxposition)*zoom} ${(this.y-camerayposition+10)*zoom} L${(this.x-cameraxposition+2.1260191)*zoom} ${(this.y-camerayposition+5.1326641)*zoom} L${(this.x-cameraxposition+7.07107)*zoom} ${(this.y-camerayposition+7.07107)*zoom} L${(this.x-cameraxposition+5.1326641)*zoom} ${(this.y-camerayposition+2.1260191)*zoom} L${(this.x-cameraxposition+10)*zoom} ${(this.y-camerayposition)*zoom} L${(this.x-cameraxposition+5.1326641)*zoom} ${(this.y-camerayposition-2.1260191)*zoom} L${(this.x-cameraxposition+7.07107)*zoom} ${(this.y-camerayposition-7.07107)*zoom} L${(this.x-cameraxposition+2.1260191)*zoom} ${(this.y-camerayposition-5.1326641)*zoom} Z`);
            //this.ele.setAttribute("d", `M${this.x-cameraxposition} ${this.y-camerayposition-10} l-2.1260191 -5.1326641 l-7.07107 -7.07107 l-5.1326641 -2.1260191 l-10 0 l-5.1326641 2.1260191 l-7.07107 7.07107 l-2.1260191 5.1326641 l0 10 l2.1260191 5.1326641 l7.07107 7.07107 l5.1326641 2.1260191 l10 0 l5.1326641 -2.1260191 l7.07107 -7.07107 l2.1260191 -5.1326641 Z`);
        } else if(this.type=="nebula"){
            this.ele.append(this.pathlist[0]);
            this.pathlist[0].setAttribute("d", `M${(this.x-cameraxposition-9)*zoom}, ${(this.y-camerayposition-4)*zoom} L ${(this.x-cameraxposition-1)*zoom} ${(this.y-camerayposition+4)*zoom} A ${zoom*1.5} ${zoom*1.5} 0 0 0 ${(this.x-cameraxposition+1)*zoom} ${(this.y-camerayposition+4)*zoom} L ${(this.x-cameraxposition+9)*zoom} ${(this.y-camerayposition-4)*zoom} A ${zoom/1.4},${zoom/1.4} 0 0,0 ${(this.x-cameraxposition+9)*zoom},${(this.y-camerayposition-5)*zoom} A ${zoom*12},${zoom*12} 0 0,0 ${(this.x-cameraxposition-9)*zoom},${(this.y-camerayposition-5)*zoom} A ${zoom/1.4},${zoom/1.4} 0 0,0 ${(this.x-cameraxposition-9)*zoom},${(this.y-camerayposition-4)*zoom} Z`);
        } else if(this.type=="nova"){
            this.ele.append(this.pathlist[0]);
            this.pathlist[0].setAttribute("d", `M ${(this.x-cameraxposition-4)*zoom} ${(this.y-camerayposition-5)*zoom} L ${(this.x-cameraxposition+4)*zoom} ${(this.y-camerayposition-5)*zoom} A ${zoom} ${zoom} 0 0 1 ${(this.x-cameraxposition+5)*zoom} ${(this.y-camerayposition-4)*zoom} L ${(this.x-cameraxposition+5)*zoom} ${(this.y-camerayposition+4)*zoom} A ${zoom} ${zoom} 0 0 1 ${(this.x-cameraxposition+4)*zoom} ${(this.y-camerayposition+5)*zoom} L ${(this.x-cameraxposition-4)*zoom} ${(this.y-camerayposition+5)*zoom} A ${zoom} ${zoom} 0 0 1 ${(this.x-cameraxposition-5)*zoom} ${(this.y-camerayposition+4)*zoom} L ${(this.x-cameraxposition-5)*zoom} ${(this.y-camerayposition-4)*zoom} A ${zoom} ${zoom} 0 0 1 ${(this.x-cameraxposition-4)*zoom} ${(this.y-camerayposition-5)*zoom} Z`);
        } else if(this.type=="wormhole"){
            this.ele.append(this.pathlist[0]);
            this.ele.append(this.pathlist[1]);
            this.ele.append(this.pathlist[2]);
            this.pathlist[0].setAttribute("d", `M${(this.x-cameraxposition-7.5)*zoom}, ${(this.y-camerayposition)*zoom} a ${7.5*zoom},${7.5*zoom} 0 1,1 ${15*zoom},0 a ${7.5*zoom},${7.5*zoom} 0 1,1 ${-15*zoom},0`);
            this.pathlist[1].setAttribute("d", `M${(this.x-cameraxposition-3.75)*zoom}, ${(this.y-camerayposition)*zoom} a ${3.75*zoom},${3.75*zoom} 0 1,1 ${7.5*zoom},0 a ${3.75*zoom},${3.75*zoom} 0 1,1 ${-7.5*zoom},0`);
            this.pathlist[1].setAttribute("fill", "#000000");
            this.pathlist[2].setAttribute("d", `M${(this.x-cameraxposition-7.433035)*zoom} ${(this.y-camerayposition-1)*zoom} L${(this.x-cameraxposition+7.433035)*zoom} ${(this.y-camerayposition-1)*zoom} A ${7.5*zoom},${7.5*zoom} 0 0 1 ${(this.x-cameraxposition+7.433035)*zoom},${(this.y-camerayposition+1)*zoom} L${(this.x-cameraxposition-7.433035)*zoom} ${(this.y-camerayposition+1)*zoom} A ${7.5*zoom},${7.5*zoom} 0 0 1 ${(this.x-cameraxposition-7.433035)*zoom},${(this.y-camerayposition-1)*zoom} Z`);//C ${(this.x-cameraxposition+6)*zoom},${(this.y-camerayposition-2)*zoom},  ${(this.x-cameraxposition+8)*zoom},${(this.y-camerayposition+2)*zoom} ${(this.x-cameraxposition+7.22842)*zoom} ,${(this.y-camerayposition+2)*zoom}
            this.pathlist[2].setAttribute("fill", "#000000");
        }
        this.nametag.setAttribute("x", (this.x-cameraxposition)*zoom);
        this.nametag.setAttribute("y", (this.y-camerayposition)*zoom+20);
        this.nametag.setAttribute("fill", "#ffffff");
        this.nametag.setAttribute("font-size", "20px");
        this.nametag.textContent="";
        this.pathlist[0].setAttribute("fill", "#ffffff");
            /*
        for (let i = 0; i < this.connections.length; i++) {
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.5)'; // Line color
            ctx.lineWidth = 2*zoom; // Line width
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo((this.x-cameraxposition)*zoom, (this.y-camerayposition)*zoom);
            ctx.lineTo((starlist[this.connections[i]].x-cameraxposition)*zoom, (starlist[this.connections[i]].y-camerayposition)*zoom);
            ctx.stroke();
        }*/
    }
    mark(){
        if(this.type=="sun"){
            this.pathlist[0].setAttribute("d", `M${(this.x-cameraxposition-5)*zoom}, ${(this.y-camerayposition)*zoom} a ${5*zoom},${5*zoom} 0 1,1 ${10*zoom},0 a ${5*zoom},${5*zoom} 0 1,1 ${-10*zoom},0`);
        } else if(this.type=="cluster"){
            this.pathlist[0].setAttribute("d", `M${(this.x-cameraxposition)*zoom} ${(this.y-camerayposition-20)*zoom} L${(this.x-cameraxposition-2.1260191*2)*zoom} ${(this.y-camerayposition-5.1326641*2)*zoom} L${(this.x-cameraxposition-7.07107*2)*zoom} ${(this.y-camerayposition-7.07107*2)*zoom} L${(this.x-cameraxposition-5.1326641*2)*zoom} ${(this.y-camerayposition-2.1260191*2)*zoom} L${(this.x-cameraxposition-20)*zoom} ${(this.y-camerayposition)*zoom} L${(this.x-cameraxposition-5.1326641*2)*zoom} ${(this.y-camerayposition+2.1260191*2)*zoom}L${(this.x-cameraxposition-7.07107*2)*zoom} ${(this.y-camerayposition+7.07107*2)*zoom} L${(this.x-cameraxposition-2.1260191*2)*zoom} ${(this.y-camerayposition+5.1326641*2)*zoom} L${(this.x-cameraxposition)*zoom} ${(this.y-camerayposition+20)*zoom} L${(this.x-cameraxposition+2.1260191*2)*zoom} ${(this.y-camerayposition+5.1326641*2)*zoom} L${(this.x-cameraxposition+7.07107*2)*zoom} ${(this.y-camerayposition+7.07107*2)*zoom} L${(this.x-cameraxposition+5.1326641*2)*zoom} ${(this.y-camerayposition+2.1260191*2)*zoom} L${(this.x-cameraxposition+20)*zoom} ${(this.y-camerayposition)*zoom} L${(this.x-cameraxposition+5.1326641*2)*zoom} ${(this.y-camerayposition-2.1260191*2)*zoom} L${(this.x-cameraxposition+7.07107*2)*zoom} ${(this.y-camerayposition-7.07107*2)*zoom} L${(this.x-cameraxposition+2.1260191*2)*zoom} ${(this.y-camerayposition-5.1326641*2)*zoom} Z`);
        } else if(this.type=="nebula"){
            this.pathlist[0].setAttribute("d", `M${(this.x-cameraxposition-18)*zoom}, ${(this.y-camerayposition-8)*zoom} L ${(this.x-cameraxposition-2)*zoom} ${(this.y-camerayposition+8)*zoom} A ${zoom*3} ${zoom*3} 0 0 0 ${(this.x-cameraxposition+2)*zoom} ${(this.y-camerayposition+8)*zoom} L ${(this.x-cameraxposition+18)*zoom} ${(this.y-camerayposition-8)*zoom} A ${zoom/0.7},${zoom/0.7} 0 0,0 ${(this.x-cameraxposition+18)*zoom},${(this.y-camerayposition-10)*zoom} A ${zoom*24},${zoom*24} 0 0,0 ${(this.x-cameraxposition-18)*zoom},${(this.y-camerayposition-10)*zoom} A ${zoom/0.7},${zoom/0.7} 0 0,0 ${(this.x-cameraxposition-18)*zoom},${(this.y-camerayposition-8)*zoom} Z`);
        } else if(this.type=="nova"){
            this.pathlist[0].setAttribute("d", `M ${(this.x-cameraxposition-8)*zoom} ${(this.y-camerayposition-10)*zoom} L ${(this.x-cameraxposition+8)*zoom} ${(this.y-camerayposition-10)*zoom} A ${zoom*2} ${zoom*2} 0 0 1 ${(this.x-cameraxposition+10)*zoom} ${(this.y-camerayposition-8)*zoom} L ${(this.x-cameraxposition+10)*zoom} ${(this.y-camerayposition+8)*zoom} A ${zoom*2} ${zoom*2} 0 0 1 ${(this.x-cameraxposition+8)*zoom} ${(this.y-camerayposition+10)*zoom} L ${(this.x-cameraxposition-8)*zoom} ${(this.y-camerayposition+10)*zoom} A ${zoom*2} ${zoom*2} 0 0 1 ${(this.x-cameraxposition-10)*zoom} ${(this.y-camerayposition+8)*zoom} L ${(this.x-cameraxposition-10)*zoom} ${(this.y-camerayposition-8)*zoom} A ${zoom*2} ${zoom*2} 0 0 1 ${(this.x-cameraxposition-8)*zoom} ${(this.y-camerayposition-10)*zoom} Z`);
        } else if(this.type=="wormhole"){
            this.pathlist[0].setAttribute("d", `M${(this.x-cameraxposition-15)*zoom}, ${(this.y-camerayposition)*zoom} a ${15*zoom},${15*zoom} 0 1,1 ${30*zoom},0 a ${15*zoom},${15*zoom} 0 1,1 ${-30*zoom},0`);
            this.pathlist[1].setAttribute("d", `M${(this.x-cameraxposition-7.5)*zoom}, ${(this.y-camerayposition)*zoom} a ${7.5*zoom},${7.5*zoom} 0 1,1 ${15*zoom},0 a ${7.5*zoom},${7.5*zoom} 0 1,1 ${-15*zoom},0`);
            this.pathlist[1].setAttribute("fill", "#000000");
            this.pathlist[2].setAttribute("d", `M${(this.x-cameraxposition-7.433035*2)*zoom} ${(this.y-camerayposition-2)*zoom} L${(this.x-cameraxposition+7.433035*2)*zoom} ${(this.y-camerayposition-2)*zoom} A ${15*zoom},${15*zoom} 0 0 1 ${(this.x-cameraxposition+7.433035*2)*zoom},${(this.y-camerayposition+2)*zoom} L${(this.x-cameraxposition-7.433035*2)*zoom} ${(this.y-camerayposition+2)*zoom} A ${15*zoom},${15*zoom} 0 0 1 ${(this.x-cameraxposition-7.433035*2)*zoom},${(this.y-camerayposition-2)*zoom} Z`);
            this.pathlist[2].setAttribute("fill", "#000000");
        }
        this.nametag.textContent=this.name;
    }
}
/*class wormhole extends star {
    constructor(name, x, y, connections) {
        super(name, x, y, connections);
        this.center=document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.bar=document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }
    display(){
        this.ele.setAttribute("d", `M${(this.x-cameraxposition-5)*zoom}, ${(this.y-camerayposition)*zoom} a ${5*zoom},${5*zoom} 0 1,1 ${10*zoom},0 a ${5*zoom},${5*zoom} 0 1,1 ${-10*zoom},0`);
    }
}*/
/*let starlist=[new star("kepler-1", 100, 100, "sun", []),
    new star("Ross-3", 124, 243, "sun", []),
    new star("kepler-20", 183, 280, "sun", [0]),
    new star("TRAPPIST-1", 150, 430, "sun", []),
    new star("2MASS-J023-8445", 253, 340, "sun", [2]),
    new star("NGC-6791", 326, 183, "cluster", [4]),
    new star("kepler-super-nova", 423, 355, "nova", [4]),
    new star("fruitfly nebula", 560, 339, "nebula", []),
    new star("HLX-1", 54, -110, "wormhole", [0]),
    new star("kepler-22", 564, 629, "sun", [])];*/
let starlist=[];
let namestarts=["Kepler", "Ross", "TRAPPIST", "Wolf", "Gliese", "Messier",                     "NGC",                                     "IC",                "Abell", "Caldwell",          "LBN",    "vdB",    "DWB",          "Mz",     "MyCn", "collinder",   "FSR",      "Palomar",   "Terzan",     "HLX",            "RX",    "SS"];
let namesfortypes=[["sun"], ["sun"], ["sun"], ["sun"], ["sun"], ["nebula", "cluster", "nova"], ["nebula", "cluster", "nova"], ["nebula", "cluster", "nova"], ["nova"], ["nova", "nebula"], ["nebula"], ["nebula"], ["nebula"], ["nova"], ["nova"], ["cluster"], ["cluster"], ["cluster"], ["cluster"], ["wormhole"], ["wormhole"], ["wormhole"]]
let clusterandnebulanamestarts=[];
let nameends=[];
nameends.length=namestarts.length;
for (let i = 0; i < nameends.length; i++) {
    nameends[i]=0;
}
let clusternameends=[0, 0, 0];
for (let i = 0; i < Math.random()*1000; i++) {
    let rand=Math.floor(Math.random()*namestarts.length);
    while(namesfortypes[rand].includes("sun")==false){
        rand=Math.floor(Math.random()*namestarts.length);
    }
    nameends[rand]++;
    starlist.push(new star(`${namestarts[rand]}-${nameends[rand]}`, Math.random()*2000-1000, Math.random()*2000-1000, "sun", []));
}
for (let i = 0; i < Math.random()*40; i++) {
    let rand=Math.floor(Math.random()*namestarts.length);
    while(namesfortypes[rand].includes("cluster")==false){
        rand=Math.floor(Math.random()*namestarts.length);
    }
    nameends[rand]++;
    starlist.push(new star(`${namestarts[rand]}-${nameends[rand]}`, Math.random()*2000-1000, Math.random()*2000-1000, "cluster", []));
}
for (let i = 0; i < Math.random()*40; i++) {
    let rand=Math.floor(Math.random()*namestarts.length);
    while(namesfortypes[rand].includes("nebula")==false){
        rand=Math.floor(Math.random()*namestarts.length);
    }
    nameends[rand]++;
    starlist.push(new star(`${namestarts[rand]}-${nameends[rand]}`, Math.random()*2000-1000, Math.random()*2000-1000, "nebula", []));
}
for (let i = 0; i < Math.random()*10; i++) {
    let rand=Math.floor(Math.random()*namestarts.length);
    while(namesfortypes[rand].includes("nova")==false){
        rand=Math.floor(Math.random()*namestarts.length);
    }
    nameends[rand]++;
    starlist.push(new star(`${namestarts[rand]}-${nameends[rand]}`, Math.random()*2000-1000, Math.random()*2000-1000, "nova", []));
}
for (let i = 0; i < Math.random()*10; i++) {
    let rand=Math.floor(Math.random()*namestarts.length);
    while(namesfortypes[rand].includes("wormhole")==false){
        rand=Math.floor(Math.random()*namestarts.length);
    }
    nameends[rand]++;
    starlist.push(new star(`${namestarts[rand]}-${nameends[rand]}*`, Math.random()*2000-1000, Math.random()*2000-1000, "wormhole", []));
}
for (let i = 0; i < starlist.length; i++) {
    for (let j = 0; j < starlist.length; j++) {
        let xdis=starlist[j].x-starlist[i].x;
        let ydis=starlist[j].y-starlist[i].y;
        if(2**Math.random()*Math.sqrt(xdis**2+ydis**2)<200){
            starlist[i].connections.push(j);
        }
    }
}
for (let index = 0; index < starlist.length; index++) {
    starlist[index].display();
}
let holdTimer;
let clickerdown=false;
let held=false;
const holdDuration = 250;
let cursorx;
let cursory;
gameboard.addEventListener("mousemove", function(e){
    cursorx=e.clientX;
    cursory=e.clientY;
    for(i=0; i<starlist.length; i++){
        let Δx=cursorx-(starlist[i].x-cameraxposition)*zoom;
        let Δy=cursory-(starlist[i].y-camerayposition)*zoom;
        if(Math.sqrt(Δx**2+Δy**2)<5*zoom){
            starlist[i].mark();
        }else{
            starlist[i].display();
        }
    }
});
gameboard.addEventListener('mousedown', function(e) {
    console.log('Clicked');
    clickerdown=true;
    initialcursorxposition=cursorx+cameraxposition*zoom;
    initialcursoryposition=cursory+camerayposition*zoom;
    timeout=setTimeout(()=>{
        if(clickerdown){
            held=true;
        }
        intervalId = setInterval(() => {
            if (clickerdown) {
                cameraxposition=(initialcursorxposition-cursorx)/zoom;
                camerayposition=(initialcursoryposition-cursory)/zoom;
                console.log(cameraxposition);
                for (let index = 0; index < starlist.length; index++) {
                    starlist[index].display();
                }
                // Your continuous action code here
            } else {
                clearInterval(intervalId); // Stop the interval if mouse is no longer down
            }
        }, 50); // Execute every 100 milliseconds
        console.log(held);
    }, holdDuration);
});
gameboard.addEventListener('mouseup', function() {
    if(held==false){
        console.log("short click");
    }
    console.log('let go');
    clickerdown=false;
    held=false;
    console.log(held);
});
gameboard.addEventListener("wheel", function(f){
    if(f.deltaY<0){
        cameraxposition-=cursorx/zoom/2;
        camerayposition-=cursory/zoom/2;
        zoom/=1.5;
        for (let index = 0; index < starlist.length; index++) {
            starlist[index].display();
        }
    }else if(f.deltaY>0){
        cameraxposition+=cursorx/zoom/3;
        camerayposition+=cursory/zoom/3;
        zoom*=1.5;
        for (let index = 0; index < starlist.length; index++) {
            starlist[index].display();
        }
    }
});
function animate() {
    let rotation=0;
    setInterval(()=>{
        rotation+=0.1666;
        for (let i = 0; i < starlist.length; i++) {
            if(starlist[i].type=="wormhole"){
                starlist[i].pathlist[2].setAttribute("transform", `rotate(${rotation}, ${(starlist[i].x-cameraxposition)*zoom}, ${(starlist[i].y-camerayposition)*zoom})`);
            }
        }
    }, 10);
}
animate();
        /*
        ctx.fillStyle="#ffffff";
        ctx.lineWidth=zoom
        ctx.font=`${40*zoom}px Arial`;
        if(this.type=="sun"){
            ctx.fillText("•", (this.x-cameraxposition-7)*zoom, (this.y-camerayposition+14)*zoom);
        } else if(this.type=="cluster"){
            ctx.fillText("✸", (this.x-cameraxposition-18)*zoom, (this.y-camerayposition+14)*zoom);
        } else if(this.type=="nebula"){
            ctx.fillText("▼", (this.x-cameraxposition-7)*zoom, (this.y-camerayposition+14)*zoom);
        } else if(this.type=="nova"){
            ctx.fillText("■", (this.x-cameraxposition-12)*zoom, (this.y-camerayposition+9)*zoom);
        }*/


        /*ctx.strokeStyle="#ffffff";
        ctx.lineWidth=zoom/2
        ctx.font=`${80*zoom}px Arial`;
        if(this.type=="sun"){
            ctx.strokeText("•", (this.x-cameraxposition-14)*zoom, (this.y-camerayposition+28)*zoom);
            ctx.font=`${60*zoom}px Arial`;
            ctx.fillText("•", (this.x-cameraxposition-10.5)*zoom, (this.y-camerayposition+21)*zoom);
        } else if(this.type=="cluster"){
            ctx.strokeText("✸", (this.x-cameraxposition-18)*zoom, (this.y-camerayposition+14)*zoom);
        } else if(this.type=="nebula"){
            ctx.strokeText("▼", (this.x-cameraxposition-7)*zoom, (this.y-camerayposition+14)*zoom);
        } else if(this.type=="nova"){
            ctx.strokeText("■", (this.x-cameraxposition-12)*zoom, (this.y-camerayposition+9)*zoom);
        }*/