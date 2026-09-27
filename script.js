const goal=document.getElementById('goal');
const steps=document.getElementById('steps');
const status=document.getElementById('status');
const planBtn=document.getElementById('planBtn');

const templates=[
 {match:['workstation','desk','workspace'], steps:[
  ['Observe workspace','PERCEIVE'],['Identify required objects','GROUND'],['Navigate to workstation','MOVE'],['Clear / arrange target area','MANIPULATE'],['Place required items','MANIPULATE'],['Verify workstation state','VERIFY']]},
 {match:['container','box','red'], steps:[
  ['Locate target container','PERCEIVE'],['Estimate grasp pose','GROUND'],['Approach target safely','MOVE'],['Reach and establish grasp','MANIPULATE'],['Lift and stabilize','CONTROL'],['Verify object state','VERIFY']]},
 {match:['operator','person','tool','bring'], steps:[
  ['Locate operator and target tool','PERCEIVE'],['Estimate safe route','PLAN'],['Navigate toward tool','MOVE'],['Grasp tool securely','MANIPULATE'],['Navigate to operator','MOVE'],['Transfer tool and verify','VERIFY']]},
];

function makePlan(text){
 const lower=text.toLowerCase();
 const found=templates.find(t=>t.match.some(k=>lower.includes(k)));
 if(found) return found.steps;
 return [
  ['Parse task objective','REASON'],
  ['Observe relevant environment state','PERCEIVE'],
  ['Identify objects, constraints and affordances','GROUND'],
  ['Decompose objective into executable actions','PLAN'],
  ['Execute first action and monitor feedback','ACT'],
  ['Verify outcome and re-plan if needed','VERIFY']
 ];
}
function render(){
 const value=goal.value.trim()||'Complete the requested task';
 status.textContent='PLANNING…';
 steps.innerHTML='';
 const plan=makePlan(value);
 plan.forEach((s,i)=>{
   const row=document.createElement('div'); row.className='step'; row.style.animationDelay=(i*.07)+'s';
   row.innerHTML='<span class="step-no">0'+(i+1)+'</span><span class="step-name">'+s[0]+'</span><span class="step-tag">'+s[1]+'</span>';
   steps.appendChild(row);
 });
 setTimeout(()=>status.textContent='PLAN READY',300+plan.length*70);
}
planBtn.addEventListener('click',render);
document.querySelectorAll('.examples button').forEach(btn=>{
 btn.addEventListener('click',()=>{goal.value=btn.dataset.goal;render()});
});
