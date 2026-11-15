(function(root){
'use strict';
const node=typeof module!=='undefined',levels=node?require('./levels.json'):LEVELS,C=node?require('./collection.js'):root.Collection,Game=node?require('./gameplay.js').Game:root.MeowGame;
const fail=()=>{throw new Error('Invalid save code')},obj=x=>x&&typeof x==='object'&&!Array.isArray(x),num=(x,max=1000000000)=>Number.isInteger(x)&&x>=0&&x<=max;
const date=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+'T00:00:00Z'))&&new Date(x+'T00:00:00Z').toISOString().slice(0,10)===x;
function dailyIndex(d){let hash=[...d].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,0);return 15+hash%(levels.length-15)}
function puzzleFor(k){if(/^level-(0|[1-9]\d*)$/.test(k)&&Number(k.slice(6))<levels.length)return levels[Number(k.slice(6))];if(k.startsWith('daily-')&&date(k.slice(6)))return levels[dailyIndex(k.slice(6))];fail()}
function record(x){if(!obj(x)||!num(x.time)||!num(x.hints))fail();return[x.time,x.hints]}
function pack(s){if(!obj(s)||!['zh','en'].includes(s.lang)||!num(s.last,levels.length-1)||!obj(s.done)||!obj(s.dailyDone)||!obj(s.sessions)||!Array.isArray(s.equipped)||s.equipped.length>5)fail();
 const d=Object.keys(s.done).map(k=>{if(!/^(0|[1-9]\d*)$/.test(k)||Number(k)>=levels.length)fail();return[Number(k),...record(s.done[k])]});
 const a=Object.keys(s.dailyDone).map(k=>{if(!date(k))fail();return[k,...record(s.dailyDone[k])]});
 const sessions=Object.keys(s.sessions).map(k=>{const p=puzzleFor(k),v=s.sessions[k];if(!obj(v)||!num(v.elapsed)||!num(v.hints))fail();const g=new Game(p,v),clean=g.serialize();if(v.ruleVersion===2&&(!num(v.hearts,3)||!Array.isArray(v.placed)||!Array.isArray(v.notes)||v.placed.length!==p.n*p.n||v.notes.length!==p.n*p.n||v.placed.some((b,i)=>typeof b!=='boolean'||b!==clean.placed[i])||v.notes.some((b,i)=>typeof b!=='boolean'||b!==clean.notes[i])))fail();return[k,clean.hearts,v.elapsed,v.hints,clean.placed.map(Number).join(''),clean.notes.map(Number).join('')]});
 const e=Array.from(s.equipped,(id,member)=>{if(id==null)return null;if(!num(id,C.cards.length-1)||C.cards[id].member!==member||!(id===member||C.canEquip(id,s.done)))fail();return id});
 return{l:s.lang,i:s.last,d,a,s:sessions,e};
}
function unpack(p){if(!obj(p)||!Array.isArray(p.d)||!Array.isArray(p.a)||!Array.isArray(p.s)||!Array.isArray(p.e))fail();const s={lang:p.l,last:p.i,done:{},dailyDone:{},sessions:{},equipped:p.e};
 for(const row of p.d){if(!Array.isArray(row)||row.length!==3||!num(row[0],levels.length-1)||Object.hasOwn(s.done,row[0]))fail();s.done[row[0]]={time:row[1],hints:row[2]}}
 for(const row of p.a){if(!Array.isArray(row)||row.length!==3||!date(row[0])||Object.hasOwn(s.dailyDone,row[0]))fail();s.dailyDone[row[0]]={time:row[1],hints:row[2]}}
 for(const row of p.s){if(!Array.isArray(row)||row.length!==6||typeof row[0]!=='string'||Object.hasOwn(s.sessions,row[0]))fail();const [k,hearts,elapsed,hints,placed,notes]=row,puzzle=puzzleFor(k),size=puzzle.n*puzzle.n;if(typeof placed!=='string'||typeof notes!=='string'||placed.length!==size||notes.length!==size||!/^[01]+$/.test(placed+notes))fail();s.sessions[k]={ruleVersion:2,placed:[...placed].map(x=>x==='1'),notes:[...notes].map(x=>x==='1'),hearts,elapsed,hints}}
 pack(s);return s;
}
function checksum(s){let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return(h>>>0).toString(16).padStart(8,'0')}
function encode(s){const text=JSON.stringify(pack(s)),body=btoa(text).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');const code='TXT1.'+body+'.'+checksum(body);if(code.length>262144)fail();return code}
function decode(input){if(typeof input!=='string'||input.length>300000)fail();const code=input.replace(/\s/g,''),parts=code.split('.');if(code.length>262144||parts.length!==3||parts[0]!=='TXT1'||!/^[A-Za-z0-9_-]+$/.test(parts[1])||parts[2]!==checksum(parts[1]))fail();try{const body=parts[1].replace(/-/g,'+').replace(/_/g,'/');return unpack(JSON.parse(atob(body+'='.repeat((4-body.length%4)%4))))}catch(e){fail()}}
const api={encode,decode};if(node)module.exports=api;else root.SaveCode=api;
})(typeof window!=='undefined'?window:globalThis);
