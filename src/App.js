import React, { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════
   DESIGN SYSTEM — Apothecary meets Modern UI
   Palette: Deep sage, warm ivory, aged gold
═══════════════════════════════════════════ */
const D = {
  // Base
  bg:        "#f4f0e8",
  bgDeep:    "#ede7da",
  surface:   "#fdfaf5",
  white:     "#ffffff",

  // Sage green — primary
  sage:      "#2a5c45",
  sageMid:   "#3d7a5c",
  sageLight: "#e4f0ea",
  sagePale:  "#f0f7f3",

  // Terracotta — accent
  clay:      "#b85a32",
  clayLight: "#faf0eb",
  clayPale:  "#fdf7f4",

  // Gold — highlight
  amber:     "#9a6c10",
  amberLight:"#fef8e8",

  // Ink
  ink:       "#18100a",
  inkDeep:   "#2e1f12",
  inkMid:    "#5c4530",
  inkSoft:   "#8c7460",
  inkFaint:  "#c8baa8",

  // Feedback
  danger:    "#9e2a2a",
  dangerBg:  "#fdecea",
  cobalt:    "#1e3d8f",
  cobaltBg:  "#eaeef8",

  // Shadows
  shadow:    "rgba(24, 16, 10, 0.07)",
  shadowMd:  "rgba(24, 16, 10, 0.11)",
};

const Ff = {
  heading: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body:    "'DM Sans', 'Helvetica Neue', system-ui, sans-serif",
  num:     "'Tabular', 'JetBrains Mono', 'DM Mono', monospace",
};

/* ═══════════════════════════════════════════
   ICON LIBRARY (inline SVG)
═══════════════════════════════════════════ */
const I = {
  journal: (s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/></svg>,
  ideas:   (s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  advisor: (s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="12" y2="14"/></svg>,
  profile: (s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  camera:  (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  trash:   (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  check:   (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  warn:    (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>,
  plus:    (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  spark:   (s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  leaf:    (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 22s6-6 10-10S22 2 22 2 16 8 12 12 2 22 2 22z"/><path d="M7 17l5-5"/></svg>,
  arrowR:  (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  activity:(s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  lightning:(s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
};

/* ═══════════════════════════════════════════
   DECORATIVE ELEMENTS
═══════════════════════════════════════════ */
const BotanicalRing = ({ size = 200, color = D.sage, opacity = 0.06 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ position: "absolute", pointerEvents: "none" }}>
    <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="0.8" strokeDasharray="4 6" opacity={opacity}/>
    <circle cx="100" cy="100" r="68" stroke={color} strokeWidth="0.6" strokeDasharray="2 8" opacity={opacity*0.7}/>
    <path d="M100 12 Q120 40 100 60 Q80 40 100 12Z" fill={color} opacity={opacity*0.5}/>
    <path d="M188 100 Q160 120 140 100 Q160 80 188 100Z" fill={color} opacity={opacity*0.4}/>
    <path d="M100 188 Q80 160 100 140 Q120 160 100 188Z" fill={color} opacity={opacity*0.5}/>
    <path d="M12 100 Q40 80 60 100 Q40 120 12 100Z" fill={color} opacity={opacity*0.4}/>
  </svg>
);

const Grain = () => (
  <svg style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0, opacity:0.025, mixBlendMode:"multiply" }}>
    <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <rect width="100%" height="100%" filter="url(#noise)"/>
  </svg>
);

/* ═══════════════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════════════ */

function Btn({ children, onClick, disabled, variant = "primary", size = "md", full }) {
  const [hov, setHov] = useState(false);
  const base = { fontFamily: Ff.body, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s ease", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontWeight: 700, letterSpacing: "0.01em", border: "none", width: full ? "100%" : "auto" };
  const sizes = { sm: { padding: "7px 16px", fontSize: 12, borderRadius: 9 }, md: { padding: "12px 24px", fontSize: 13.5, borderRadius: 13 }, lg: { padding: "15px 32px", fontSize: 15, borderRadius: 15 } };
  const variants = {
    primary:  { background: disabled ? D.bgDeep : hov ? D.sageMid : D.sage, color: disabled ? D.inkSoft : D.white, boxShadow: disabled ? "none" : hov ? `0 6px 24px ${D.sage}50` : `0 3px 14px ${D.sage}40` },
    secondary:{ background: hov ? D.sageLight : D.surface, color: D.sage, boxShadow: `0 1px 4px ${D.shadow}`, border: `1.5px solid ${D.sageLight}` },
    ghost:    { background: hov ? D.sageLight : "transparent", color: D.sage, border: `1.5px solid ${hov ? D.sage+"40" : D.sageLight}` },
    danger:   { background: hov ? D.dangerBg : "transparent", color: D.danger, border: `1.5px solid ${D.danger+"40"}` },
    clay:     { background: disabled ? D.bgDeep : hov ? "#a04a22" : D.clay, color: disabled ? D.inkSoft : D.white, boxShadow: disabled ? "none" : `0 3px 14px ${D.clay}40` },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, ...sizes[size], ...variants[variant] }}>
      {children}
    </button>
  );
}

function Card({ children, style = {}, glow }) {
  return (
    <div style={{
      background: D.white, borderRadius: 22, border: `1px solid ${D.bgDeep}`,
      boxShadow: `0 2px 8px ${D.shadow}, 0 8px 32px ${D.shadow}`,
      overflow: "hidden", position: "relative",
      ...(glow && { boxShadow: `0 2px 8px ${D.shadow}, 0 8px 32px ${glow}18, 0 0 0 1px ${glow}20` }),
      ...style,
    }}>{children}</div>
  );
}

function CardPad({ children, style = {} }) {
  return <div style={{ padding: "22px 24px", ...style }}>{children}</div>;
}

function Divider({ color = D.bgDeep, my = 14 }) {
  return <div style={{ height: 1, background: color, margin: `${my}px 0` }} />;
}

function Tag({ children, color = D.sage, bg }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 11px", borderRadius: 99, background: bg || color + "15", color, fontSize: 11, fontFamily: Ff.body, fontWeight: 600, border: `1px solid ${color}22` }}>
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {eyebrow && <p style={{ fontFamily: Ff.num, fontSize: 10, letterSpacing: "0.14em", color: D.inkSoft, margin: "0 0 6px", textTransform: "uppercase" }}>{eyebrow}</p>}
      <h2 style={{ fontFamily: Ff.heading, fontSize: 30, fontWeight: 700, margin: "0 0 5px", color: D.ink, letterSpacing: "-0.025em", lineHeight: 1.1 }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: Ff.body, fontSize: 13, color: D.inkSoft, margin: 0, lineHeight: 1.5 }}>{subtitle}</p>}
    </div>
  );
}

function FieldLabel({ children }) {
  return <div style={{ fontFamily: Ff.num, fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: D.inkSoft, marginBottom: 6 }}>{children}</div>;
}

function TogglePill({ children, active, color = D.sage, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 14px", borderRadius: 11, cursor: "pointer", textAlign: "left",
      border: `1.5px solid ${active ? color : D.bgDeep}`,
      background: active ? color + "12" : D.surface,
      color: active ? color : D.inkSoft,
      fontFamily: Ff.body, fontSize: 12.5, transition: "all 0.15s",
      fontWeight: active ? 700 : 400,
    }}>{children}</button>
  );
}

function NumeralBlock({ value, unit, label, color = D.sage, size = "md" }) {
  const fs = size === "lg" ? 52 : size === "md" ? 36 : 24;
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: Ff.num, fontSize: fs, fontWeight: 800, color, lineHeight: 1, letterSpacing: "-0.03em" }}>
        {value}<span style={{ fontSize: fs * 0.35, fontWeight: 400, color: D.inkSoft, marginLeft: 2 }}>{unit}</span>
      </div>
      <div style={{ fontFamily: Ff.num, fontSize: 9.5, letterSpacing: "0.1em", color: D.inkSoft, marginTop: 4, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function MacroBar({ label, value, max, color }) {
  const pct = Math.min(100, (value / max) * 100);
  const barColor = pct > 96 ? D.danger : pct > 80 ? D.amber : color;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontFamily: Ff.body, fontSize: 12, color: D.inkMid }}>{label}</span>
        <span style={{ fontFamily: Ff.num, fontSize: 11, color: D.inkSoft }}><strong style={{ color: D.inkDeep }}>{value}</strong>/{max}g</span>
      </div>
      <div style={{ background: D.bgDeep, borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: barColor, borderRadius: 99, transition: "width 0.7s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

function ScoreBadge({ score }) {
  const [c, label] = score >= 8 ? [D.sage, "Excelent"] : score >= 6 ? [D.amber, "Bun"] : score >= 4 ? [D.clay, "Acceptabil"] : [D.danger, "Slab"];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: c + "12", borderRadius: 16, padding: "10px 18px", border: `1.5px solid ${c}30` }}>
      <span style={{ fontFamily: Ff.num, fontSize: 28, fontWeight: 800, color: c, lineHeight: 1, letterSpacing: "-0.03em" }}>{score}</span>
      <span style={{ fontFamily: Ff.num, fontSize: 9, letterSpacing: "0.1em", color: c, marginTop: 3, textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

function MiniMacro({ label, value, color }) {
  return (
    <div style={{ flex: 1, background: D.bg, borderRadius: 12, padding: "9px 8px", textAlign: "center", border: `1px solid ${D.bgDeep}` }}>
      <div style={{ fontFamily: Ff.num, fontSize: 16, fontWeight: 700, color, letterSpacing: "-0.02em" }}>{value}<span style={{ fontSize: 9, fontWeight: 400, color: D.inkSoft }}>g</span></div>
      <div style={{ fontFamily: Ff.num, fontSize: 8.5, color: D.inkSoft, marginTop: 2, letterSpacing: "0.07em" }}>{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const DAYS      = ["Lun","Mar","Mie","Joi","Vin","Sâm","Dum"];
const DAYS_KEYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const ACTIVITIES = [
  { id:"rest",       label:"Zi de odihnă",        emoji:"🌿", extra:0   },
  { id:"walking_8k", label:"Mers pe jos 8k",      emoji:"🚶", extra:300 },
  { id:"running",    label:"Alergare",            emoji:"🏃", extra:500 },
  { id:"gym",        label:"Sală / Forță",        emoji:"💪", extra:400 },
  { id:"yoga",       label:"Yoga / Stretching",   emoji:"🧘", extra:150 },
  { id:"cycling",    label:"Ciclism",             emoji:"🚴", extra:450 },
  { id:"swimming",   label:"Înot",                emoji:"🏊", extra:500 },
  { id:"hiit",       label:"HIIT",                emoji:"⚡", extra:550 },
];
const CONDITIONS = [
  { id:"diabetes",    label:"Diabet / Pre-diabet" },
  { id:"hypertension",label:"Boli cardiovasculare" },
  { id:"ibs",         label:"IBS / Crohn" },
  { id:"celiac",      label:"Celiac / Gluten" },
  { id:"lactose",     label:"Intoleranță lactoză" },
  { id:"gout",        label:"Gută" },
  { id:"kidney",      label:"Boli renale" },
  { id:"thyroid",     label:"Tiroidă" },
  { id:"hpv",         label:"HPV" },
  { id:"skin_barrier",label:"Barieră cutanată" },
  { id:"acne_sugar",  label:"Acnee (zahăr)" },
];
const GOALS = [
  { id:"lose",     label:"Slăbire",          emoji:"⚖️" },
  { id:"maintain", label:"Menținere",        emoji:"🎯" },
  { id:"gain",     label:"Masă musculară",   emoji:"💪" },
  { id:"skin",     label:"Piele sănătoasă",  emoji:"✨" },
  { id:"immunity", label:"Imunitate",        emoji:"🛡️" },
  { id:"energy",   label:"Energie",          emoji:"⚡" },
  { id:"gut",      label:"Digestie",         emoji:"🌿" },
  { id:"hormones", label:"Hormoni",          emoji:"🌸" },
];
const AMULT = { sedentary:1.2, lightly_active:1.375, moderately_active:1.55, very_active:1.725 };
const DEF   = { name:"",age:"",weight:"",height:"",gender:"female",activityLevel:"lightly_active",goals:["maintain"],conditions:[],allergies:"",weekSchedule:{Mon:"walking_8k",Tue:"running",Wed:"rest",Thu:"walking_8k",Fri:"running",Sat:"yoga",Sun:"rest"} };

function todayIdx()  { const d=new Date().getDay(); return d===0?6:d-1; }
function todayKey()  { return DAYS_KEYS[todayIdx()]; }
function tmrwKey()   { return DAYS_KEYS[(todayIdx()+1)%7]; }
function calcTDEE(p) {
  const w=parseFloat(p.weight),h=parseFloat(p.height),a=parseFloat(p.age);
  if(!w||!h||!a) return null;
  let bmr=p.gender==="male"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;
  let t=bmr*(AMULT[p.activityLevel]||1.375);
  const act=ACTIVITIES.find(x=>x.id===(p.weekSchedule?.[todayKey()]||"rest"));
  t+=act?.extra||0;
  if(p.goals?.includes("lose")) t-=400;
  if(p.goals?.includes("gain")) t+=300;
  return Math.round(t);
}

/* ═══════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════ */
export default function App() {
  const [tab,setTab]     = useState("journal");
  const [prof,setProf]   = useState(DEF);
  const [saved,setSaved] = useState(false);
  const [meals,setMeals] = useState([]);
  const [txt,setTxt]     = useState("");
  const [loading,setLd]  = useState(false);
  const [result,setRes]  = useState(null);
  const [p64,setP64]     = useState(null);
  const [pUrl,setPUrl]   = useState(null);
  const [ideas,setIdeas] = useState([]);
  const [iLoad,setIL]    = useState(false);
  const [mType,setMType] = useState("toate");
  const [advice,setAdv]  = useState("");
  const [aLoad,setAL]    = useState(false);
  const fRef = useRef();

  const tdee    = calcTDEE(prof);
  const totCal  = meals.reduce((s,m)=>s+(m.calories||0),0);
  const totProt = meals.reduce((s,m)=>s+(m.protein||0),0);
  const totCarb = meals.reduce((s,m)=>s+(m.carbs||0),0);
  const totFat  = meals.reduce((s,m)=>s+(m.fat||0),0);
  const pTgt    = prof.weight?Math.round(parseFloat(prof.weight)*(prof.goals?.includes("gain")?2.2:1.6)):120;
  const cTgt    = tdee?Math.round((tdee*.45)/4):200;
  const fTgt    = tdee?Math.round((tdee*.30)/9):70;
  const cLeft   = tdee?tdee-totCal:null;
  const calPct  = tdee?Math.min(100,Math.round((totCal/tdee)*100)):0;

  const tk     = todayKey();
  const tmk    = tmrwKey();
  const tAct   = ACTIVITIES.find(a=>a.id===(prof.weekSchedule?.[tk]||"rest"));
  const tmAct  = ACTIVITIES.find(a=>a.id===(prof.weekSchedule?.[tmk]||"rest"));
  const tLbl   = tAct?.label||"Zi de odihnă";
  const tmLbl  = tmAct?.label||"Zi de odihnă";
  const tXtra  = tAct?.extra||0;
  const tmXtra = tmAct?.extra||0;

  const tog = (key,id) => setProf(p=>({...p,[key]:p[key].includes(id)?p[key].filter(x=>x!==id):[...p[key],id]}));

  function handlePhoto(e) {
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader();
    r.onload=ev=>{setPUrl(ev.target.result);setP64(ev.target.result.split(",")[1]);};
    r.readAsDataURL(f);
  }
  const clearPhoto=()=>{setP64(null);setPUrl(null);if(fRef.current)fRef.current.value="";};

  async function analyze() {
    if(!txt.trim()&&!p64) return;
    setLd(true); setRes(null);
    const ctx=`Azi:${tLbl}(+${tXtra}kcal),Mâine:${tmLbl}. Condiții:${prof.conditions.join(",")||"niciuna"}. Obiective:${prof.goals.join(",")}. Alergii:${prof.allergies||"niciuna"}.`;
    const fmt=`{"name":"str","calories":n,"protein":n,"carbs":n,"fat":n,"fiber":n,"sugar":n,"warnings":["str"],"improvements":["str"],"score":n}`;
    const prompt=`Analizează masa${txt?` "${txt}"`:" din imagine"}. ${ctx} Răspunde DOAR JSON: ${fmt}`;
    const body=p64?[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:p64}},{type:"text",text:prompt}]:prompt;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:body}]})});
      const d=await r.json();
      setRes(JSON.parse(d.content.map(i=>i.text||"").join("").replace(/```json|```/g,"").trim()));
    }catch{setRes({error:"Nu s-a putut analiza."});}
    setLd(false);
  }

  function addMeal(){
    if(!result||result.error) return;
    setMeals(p=>[...p,{...result,id:Date.now(),time:new Date().toLocaleTimeString("ro-RO",{hour:"2-digit",minute:"2-digit"}),photo:pUrl||null}]);
    setTxt(""); setRes(null); clearPhoto();
  }

  async function genIdeas(){
    setIL(true); setIdeas([]);
    const cRem=tdee?Math.max(0,tdee-totCal):500;
    const p=`Nutriționist. 4 idei mese în română. Condiții:${prof.conditions.join(",")||"niciuna"}. Obiective:${prof.goals.join(",")}. Azi:${tLbl}, Mâine:${tmLbl}. ${mType!=="toate"?`Tip:${mType}.`:""} Calorii rămase:${cRem}. Alergii:${prof.allergies||"niciuna"}. Răspunde DOAR array JSON:[{"name":"str","calories":n,"protein":n,"carbs":n,"fat":n,"ingredients":["str"],"tip":"str"}]`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,messages:[{role:"user",content:p}]})});
      const d=await r.json();
      setIdeas(JSON.parse(d.content.map(i=>i.text||"").join("").replace(/```json|```/g,"").trim()));
    }catch{setIdeas([{error:"Nu s-au putut genera idei."}]);}
    setIL(false);
  }

  async function genAdvice(){
    setAL(true); setAdv("");
    const ms=meals.length?meals.map(m=>`${m.name}(${m.calories}kcal)`).join(", "):"Nicio masă.";
    const p=`Nutriționist clinician. Sfaturi în română. ${prof.age}ani,${prof.gender},${prof.weight}kg. Condiții:${prof.conditions.join(",")||"niciuna"}. Obiective:${prof.goals.join(",")}. Azi:${tLbl}(+${tXtra}kcal),Mâine:${tmLbl}(${tmXtra}kcal). Mese:${ms}. Aport:${totCal}/${tdee||"?"}kcal. 3-4 paragrafe. Dacă skin/acne: dietă-piele. Dacă hpv: imunitate. Încheie cu 2 sugestii mese.`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:p}]})});
      const d=await r.json();
      setAdv(d.content.map(i=>i.text||"").join("")||"Nu există sfaturi.");
    }catch{setAdv("Eroare.");}
    setAL(false);
  }

  const inp = { background:D.bg, border:`1.5px solid ${D.bgDeep}`, borderRadius:13, padding:"12px 15px", color:D.ink, fontFamily:Ff.body, fontSize:13.5, width:"100%", boxSizing:"border-box", outline:"none", transition:"border-color 0.15s, box-shadow 0.15s" };
  const sel = { ...inp, cursor:"pointer" };

  const NAV = [
    { id:"journal", label:"Jurnal",  fn:I.journal },
    { id:"ideas",   label:"Idei",    fn:I.ideas   },
    { id:"advisor", label:"Sfaturi", fn:I.advisor },
    { id:"profile", label:"Profil",  fn:I.profile },
  ];

  return (
    <div style={{ minHeight:"100vh", background:D.bg, fontFamily:Ff.body, paddingBottom:88, color:D.ink, position:"relative" }}>
      <Grain/>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box}
        input:focus{border-color:#2a5c45!important;box-shadow:0 0 0 3px rgba(42,92,69,0.12)!important}
        select:focus{outline:none;border-color:#2a5c45!important}
        ::placeholder{color:#c8baa8}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#d8cfc4;border-radius:9px}
      `}</style>

      {/* ━━━━━━━━━━ TOP HEADER ━━━━━━━━━━ */}
      <header style={{ position:"sticky", top:0, zIndex:300, background:"rgba(244,240,232,0.9)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${D.bgDeep}`, padding:"0 20px" }}>
        <div style={{ maxWidth:640, margin:"0 auto", height:58, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${D.sage},${D.sageMid})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 2px 8px ${D.sage}40` }}>
              <span style={{ fontSize:18 }}>🌿</span>
            </div>
            <div>
              <h1 style={{ fontFamily:Ff.heading, fontSize:21, fontWeight:700, margin:0, color:D.sage, letterSpacing:"-0.02em", lineHeight:1 }}>NutriCare</h1>
              <p style={{ margin:0, fontSize:10, color:D.inkSoft, fontFamily:Ff.num, letterSpacing:"0.07em" }}>
                {DAYS[todayIdx()]} · {tAct?.emoji} {tLbl}
              </p>
            </div>
          </div>
          {tdee ? (
            <div style={{ background:cLeft>0?D.sageLight:D.dangerBg, borderRadius:14, padding:"6px 14px", textAlign:"right", border:`1px solid ${cLeft>0?D.sage:D.danger}25` }}>
              <div style={{ fontFamily:Ff.num, fontSize:20, fontWeight:800, color:cLeft>0?D.sage:D.danger, letterSpacing:"-0.03em", lineHeight:1 }}>{Math.max(0,cLeft||0)}</div>
              <div style={{ fontFamily:Ff.num, fontSize:8.5, color:D.inkSoft, letterSpacing:"0.08em", textTransform:"uppercase" }}>kcal rămase</div>
            </div>
          ) : (
            <Btn size="sm" onClick={()=>setTab("profile")}>Completează profilul</Btn>
          )}
        </div>
      </header>

      {/* ━━━━━━━━━━ CONTENT ━━━━━━━━━━ */}
      <main style={{ maxWidth:640, margin:"0 auto", padding:"24px 16px" }}>

        {/* ══════════════════════════════
                  JURNAL AZI
        ══════════════════════════════ */}
        {tab==="journal" && (
          <div>
            {/* Hero summary */}
            <div style={{ position:"relative", borderRadius:26, overflow:"hidden", marginBottom:20, background:`linear-gradient(145deg, ${D.sage} 0%, ${D.sageMid} 50%, #1a4a32 100%)`, padding:"28px 26px", boxShadow:`0 12px 48px ${D.sage}50` }}>
              <div style={{ position:"absolute", right:-30, top:-30, opacity:1 }}>
                <BotanicalRing size={220} color="#ffffff" opacity={0.06}/>
              </div>
              <div style={{ position:"relative", zIndex:1 }}>
                <p style={{ fontFamily:Ff.num, fontSize:10, letterSpacing:"0.14em", color:"rgba(255,255,255,0.5)", margin:"0 0 10px", textTransform:"uppercase" }}>Jurnalul de Azi</p>

                <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:20 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                      <span style={{ fontFamily:Ff.num, fontSize:60, fontWeight:800, color:D.white, lineHeight:1, letterSpacing:"-0.04em" }}>{totCal}</span>
                      <span style={{ fontFamily:Ff.num, fontSize:16, color:"rgba(255,255,255,0.5)", paddingBottom:8 }}>kcal</span>
                    </div>
                    <p style={{ fontFamily:Ff.body, fontSize:13, color:"rgba(255,255,255,0.55)", margin:0 }}>din {tdee||"—"} kcal zilnic</p>
                  </div>
                  {tdee && (
                    <div style={{ width:72, height:72, position:"relative", flexShrink:0 }}>
                      <svg width="72" height="72" viewBox="0 0 72 72">
                        <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="7"/>
                        <circle cx="36" cy="36" r="28" fill="none"
                          stroke={calPct>100?"#f87171":"rgba(255,255,255,0.85)"} strokeWidth="7"
                          strokeDasharray={`${2*Math.PI*28}`}
                          strokeDashoffset={`${2*Math.PI*28*(1-calPct/100)}`}
                          strokeLinecap="round" transform="rotate(-90 36 36)"
                          style={{transition:"stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)"}}
                        />
                      </svg>
                      <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
                        <span style={{ fontFamily:Ff.num, fontSize:16, fontWeight:800, color:D.white, lineHeight:1 }}>{calPct}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Macro bars on dark */}
                {tdee && (
                  <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                    {[["Proteine",totProt,pTgt,"#86efac"],["Carbohidrați",totCarb,cTgt,"#93c5fd"],["Grăsimi",totFat,fTgt,"#fcd34d"]].map(([l,v,m,c])=>(
                      <div key={l} style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontFamily:Ff.body, fontSize:11, color:"rgba(255,255,255,0.55)", width:90, flexShrink:0 }}>{l}</span>
                        <div style={{ flex:1, background:"rgba(255,255,255,0.12)", borderRadius:99, height:5, overflow:"hidden" }}>
                          <div style={{ width:`${Math.min(100,(v/m)*100)}%`, height:"100%", background:c, borderRadius:99, transition:"width 0.7s ease" }}/>
                        </div>
                        <span style={{ fontFamily:Ff.num, fontSize:10.5, color:"rgba(255,255,255,0.6)", width:60, textAlign:"right", flexShrink:0 }}>{v}/{m}g</span>
                      </div>
                    ))}
                  </div>
                )}

                {(tXtra>0||tmXtra>0) && (
                  <div style={{ display:"flex", gap:8, marginTop:16, flexWrap:"wrap" }}>
                    {tXtra>0 && <Tag color="#86efac" bg="rgba(255,255,255,0.12)">{tAct?.emoji} {tLbl} · +{tXtra} kcal</Tag>}
                    {tmXtra>0 && <Tag color="#fcd34d" bg="rgba(255,255,255,0.08)">⚡ Mâine: {tmLbl}</Tag>}
                  </div>
                )}
              </div>
            </div>

            {/* Add meal */}
            <Card glow={D.sage} style={{ marginBottom:16 }}>
              <CardPad>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:D.sageLight, display:"flex", alignItems:"center", justifyContent:"center", color:D.sage }}>{I.plus(15)}</div>
                  <span style={{ fontFamily:Ff.num, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:D.sage, fontWeight:600 }}>Adaugă o masă</span>
                </div>

                {(tXtra>0||tmXtra>0) && (
                  <div style={{ background:D.sagePale, borderRadius:12, padding:"10px 14px", marginBottom:14, border:`1px solid ${D.sage}18` }}>
                    {tXtra>0 && <p style={{ fontFamily:Ff.body, fontSize:12, color:D.inkMid, margin:"0 0 3px", lineHeight:1.5 }}>💪 Ai <strong style={{color:D.sage}}>{tLbl}</strong> azi — AI-ul recomandă proteine pentru recuperare.</p>}
                    {tmXtra>0 && <p style={{ fontFamily:Ff.body, fontSize:12, color:D.inkMid, margin:0, lineHeight:1.5 }}>⚡ Mâine: <strong style={{color:D.amber}}>{tmLbl}</strong> — AI-ul sugerează carbohidrați pentru pregătire.</p>}
                  </div>
                )}

                <input value={txt} onChange={e=>setTxt(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&analyze()}
                  placeholder="ex: omletă cu spanac și pâine integrală..."
                  style={{ ...inp, marginBottom:10 }}/>

                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <label style={{ display:"flex",alignItems:"center",gap:7,padding:"9px 16px",borderRadius:11,border:`1.5px dashed ${D.bgDeep}`,background:D.surface,cursor:"pointer",fontSize:12,color:D.inkSoft,fontFamily:Ff.body,flexShrink:0 }}>
                    {I.camera(15)} Adaugă poză
                    <input ref={fRef} type="file" accept="image/*" capture="environment" onChange={handlePhoto} style={{display:"none"}}/>
                  </label>
                  {pUrl && (
                    <div style={{ display:"flex",alignItems:"center",gap:8,flex:1 }}>
                      <img src={pUrl} alt="" style={{ width:44,height:44,borderRadius:10,objectFit:"cover",border:`2px solid ${D.sage}40` }}/>
                      <span style={{ fontSize:11,color:D.sage,fontFamily:Ff.num,flex:1 }}>✓ Gata</span>
                      <Btn size="sm" variant="danger" onClick={clearPhoto}>✕</Btn>
                    </div>
                  )}
                </div>

                <Btn onClick={analyze} disabled={loading||(!txt.trim()&&!p64)} full>
                  {loading ? "Se analizează..." : <>{I.spark(14)} Analizează</>}
                </Btn>
              </CardPad>

              {/* Analysis result */}
              {result&&!result.error && (
                <div style={{ borderTop:`1px solid ${D.bgDeep}`, background:D.surface }}>
                  <CardPad>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
                      <div>
                        <h3 style={{ fontFamily:Ff.heading, fontSize:22, fontWeight:700, margin:"0 0 2px", color:D.ink, letterSpacing:"-0.01em" }}>{result.name}</h3>
                        <div>
                          <span style={{ fontFamily:Ff.num, fontSize:34, fontWeight:800, color:D.sage, letterSpacing:"-0.03em" }}>{result.calories}</span>
                          <span style={{ fontFamily:Ff.body, fontSize:14, color:D.inkSoft }}> kcal</span>
                        </div>
                      </div>
                      <ScoreBadge score={result.score}/>
                    </div>

                    <div style={{ display:"flex", gap:7, marginBottom:14 }}>
                      <MiniMacro label="PROT"  value={result.protein} color={D.sage}/>
                      <MiniMacro label="CARB"  value={result.carbs}   color={D.cobalt}/>
                      <MiniMacro label="GRĂS"  value={result.fat}     color={D.amber}/>
                      <MiniMacro label="ZAHĂR" value={result.sugar}   color={D.clay}/>
                      <MiniMacro label="FIBRE" value={result.fiber}   color={D.sageMid}/>
                    </div>

                    {result.warnings?.length>0 && (
                      <div style={{ background:D.amberLight, borderRadius:12, padding:"11px 14px", marginBottom:12, border:`1px solid ${D.amber}22` }}>
                        {result.warnings.map((w,i)=>(
                          <div key={i} style={{ display:"flex",gap:8,alignItems:"flex-start",fontSize:12.5,color:D.inkDeep,marginBottom:i<result.warnings.length-1?6:0,lineHeight:1.5,fontFamily:Ff.body }}>
                            <span style={{ color:D.amber,flexShrink:0,marginTop:1 }}>{I.warn(13)}</span>{w}
                          </div>
                        ))}
                      </div>
                    )}

                    {result.improvements?.length>0 && (
                      <div style={{ marginBottom:16 }}>
                        <p style={{ fontFamily:Ff.num, fontSize:9.5, letterSpacing:"0.12em", color:D.inkSoft, textTransform:"uppercase", margin:"0 0 8px" }}>Îmbunătățiri</p>
                        {result.improvements.map((t,i)=>(
                          <div key={i} style={{ display:"flex",gap:8,alignItems:"flex-start",fontSize:12.5,color:D.inkMid,marginBottom:6,lineHeight:1.5,fontFamily:Ff.body }}>
                            <span style={{ color:D.sage,flexShrink:0,marginTop:1 }}>{I.check(13)}</span>{t}
                          </div>
                        ))}
                      </div>
                    )}

                    <Btn onClick={addMeal} full>{I.plus(14)} Adaugă în jurnal</Btn>
                  </CardPad>
                </div>
              )}
              {result?.error && <CardPad><p style={{ color:D.danger, fontSize:12.5, fontFamily:Ff.body, margin:0 }}>{result.error}</p></CardPad>}
            </Card>

            {/* Meal log */}
            {meals.length>0 && (
              <Card>
                <CardPad style={{ paddingBottom:14 }}>
                  <p style={{ fontFamily:Ff.num, fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:D.inkSoft, margin:0 }}>Mesele de azi</p>
                </CardPad>
                <div style={{ paddingBottom:4 }}>
                  {meals.map((m,i)=>(
                    <div key={m.id} style={{ display:"flex",alignItems:"center",gap:14,padding:"12px 24px",borderBottom:i<meals.length-1?`1px solid ${D.bg}`:"none" }}>
                      {m.photo && <img src={m.photo} alt="" style={{ width:50,height:50,borderRadius:12,objectFit:"cover",border:`1.5px solid ${D.bgDeep}`,flexShrink:0 }}/>}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:14,fontWeight:600,color:D.ink,marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{m.name}</div>
                        <div style={{ fontFamily:Ff.num,fontSize:10.5,color:D.inkSoft }}>{m.time} · P:{m.protein}g · C:{m.carbs}g · G:{m.fat}g</div>
                      </div>
                      <div style={{ display:"flex",alignItems:"center",gap:10,flexShrink:0 }}>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontFamily:Ff.num,fontSize:18,fontWeight:800,color:D.sage,letterSpacing:"-0.02em",lineHeight:1 }}>{m.calories}</div>
                          <div style={{ fontFamily:Ff.num,fontSize:9,color:D.inkSoft }}>kcal</div>
                        </div>
                        <button onClick={()=>setMeals(p=>p.filter(x=>x.id!==m.id))} style={{ background:"none",border:"none",color:D.inkFaint,cursor:"pointer",padding:6,borderRadius:8,transition:"all 0.12s",display:"flex",alignItems:"center" }}
                          onMouseEnter={e=>e.currentTarget.style.color=D.danger}
                          onMouseLeave={e=>e.currentTarget.style.color=D.inkFaint}
                        >{I.trash(14)}</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",padding:"12px 24px",background:D.bg,borderTop:`1px solid ${D.bgDeep}` }}>
                  <span style={{ fontFamily:Ff.num, fontSize:11.5, color:D.inkSoft }}>Total: <strong style={{ color:D.sage }}>{totCal} kcal</strong></span>
                  {tdee && <span style={{ fontFamily:Ff.num, fontSize:11.5, color:D.inkSoft }}>Rămas: <strong style={{ color:cLeft>0?D.sage:D.danger }}>{Math.max(0,cLeft||0)} kcal</strong></span>}
                </div>
              </Card>
            )}

            {meals.length===0&&!result && (
              <div style={{ textAlign:"center", padding:"48px 0" }}>
                <div style={{ fontSize:40, marginBottom:12, opacity:0.35 }}>🥣</div>
                <p style={{ fontFamily:Ff.body, fontSize:14, color:D.inkSoft }}>Înregistrează prima masă mai sus</p>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════
                  IDEI DE MESE
        ══════════════════════════════ */}
        {tab==="ideas" && (
          <div>
            <SectionHeader eyebrow="AI · Nutriție" title="Idei de Mese" subtitle="Sugestii personalizate după profilul și caloriile rămase azi"/>

            {/* Filter card */}
            <Card style={{ marginBottom:18 }}>
              <CardPad>
                <FieldLabel>Tip de masă</FieldLabel>
                <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:18 }}>
                  {["toate","mic dejun","prânz","cină","gustare"].map(t=>(
                    <button key={t} onClick={()=>setMType(t)} style={{
                      padding:"7px 16px", borderRadius:99, cursor:"pointer",
                      border:`1.5px solid ${mType===t?D.clay:D.bgDeep}`,
                      background:mType===t?`linear-gradient(135deg,${D.clay},#a04a22)`:D.surface,
                      color:mType===t?D.white:D.inkSoft,
                      fontFamily:Ff.body, fontSize:12, fontWeight:mType===t?700:400,
                      transition:"all 0.15s",
                      boxShadow:mType===t?`0 3px 12px ${D.clay}40`:"none",
                    }}>{t}</button>
                  ))}
                </div>

                {tdee && (
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:`linear-gradient(135deg,${D.clay}10,${D.clay}06)`, borderRadius:14, padding:"14px 18px", marginBottom:18, border:`1px solid ${D.clay}20` }}>
                    <div>
                      <p style={{ fontFamily:Ff.num, fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:D.inkSoft, margin:"0 0 3px" }}>Calorii disponibile</p>
                      <p style={{ fontFamily:Ff.body, fontSize:12, color:D.inkMid, margin:0 }}>Azi ai mâncat {totCal} din {tdee} kcal</p>
                    </div>
                    <div style={{ fontFamily:Ff.num, fontSize:32, fontWeight:800, color:D.clay, letterSpacing:"-0.03em" }}>{Math.max(0,tdee-totCal)}<span style={{ fontSize:12, fontWeight:400, color:D.inkSoft }}> kcal</span></div>
                  </div>
                )}

                <Btn variant="clay" onClick={genIdeas} disabled={iLoad} full>
                  {iLoad ? "Se generează..." : <>{I.spark(14)} Generează 4 Idei</>}
                </Btn>
              </CardPad>
            </Card>

            {ideas.length>0&&!ideas[0]?.error && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {ideas.map((idea,i)=>(
                  <Card key={i}>
                    <div style={{ background:`linear-gradient(135deg,${D.clay}08,transparent)`, padding:"20px 24px 16px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                        <div style={{ flex:1, paddingRight:12 }}>
                          <h3 style={{ fontFamily:Ff.heading, fontSize:22, fontWeight:700, margin:"0 0 3px", color:D.ink, letterSpacing:"-0.01em", lineHeight:1.2 }}>{idea.name}</h3>
                          <span style={{ fontFamily:Ff.num, fontSize:30, fontWeight:800, color:D.clay, letterSpacing:"-0.03em" }}>{idea.calories}</span>
                          <span style={{ fontFamily:Ff.body, fontSize:13, color:D.inkSoft }}> kcal</span>
                        </div>
                        <Btn variant="ghost" size="sm" onClick={()=>{setMeals(p=>[...p,{...idea,id:Date.now(),time:new Date().toLocaleTimeString("ro-RO",{hour:"2-digit",minute:"2-digit"}),warnings:[],improvements:[],score:7,fiber:0,sugar:0}]);setTab("journal");}}>
                          {I.plus(12)} Adaugă
                        </Btn>
                      </div>

                      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                        <MiniMacro label="PROT" value={idea.protein} color={D.sage}/>
                        <MiniMacro label="CARB" value={idea.carbs}   color={D.cobalt}/>
                        <MiniMacro label="GRĂS" value={idea.fat}     color={D.amber}/>
                      </div>

                      {idea.ingredients?.length>0 && (
                        <div style={{ marginBottom:idea.tip?12:0 }}>
                          <FieldLabel>Ingrediente</FieldLabel>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                            {idea.ingredients.map((ing,j)=>(
                              <span key={j} style={{ fontSize:11.5, padding:"4px 11px", borderRadius:99, border:`1px solid ${D.bgDeep}`, color:D.inkMid, background:D.surface, fontFamily:Ff.body }}>{ing}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {idea.tip && (
                      <div style={{ background:D.sageLight, padding:"12px 24px", borderTop:`1px solid ${D.sage}15`, display:"flex", gap:9, alignItems:"flex-start" }}>
                        <span style={{ color:D.sage, flexShrink:0, marginTop:2 }}>{I.leaf(13)}</span>
                        <span style={{ fontSize:12.5, color:D.sageMid, fontFamily:Ff.body, lineHeight:1.6, fontStyle:"italic" }}>{idea.tip}</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
            {ideas[0]?.error && <p style={{ color:D.danger, textAlign:"center", fontFamily:Ff.body, fontSize:13 }}>{ideas[0].error}</p>}
            {ideas.length===0&&!iLoad && (
              <div style={{ textAlign:"center", padding:"48px 0" }}>
                <div style={{ fontSize:40, marginBottom:12, opacity:0.3 }}>🍽️</div>
                <p style={{ fontFamily:Ff.body, fontSize:14, color:D.inkSoft }}>Apasă „Generează" pentru sugestii personalizate</p>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════
                  SFATURI AI
        ══════════════════════════════ */}
        {tab==="advisor" && (
          <div>
            <SectionHeader eyebrow="Nutriționist AI" title="Sfaturile Tale" subtitle="Analiză personalizată bazată pe profilul și mesele tale"/>

            {/* Context card */}
            <Card style={{ marginBottom:18 }}>
              <CardPad>
                <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
                  {tXtra>0 && <Tag color={D.sage}>{tAct?.emoji} {tLbl} · +{tXtra} kcal</Tag>}
                  {tmXtra>0 && <Tag color={D.amber}>⚡ Mâine: {tmLbl}</Tag>}
                  {prof.goals.slice(0,2).map(g=>{ const gd=GOALS.find(x=>x.id===g); return gd?<Tag key={g} color={D.cobalt}>{gd.emoji} {gd.label}</Tag>:null; })}
                </div>
                <p style={{ fontFamily:Ff.body, fontSize:13, color:D.inkMid, margin:"0 0 18px", lineHeight:1.7 }}>
                  AI-ul analizează mesele de azi ({totCal} kcal din {tdee||"—"}), activitatea fizică, condițiile medicale și obiectivele tale.
                </p>
                <Btn onClick={genAdvice} disabled={aLoad} full>
                  {aLoad ? "Se generează..." : <>{I.spark(14)} Obține Sfaturile Mele</>}
                </Btn>
              </CardPad>
            </Card>

            {advice && (
              <Card>
                <CardPad>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18, paddingBottom:16, borderBottom:`1px solid ${D.bgDeep}` }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:D.sageLight, display:"flex", alignItems:"center", justifyContent:"center", color:D.sage, flexShrink:0 }}>{I.spark(16)}</div>
                    <div>
                      <p style={{ fontFamily:Ff.num, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:D.sage, margin:"0 0 1px" }}>Sfaturile Tale Personalizate</p>
                      <p style={{ fontFamily:Ff.body, fontSize:11.5, color:D.inkSoft, margin:0 }}>Generat pe baza profilului și meselor de azi</p>
                    </div>
                  </div>
                  <div style={{ fontFamily:Ff.body, fontSize:13.5, color:D.inkMid, lineHeight:1.9, whiteSpace:"pre-wrap" }}>{advice}</div>
                </CardPad>
              </Card>
            )}
            {!advice&&!aLoad && (
              <div style={{ textAlign:"center", padding:"48px 0" }}>
                <div style={{ fontSize:40, marginBottom:12, opacity:0.3 }}>🤖</div>
                <p style={{ fontFamily:Ff.body, fontSize:14, color:D.inkSoft }}>Completează profilul și înregistrează mese pentru sfaturi precise</p>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════
                  PROFIL
        ══════════════════════════════ */}
        {tab==="profile" && (
          <div>
            <SectionHeader eyebrow="Configurare" title="Profilul Meu" subtitle="Completează detaliile pentru calcule precise și sfaturi personalizate"/>

            {/* TDEE highlight */}
            {tdee && (
              <div style={{ borderRadius:22, overflow:"hidden", marginBottom:18, background:`linear-gradient(145deg,${D.sage} 0%,${D.sageMid} 100%)`, boxShadow:`0 10px 40px ${D.sage}50` }}>
                <div style={{ padding:"22px 26px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative" }}>
                  <div style={{ position:"absolute", right:10, top:10, opacity:1 }}>
                    <BotanicalRing size={160} color="#ffffff" opacity={0.07}/>
                  </div>
                  <div style={{ position:"relative", zIndex:1 }}>
                    <p style={{ fontFamily:Ff.num, fontSize:9.5, letterSpacing:"0.14em", color:"rgba(255,255,255,0.5)", margin:"0 0 6px", textTransform:"uppercase" }}>Ținta Ta Zilnică</p>
                    <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                      <span style={{ fontFamily:Ff.num, fontSize:50, fontWeight:800, color:D.white, letterSpacing:"-0.04em", lineHeight:1 }}>{tdee}</span>
                      <span style={{ fontFamily:Ff.body, fontSize:15, color:"rgba(255,255,255,0.5)" }}>kcal/zi</span>
                    </div>
                    <p style={{ fontFamily:Ff.num, fontSize:11, color:"rgba(255,255,255,0.5)", margin:"6px 0 0" }}>P~{pTgt}g · C~{cTgt}g · G~{fTgt}g</p>
                    {tXtra>0 && <p style={{ fontFamily:Ff.body, fontSize:12, color:"rgba(255,255,255,0.6)", margin:"4px 0 0" }}>Include +{tXtra} kcal pentru {tLbl}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Personal data */}
            <Card style={{ marginBottom:14 }}>
              <CardPad>
                <p style={{ fontFamily:Ff.num, fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:D.inkSoft, margin:"0 0 16px", fontWeight:600 }}>Date Personale</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
                  {[["Nume","name","text","ex: Maria"],["Vârstă","age","number","ani"],["Greutate (kg)","weight","number","kg"],["Înălțime (cm)","height","number","cm"]].map(([l,k,t,ph])=>(
                    <div key={k}>
                      <FieldLabel>{l}</FieldLabel>
                      <input type={t} value={prof[k]} placeholder={ph} onChange={e=>setProf(p=>({...p,[k]:e.target.value}))} style={inp}/>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:14 }}>
                  <FieldLabel>Sex</FieldLabel>
                  <div style={{ display:"flex", gap:8 }}>
                    {[["female","Femeie"],["male","Bărbat"],["other","Altul"]].map(([v,l])=>(
                      <button key={v} onClick={()=>setProf(p=>({...p,gender:v}))} style={{
                        padding:"9px 18px", borderRadius:11, cursor:"pointer",
                        border:`1.5px solid ${prof.gender===v?D.sage:D.bgDeep}`,
                        background:prof.gender===v?D.sageLight:D.surface,
                        color:prof.gender===v?D.sage:D.inkSoft,
                        fontFamily:Ff.body, fontSize:13, fontWeight:prof.gender===v?700:400, transition:"all 0.15s",
                      }}>{l}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel>Nivel activitate de bază</FieldLabel>
                  <select value={prof.activityLevel} onChange={e=>setProf(p=>({...p,activityLevel:e.target.value}))} style={sel}>
                    <option value="sedentary">Sedentar (birou, puțin mers)</option>
                    <option value="lightly_active">Ușor activ (1–3x/săptămână)</option>
                    <option value="moderately_active">Moderat activ (3–5x/săptămână)</option>
                    <option value="very_active">Foarte activ (6–7x/săptămână)</option>
                  </select>
                </div>
              </CardPad>
            </Card>

            {/* Weekly schedule */}
            <Card style={{ marginBottom:14 }}>
              <CardPad>
                <p style={{ fontFamily:Ff.num, fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:D.inkSoft, margin:"0 0 6px", fontWeight:600 }}>Program Săptămânal</p>
                <p style={{ fontFamily:Ff.body, fontSize:12, color:D.inkSoft, margin:"0 0 14px", lineHeight:1.5 }}>Ținta de calorii se ajustează automat în funcție de activitatea zilei.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {DAYS_KEYS.map((dk,idx)=>{
                    const isTod=dk===tk;
                    const aId=prof.weekSchedule?.[dk]||"rest";
                    const xtra=ACTIVITIES.find(a=>a.id===aId)?.extra||0;
                    return (
                      <div key={dk} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 13px", borderRadius:13, border:`1.5px solid ${isTod?D.sage:D.bgDeep}`, background:isTod?D.sagePale:D.surface, transition:"all 0.15s" }}>
                        <span style={{ fontFamily:Ff.num, fontSize:11, fontWeight:isTod?800:400, color:isTod?D.sage:D.inkSoft, minWidth:44 }}>{DAYS[idx]}{isTod?" ★":""}</span>
                        <select value={aId} onChange={e=>{const s={...prof.weekSchedule};s[dk]=e.target.value;setProf(p=>({...p,weekSchedule:s}));}} style={{ flex:1, background:"transparent", border:`1px solid ${isTod?D.sage+"30":D.bgDeep}`, borderRadius:9, padding:"6px 10px", color:D.ink, fontFamily:Ff.body, fontSize:12.5, outline:"none", cursor:"pointer" }}>
                          {ACTIVITIES.map(a=><option key={a.id} value={a.id}>{a.emoji} {a.label}</option>)}
                        </select>
                        {xtra>0 && <span style={{ fontFamily:Ff.num, fontSize:11, color:D.sage, whiteSpace:"nowrap", fontWeight:700 }}>+{xtra}</span>}
                      </div>
                    );
                  })}
                </div>
              </CardPad>
            </Card>

            {/* Goals — 2-col visual grid */}
            <Card style={{ marginBottom:14 }}>
              <CardPad>
                <p style={{ fontFamily:Ff.num, fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:D.inkSoft, margin:"0 0 14px", fontWeight:600 }}>Obiective</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
                  {GOALS.map(g=>{
                    const on=prof.goals?.includes(g.id);
                    return (
                      <button key={g.id} onClick={()=>tog("goals",g.id)} style={{
                        padding:"11px 14px", borderRadius:14, cursor:"pointer", textAlign:"left",
                        border:`1.5px solid ${on?D.sage:D.bgDeep}`,
                        background:on?D.sageLight:D.surface,
                        color:on?D.sage:D.inkSoft,
                        fontFamily:Ff.body, fontSize:13, transition:"all 0.15s", fontWeight:on?700:400,
                        boxShadow:on?`0 2px 8px ${D.sage}20`:"none",
                      }}>
                        <span style={{ marginRight:6, fontSize:15 }}>{g.emoji}</span>{on?"✓ ":""}{g.label}
                      </button>
                    );
                  })}
                </div>
              </CardPad>
            </Card>

            {/* Conditions */}
            <Card style={{ marginBottom:18 }}>
              <CardPad>
                <p style={{ fontFamily:Ff.num, fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:D.inkSoft, margin:"0 0 14px", fontWeight:600 }}>Condiții Medicale</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                  {CONDITIONS.map(c=>{
                    const on=prof.conditions.includes(c.id);
                    return (
                      <button key={c.id} onClick={()=>tog("conditions",c.id)} style={{
                        padding:"10px 13px", borderRadius:12, cursor:"pointer", textAlign:"left",
                        border:`1.5px solid ${on?D.clay:D.bgDeep}`,
                        background:on?D.clayLight:D.surface,
                        color:on?D.clay:D.inkSoft,
                        fontFamily:Ff.body, fontSize:12, transition:"all 0.15s", fontWeight:on?700:400,
                      }}>
                        {on?"✓ ":""}{c.label}
                      </button>
                    );
                  })}
                </div>
                <FieldLabel>Alte alergii / intoleranțe</FieldLabel>
                <input value={prof.allergies} onChange={e=>setProf(p=>({...p,allergies:e.target.value}))} placeholder="ex: arahide, fructe de mare, soia..." style={inp}/>
              </CardPad>
            </Card>

            <Btn onClick={()=>{setSaved(true);setTab("journal");}} full size="lg">
              Salvează Profilul {I.arrowR(15)}
            </Btn>
          </div>
        )}
      </main>

      {/* ━━━━━━━━━━ BOTTOM NAV ━━━━━━━━━━ */}
      <nav style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:400, background:"rgba(244,240,232,0.94)", backdropFilter:"blur(24px)", borderTop:`1px solid ${D.bgDeep}`, boxShadow:"0 -4px 28px rgba(24,16,10,0.08)" }}>
        <div style={{ maxWidth:640, margin:"0 auto", display:"flex", height:60, alignItems:"stretch" }}>
          {NAV.map(n=>{
            const active=tab===n.id;
            return (
              <button key={n.id} onClick={()=>setTab(n.id)} style={{
                flex:1, border:"none", background:"none", cursor:"pointer",
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4,
                color:active?D.sage:D.inkFaint, transition:"color 0.15s", position:"relative", padding:"8px 4px",
              }}>
                {active && (
                  <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:32, height:3, background:D.sage, borderRadius:"0 0 4px 4px" }}/>
                )}
                <div style={{ transition:"transform 0.2s ease", transform:active?"translateY(-1px) scale(1.1)":"none" }}>
                  {n.fn(active?22:20)}
                </div>
                <span style={{ fontFamily:Ff.num, fontSize:9.5, letterSpacing:"0.07em", fontWeight:active?700:400, textTransform:"uppercase" }}>{n.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
