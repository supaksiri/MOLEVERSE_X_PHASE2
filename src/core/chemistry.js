export const AVOGADRO=6.02e23;
export const EXACT_AVOGADRO=6.02214076e23;
export const STP_MOLAR_VOLUME=22.4;
export const MASSES={H:1,He:4,Li:7,Be:9,B:11,C:12,N:14,O:16,F:19,Ne:20,Na:23,Mg:24,Al:27,Si:28,P:31,S:32,Cl:35.5,Ar:40,K:39,Ca:40,Fe:56,Cu:63.5,Zn:65,Sn:119,Pb:207};
export const gases=new Set(['H2','O2','N2','CO2','NH3','CH4','Cl2','O3','Ar','He','NO','NO2','HCl','H2S']);
export const chargeMap={'K2SO4':{K:2,'SO4':1},'Al2(SO4)3':{Al:2,'SO4':3},'CaCl2':{Ca:1,Cl:2},'Pb(NO3)2':{Pb:1,'NO3':2}};
export function atomsIn(formula){
 const s=formula.replace(/\s+/g,'').replace(/[₀-₉]/g,ch=>String('₀₁₂₃₄₅₆₇₈₉'.indexOf(ch)));
 let i=0;
 function number(){let st=i;while(i<s.length&&/[0-9]/.test(s[i]))i++;return st===i?1:Number(s.slice(st,i));}
 function group(close=false){let total={};let any=false;while(i<s.length){if(s[i]===')'){if(!close)throw Error('วงเล็บปิดไม่ตรง');i++;return total;}let part={};if(s[i]==='('){i++;part=group(true);}else{let match=/^[A-Z][a-z]?/.exec(s.slice(i));if(!match)throw Error('สูตรเคมีไม่ถูกต้อง');const el=match[0];if(!(el in MASSES))throw Error(`ยังไม่มีข้อมูลธาตุ ${el}`);i+=el.length;part[el]=1;}const mult=number();for(const [k,v] of Object.entries(part))total[k]=(total[k]||0)+v*mult;any=true;}
 if(close)throw Error('วงเล็บเปิดไม่ตรง');if(!any)throw Error('กรุณาใส่สูตรเคมี');return total;}
 const a=group();if(i!==s.length)throw Error('สูตรเคมีไม่ถูกต้อง');return a;
}
export function molarMass(formula){return Object.entries(atomsIn(formula)).reduce((sum,[el,n])=>sum+MASSES[el]*n,0);}
export function chemistryState(formula,amount,unit='mol'){
 const M=molarMass(formula);let n;
 if(unit==='mol')n=amount;else if(unit==='g')n=amount/M;else if(unit==='particles')n=amount/AVOGADRO;else if(unit==='L')n=amount/STP_MOLAR_VOLUME;else throw Error('หน่วยไม่รองรับ');
 if(!Number.isFinite(n)||n<0)throw Error('กรุณากรอกค่าที่ไม่ติดลบ');
 return {formula,M,n,m:n*M,N:n*AVOGADRO,V:gases.has(formula)?n*STP_MOLAR_VOLUME:null,atoms:atomsIn(formula)};
}
export function formatNumber(n,digits=4){if(n===null)return '—';if(n===0)return '0';if(Math.abs(n)>=1e5||Math.abs(n)<.0001){const [a,b]=n.toExponential(digits-1).split('e');return `${Number(a).toString()} × 10${Number(b)>=0?'⁺':'⁻'}${String(Math.abs(Number(b))).replace(/\d/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)])}`;}return Number(n.toPrecision(digits)).toLocaleString('en-US',{maximumFractionDigits:8});}
export function parseAnswer(raw){const s=String(raw).trim().replace(/,/g,'').replace(/×|x|X|⋅/g,'*').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,d=>String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d))).replace(/⁻/g,'-').replace(/⁺/g,'+').replace(/\s+/g,'');if(!s)return NaN;if(/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(s))return Number(s);const sci=/^([+-]?(?:\d+\.?\d*|\.\d+))\*10\^?\(?([+-]?\d+)\)?$/i.exec(s);if(sci)return Number(sci[1])*10**Number(sci[2]);return NaN;}
export function closeEnough(actual,expected){return Number.isFinite(actual)&&Math.abs(actual-expected)<=Math.max(Math.abs(expected)*.012,1e-28);}
export function learningRoute(from,to){let left=from==='g'?'มวล':from==='particles'?'อนุภาค':from==='L'?'ปริมาตรแก๊ส':'โมล';let right=to==='g'?'มวล':to==='particles'?'อนุภาค':to==='L'?'ปริมาตรแก๊ส':'โมล';return from==='mol'||to==='mol'?`${left} → ${right}`:`${left} → โมล → ${right}`;}
