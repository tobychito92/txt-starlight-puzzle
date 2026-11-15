const {test}=require('node:test'),a=require('node:assert/strict'),C=require('../dist/collection.js');
test('collection provides 40 distinct photos and eight photos per member',()=>{a.equal(C.cards.length,40);a.equal(new Set(C.cards.map(c=>c.file)).size,40);for(let i=0;i<5;i++)a.equal(C.cards.filter(c=>c.member===i).length,8)});
test('unlocking counts distinct completed stages and retains original five thresholds',()=>{a.equal(C.unlocked({}),0);a.equal(C.unlocked({0:{},1:{},2:{}}),3);a.equal(C.unlocked(Object.fromEntries(Array.from({length:120},(_,i)=>[i,{}]))),40);a.equal(C.unlocked({0:{},bad:{},120:{}}),1);a.equal(C.canEquip(5,{0:{},1:{},2:{},3:{},4:{}}),false)});
test('equipped selection must match member and unlocked card; defaults remain available',()=>{a.equal(C.choice(0,[6],{0:{},1:{},2:{},3:{},4:{},5:{},6:{}}),0);a.equal(C.choice(0,[5],{0:{}}),0);a.equal(C.choice(0,[5],{0:{},1:{},2:{},3:{},4:{},5:{}}),5);a.equal(C.choice(4,[],{}),4)});

test('expanded cards require distinct stage milestones, independent of chosen stage order',()=>{
 const done=n=>Object.fromEntries(Array.from({length:n},(_,i)=>[119-i,{}]));
 a.equal(C.unlocked(done(1)),1);a.equal(C.unlocked(done(20)),20);a.equal(C.unlocked(done(24)),20);a.equal(C.unlocked(done(25)),21);a.equal(C.unlocked(done(119)),39);a.equal(C.unlocked(done(120)),40);
 a.equal(C.canEquip(20,done(24)),false);a.equal(C.canEquip(20,done(25)),true);
 a.equal(C.unlocked({'daily-2026-11-15':{},'-1':{},'120':{},'NaN':{}}),0);
});
