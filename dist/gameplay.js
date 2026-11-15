(function(root){
const P=typeof module!=='undefined'?require('./engine.js'):root.Puzzle;
class Game{
 constructor(p,old={}){this.p=p;this.answer=P.solve(p,1)[0].map((c,r)=>r*p.n+c);const size=p.n*p.n;this.placed=Array(size).fill(false);this.notes=Array(size).fill(false);this.hearts=old.ruleVersion===2?Math.max(0,Math.min(3,Number.isInteger(old.hearts)?old.hearts:3)):3;for(let i=0;i<size;i++){this.placed[i]=this.answer.includes(i)&&(old.ruleVersion===2?old.placed?.[i]===true:old.cells?.[i]===1);this.notes[i]=!this.placed[i]&&(old.ruleVersion===2?old.notes?.[i]===true:old.cells?.[i]===2)}this.history=[];this.future=[];this.lastError=-1}
 get won(){return this.placed.filter(Boolean).length===this.p.n}
 get lost(){return this.hearts===0}
 get inactive(){return this.won||this.lost}
 mark(indices,value,record=true){if(this.inactive)return false;const valid=indices.filter(i=>Number.isInteger(i)&&i>=0&&i<this.notes.length&&!this.placed[i]&&this.notes[i]!==value);if(!valid.length)return false;if(record){this.history.push([...this.notes]);if(this.history.length>100)this.history.shift();this.future=[]}for(const i of valid)this.notes[i]=value;return true}
 place(i){if(this.inactive)return'inactive';if(!Number.isInteger(i)||i<0||i>=this.notes.length)return'inactive';if(this.placed[i])return'locked';if(!this.answer.includes(i)){this.hearts--;this.lastError=i;return'wrong'}this.placed[i]=true;this.notes[i]=false;this.lastError=-1;return'correct'}
 blocked(){const n=this.p.n,selected=this.placed.map((v,i)=>v?i:-1).filter(i=>i>=0);return this.placed.map((v,i)=>!v&&selected.some(j=>Math.floor(i/n)===Math.floor(j/n)||i%n===j%n||this.p.regions[i]===this.p.regions[j]||Math.abs(Math.floor(i/n)-Math.floor(j/n))<=1&&Math.abs(i%n-j%n)<=1))}
 undo(){if(this.inactive||!this.history.length)return false;this.future.push([...this.notes]);this.notes=this.history.pop().map((v,i)=>v&&!this.placed[i]);return true}
 redo(){if(this.inactive||!this.future.length)return false;this.history.push([...this.notes]);this.notes=this.future.pop().map((v,i)=>v&&!this.placed[i]);return true}
 serialize(){return{ruleVersion:2,placed:[...this.placed],notes:[...this.notes],hearts:this.hearts}}
}
if(typeof module!=='undefined')module.exports={Game};else root.MeowGame=Game;
})(typeof window!=='undefined'?window:globalThis);
