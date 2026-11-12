import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

type ServiceType = 'VA - Veteran Affairs' | 'Bank - Valuable Assets'
type Status = 'Received at Vault' | 'Bank Secured' | 'Authenticated' | 'Insured' | 'Listed' | 'Payout Ready'
type Item = {
  id: string
  type: ServiceType
  title: string
  owner: string
  value: number
  image: string
  status: Status
  insuranceNo: string
  story: string
}

const STEPS: Status[] = ['Received at Vault', 'Bank Secured', 'Authenticated', 'Insured', 'Listed', 'Payout Ready']

const DEFAULT: Item[] = [
  {
    id: 'CSCMA-VA-001',
    type: 'VA - Veteran Affairs',
    title: 'VA Service Records & Medals - Secure File',
    owner: 'Sgt. M. Johnson',
    value: 0,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600',
    status: 'Bank Secured',
    insuranceNo: 'INS-VA-88421',
    story: 'Veteran Affairs sensitive documents stored in bank-grade vault. Access logged.'
  },
  {
    id: 'CSCMA-BANK-001',
    type: 'Bank - Valuable Assets',
    title: 'Gold Bar 50g + Chanel Flap - Vault Custody',
    owner: '@kaduna_vault',
    value: 3850,
    image: 'https://images.unsplash.com/photo-1610375461367-4d9b80f6bc0a?w=600',
    status: 'Insured',
    insuranceNo: 'INS-BK-10293',
    story: 'High-value assets held like bank deposit. Fully insured, CCTV, 24/7 tracking.'
  }
]

function useVault() {
  const [items, setItems] = useState<Item[]>(() => {
    const s = localStorage.getItem('cscma-vault-v3'); return s ? JSON.parse(s) : DEFAULT
  })
  useEffect(()=>{ localStorage.setItem('cscma-vault-v3', JSON.stringify(items)) },[items])
  return { items, setItems }
}

function Progress({ s }: { s: Status }) {
  const idx = STEPS.indexOf(s)
  return <div style={{display:'flex',gap:6,margin:'12px 0'}}>{STEPS.map((st,i)=><div key={st} style={{flex:1}}><div style={{height:8,background:i<=idx?'#FF6B00':'#eee',borderRadius:4}}/><div style={{fontSize:9,marginTop:4,fontWeight:i===idx?700:400,textAlign:'center'}}>{st.split(' ')[0]}</div></div>)}</div>
}

function Header(){
  return (
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderBottom:'1px solid #eee',position:'sticky',top:0,background:'#fff',zIndex:10}}>
      <Link to="/" style={{fontWeight:900,fontSize:20,textDecoration:'none',color:'#111'}}>CSCMA <span style={{color:'#FF6B00'}}>VAULT</span></Link>
      <div style={{display:'flex',gap:10}}>
        <Link to="/track" style={{border:'1px solid #FF6B00',color:'#FF6B00',padding:'6px 12px',borderRadius:6,textDecoration:'none',fontSize:13}}>Track</Link>
        <Link to="/dashboard" style={{background:'#FF6B00',color:'#fff',padding:'6px 12px',borderRadius:6,textDecoration:'none',fontSize:13}}>Client Login</Link>
      </div>
    </header>
  )
}

function Home({items}:{items:Item[]}){
  return (
    <div>
      <div style={{background:'linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)), url(https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200)',backgroundSize:'cover',color:'#fff',padding:'56px 16px'}}>
        <h1 style={{fontSize:34,lineHeight:1.1,maxWidth:380}}>Bank-Grade Vault.<br/>VA & Valuable Assets.</h1>
        <p style={{maxWidth:380,fontSize:14,opacity:0.9,marginTop:8}}>Like a bank, we keep sensitive and valuables. Veteran Affairs files and luxury assets — secured, insured, fully tracked by CSCMA-ID.</p>
        <div style={{display:'flex',gap:10,marginTop:16}}>
          <Link to="/dashboard" style={{background:'#FF6B00',color:'#fff',padding:'10px 16px',borderRadius:8,textDecoration:'none',fontWeight:700}}>Track My Vault</Link>
          <Link to="/track" style={{background:'#fff',color:'#FF6B00',padding:'10px 16px',borderRadius:8,textDecoration:'none',fontWeight:700}}>Get Quote</Link>
        </div>
      </div>
      <div style={{padding:16}}>
        <h3>Product & Service</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div style={{border:'1px solid #eee',borderRadius:12,padding:12}}><div style={{width:32,height:32,background:'#FFF0E6',borderRadius:8,display:'grid',placeItems:'center',color:'#FF6B00'}}>◍</div><div style={{fontWeight:700,marginTop:6}}>VA to Us</div><div style={{fontSize:11,color:'#666'}}>Veteran Affairs sensitive docs & records</div></div>
          <div style={{border:'1px solid #eee',borderRadius:12,padding:12}}><div style={{width:32,height:32,background:'#FFF0E6',borderRadius:8,display:'grid',placeItems:'center',color:'#FF6B00'}}>◍</div><div style={{fontWeight:700,marginTop:6}}>Bank to Us</div><div style={{fontSize:11,color:'#666'}}>Gold, luxury, deeds in bank vault</div></div>
          <div style={{border:'1px solid #eee',borderRadius:12,padding:12}}><div style={{width:32,height:32,background:'#FFF0E6',borderRadius:8,display:'grid',placeItems:'center',color:'#FF6B00'}}>◍</div><div style={{fontWeight:700,marginTop:6}}>Insurance</div><div style={{fontSize:11,color:'#666'}}>Up to $50k coverage per asset</div></div>
          <div style={{border:'1px solid #eee',borderRadius:12,padding:12}}><div style={{width:32,height:32,background:'#FFF0E6',borderRadius:8,display:'grid',placeItems:'center',color:'#FF6B00'}}>◍</div><div style={{fontWeight:700,marginTop:6}}>Live Tracking</div><div style={{fontSize:11,color:'#666'}}>CSCMA-ID tracking like SF Express</div></div>
        </div>
      </div>
      <div style={{padding:16,background:'#f7f7f7'}}>
        <h3>Recent Vault Intake</h3>
        <div style={{display:'flex',gap:12,overflowX:'auto'}}>
          {items.map(it=><Link to={`/item/${it.id}`} key={it.id} style={{minWidth:200,background:'#fff',borderRadius:12,overflow:'hidden',textDecoration:'none',color:'#111',border:'1px solid #eee'}}><img src={it.image} style={{width:'100%',height:120,objectFit:'cover'}}/><div style={{padding:8}}><div style={{fontSize:10,color:'#FF6B00'}}>{it.type}</div><div style={{fontWeight:600,fontSize:13}}>{it.title}</div><div style={{fontSize:11}}>{it.id} • {it.status}</div></div></Link>)}
        </div>
      </div>
    </div>
  )
}

function Track({items}:{items:Item[]}){
  const [q,setQ]=useState(''); const nav=useNavigate(); const f=items.find(i=>i.id.toLowerCase()===q.toLowerCase())
  return (
    <div style={{padding:16,maxWidth:600,margin:'0 auto'}}>
      <h2>Track Vault Item</h2>
      <div style={{display:'flex',gap:8}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="CSCMA-VA-001 or CSCMA-BANK-001" style={{flex:1,padding:12,borderRadius:8,border:'1px solid #ccc'}}/><button onClick={()=>f&&nav(`/item/${f.id}`)} style={{background:'#FF6B00',color:'#fff',border:0,borderRadius:8,padding:'0 16px'}}>Track</button></div>
      {f&&<div style={{marginTop:16,border:'1px solid #eee',borderRadius:12,padding:12}}><b>{f.id}</b><Progress s={f.status}/><Link to={`/dashboard?code=${f.id}`}>Open in Client Dashboard →</Link></div>}
    </div>
  )
}

function Dashboard({items}:{items:Item[]}){
  const [code,setCode]=useState(new URLSearchParams(window.location.search).get('code')||''); const item=items.find(i=>i.id.toLowerCase()===code.toLowerCase())
  return (
    <div style={{padding:16,maxWidth:600,margin:'0 auto'}}>
      <h2>Client Vault Dashboard</h2>
      <p style={{fontSize:12,color:'#666'}}>Enter CSCMA-ID like a bank tracking number. VA and Bank clients only.</p>
      <input value={code} onChange={e=>setCode(e.target.value)} placeholder="CSCMA-VA-001" style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #ccc'}}/>
      {!item && code && <div style={{marginTop:12,color:'red',fontSize:12}}>ID not found in vault.</div>}
      {item && (
        <div style={{marginTop:16,border:'1px solid #ddd',borderRadius:16,overflow:'hidden'}}>
          <img src={item.image} style={{width:'100%',height:200,objectFit:'cover'}}/>
          <div style={{padding:16}}>
            <div style={{fontSize:12,color:'#FF6B00'}}>{item.type} • {item.insuranceNo}</div>
            <h3>{item.title}</h3>
            <Progress s={item.status}/>
            <div style={{background:'#f9f9f9',padding:12,borderRadius:8,fontSize:12,marginTop:12}}>
              <b>Owner:</b> {item.owner}<br/><b>Insurance Certificate:</b> {item.insuranceNo} — Insured by CSCMA Vault<br/><b>Value:</b> ${item.value}<br/><b>Status:</b> {item.status}<br/><br/>{item.story}
            </div>
            <a href={`https://wa.me/2348012345678?text=Hi%20CSCMA%20Vault,%20tracking%20${item.id}%20-${item.title}`} target="_blank" style={{display:'block',marginTop:12,background:'#25D366',color:'#fff',padding:12,borderRadius:8,textAlign:'center',textDecoration:'none',fontWeight:700}}>WhatsApp About {item.id}</a>
          </div>
        </div>
      )}
    </div>
  )
}

function ItemPage({items}:{items:Item[]}){ 
  const {id}=useParams(); 
  const it=items.find(i=>i.id===id); 
  if(!it) return <div style={{padding:16}}>Not found</div>; 
  return <Dashboard items={items} />
}

function Admin({items,setItems}:{items:Item[],setItems:any}){
  const [form,setForm]=useState<Partial<Item>>({type:'Bank - Valuable Assets',title:'',owner:'',value:0,image:'',status:'Received at Vault',insuranceNo:'',story:''})
  const add=()=>{ 
    if(!form.title||!form.image) return alert('Add title + image URL');
    const prefix=form.type?.includes('VA')?'VA':'BANK'; 
    const id=`CSCMA-${prefix}-${String(items.length+1).padStart(3,'0')}`; 
    setItems([...items,{...form,id} as Item]);
    setForm({type:'Bank - Valuable Assets',title:'',owner:'',value:0,image:'',status:'Received at Vault',insuranceNo:'',story:''})
  }
  return (
    <div style={{padding:16,maxWidth:900,margin:'0 auto'}}>
      <h2>Admin — Vault Intake (Only You)</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,background:'#f7f7f7',padding:12,borderRadius:12}}>
        <select value={form.type} onChange={e=>setForm({...form,type:e.target.value as any})} style={{padding:10}}><option>VA - Veteran Affairs</option><option>Bank - Valuable Assets</option></select>
        <input placeholder="Insurance No INS-..." value={form.insuranceNo} onChange={e=>setForm({...form,insuranceNo:e.target.value})} style={{padding:10}}/>
        <input placeholder="Title (e.g., Gold, VA File)" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{padding:10}}/>
        <input placeholder="Owner / @handle" value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})} style={{padding:10}}/>
        <input placeholder="Image URL https://..." value={form.image} onChange={e=>setForm({...form,image:e.target.value})} style={{padding:10,gridColumn:'1/3'}}/>
        <input placeholder="Value $" type="number" value={form.value as any} onChange={e=>setForm({...form,value:Number(e.target.value)})} style={{padding:10}}/>
        <textarea placeholder="Sensitive note / story (bank log)" value={form.story} onChange={e=>setForm({...form,story:e.target.value})} style={{padding:10,gridColumn:'1/3'}}/>
        <button onClick={add} style={{gridColumn:'1/3',background:'#111',color:'#fff',padding:12,borderRadius:8}}>Add to Vault</button>
      </div>
      <div style={{marginTop:16}}>{items.map(i=><div key={i.id} style={{display:'flex',gap:8,alignItems:'center',borderBottom:'1px solid #eee',padding:'8px 0'}}><b>{i.id}</b> {i.type} <select value={i.status} onChange={e=>setItems(items.map(x=>x.id===i.id?{...x,status:e.target.value as Status}:x))}>{STEPS.map(s=><option key={s}>{s}</option>)}</select><button onClick={()=>setItems(items.filter(x=>x.id!==i.id))} style={{color:'red',border:0,background:'none'}}>Delete</button></div>)}</div>
    </div>
  )
}

export default function App(){
  const {items,setItems}=useVault()
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home items={items}/>}/>
        <Route path="/track" element={<Track items={items}/>}/>
        <Route path="/dashboard" element={<Dashboard items={items}/>}/>
        <Route path="/item/:id" element={<ItemPage items={items}/>}/>
        <Route path="/admin" element={<Admin items={items} setItems={setItems}/>}/>
      </Routes>
      <footer style={{padding:16,background:'#111',color:'#fff',fontSize:11,marginTop:24,textAlign:'center'}}>CSCMA VAULT • Kaduna, NG • Bank-Grade Consignment • © 2026</footer>
      
      <a href="https://wa.me/2348012345678?text=Hi%20CSCMA%20Vault,%20I%20want%20to%20track%20my%20item" target="_blank" rel="noreferrer"
         style={{
           position:'fixed',bottom:20,right:20,background:'#25D366',color:'#fff',
           width:56,height:56,borderRadius:'50%',display:'grid',placeItems:'center',
           fontSize:28,textDecoration:'none',boxShadow:'0 4px 12px rgba(0,0,0,0.3)',zIndex:9999
         }}>
        ✆
      </a>
      
      <Link to="/track" style={{
        position:'fixed',top:'45%',right:0,background:'#FF6B00',color:'#fff',
        padding:'10px 8px',borderRadius:'8px 0 0 8px',writingMode:'vertical-rl',
        textDecoration:'none',fontWeight:700,fontSize:12,zIndex:9998
      }}>
        TRACK VAULT
      </Link>
    </BrowserRouter>
  )
}