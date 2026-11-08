const KEY='moleverse-phase2-progress-v1';
export function getProgress(){try{return JSON.parse(localStorage.getItem(KEY))||{attempts:{},notebook:[],marbles:[]}}catch{return {attempts:{},notebook:[],marbles:[]}}}
export function setProgress(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}}
export function recordAttempt(id,correct,helpUsed){let p=getProgress(),old=p.attempts[id]||{count:0,passed:false,hints:0};p.attempts[id]={count:old.count+1,passed:old.passed||correct,hints:old.hints+(helpUsed?1:0),last:Date.now()};setProgress(p);return p}
export function addNote(note){const p=getProgress();p.notebook.unshift({note,date:new Date().toLocaleString('th-TH')});p.notebook=p.notebook.slice(0,50);setProgress(p)}
export function addMarbleRecord(r){const p=getProgress();p.marbles.unshift({...r,date:new Date().toLocaleString('th-TH')});p.marbles=p.marbles.slice(0,50);setProgress(p)}
export function downloadCSV(){const p=getProgress();const rows=[['id','attempts','passed','hints'],...Object.entries(p.attempts).map(([id,a])=>[id,a.count,a.passed?'yes':'no',a.hints])];const csv='\uFEFF'+rows.map(r=>r.join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='moleverse_progress.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
