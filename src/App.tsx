import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';

const TRACK_DATA: any = {
  "CSCMA-VA-001": {
    order: "CSCMA-VA-001",
    expected: "2026-11-25",
    status: "In Transit - Customs Clearance",
    shipped: "2026-11-08",
    quantity: 1,
    weight: "4.5 kg",
    service: "Air Freight - Bank-Grade Vault",
    desc: "1x bulky rectangular package wrapped in dark, textured padding and tightly sealed in shiny, clear plastic. Afixed flat on top is a white international shipping label featuring a barcode for tracking, a bold blue 'PAID' stamp in the center, a small picture of cargo plane and a reddish official stamp at the bottom.",
    receiverName: "Alicia Pepito Tomarang",
    receiverEmail: "aliciatomarang77@gmail.com",
    receiverAddr: "Block 12 lot 8 ss brigade village Western Bicutan Taguig city Philippines",
    senderName: "United Parcel Service, Inc. - UPS",
    senderLocation: "301 E. Ocean Blvd, Suite 1400, Long Beach, CA 90802, California, United States",
    senderAddr: "3250 Van Ness Ave, San Francisco, CA 94109, California, USA",
    history: [
      {date:"2026-11-08", location:"Long Beach, CA - Origin Warehouse", remark:"Shipment Confirmed", stat:"Confirmed"},
      {date:"2026-11-09", location:"Los Angeles Intl Airport", remark:"Departed Facility", stat:"In Transit"},
      {date:"2026-11-11", location:"Customs, Philippines", remark:"Customs Check - Awaiting Clearance", stat:"Process"},
    ]
  },
  "NKVOUHYXBLCM": {
    order: "NKVOUHYXBLCM",
    expected: "2026-06-03",
    status: "process",
    shipped: "2026-05-30",
    quantity: 1,
    weight: "4.5",
    service: "Air Freight",
    desc: "It is a bulky rectangular package wrapped in dark, textured padding and tightly sealed in shiny, clear plastic. Afixed flat on top is a white international shipping label featuring a barcode for tracking, a bold blue 'PAID' stamp in the center, a small picture of cargo plane and a reddish official stamp at the bottom.",
    receiverName: "Alicia Pepito Tomarang",
    receiverEmail: "aliciatomarang77@gmail.com",
    receiverAddr: "Block 12 lot 8 ss brigade village Western Bicutan Taguig city philippine",
    senderName: "United Parcel Service, Inc. - UPS",
    senderLocation: "301 E. Ocean Blvd, Suite 1400, Long Beach, CA 90802, California, United States",
    senderAddr: "Center 3250 Van Ness Ave, San Francisco, CA 94109, California, USA",
    history: [
      {date:"2026-05-30", location:"Origin", remark:"Confirmed", stat:"Confirmed"},
    ]
  }
};

function Home() {
  const [code, setCode] = useState('');
  const nav = useNavigate();
  return (
    <div style={{minHeight:'100vh', background:'#f5f5f5'}}>
      <div style={{background:'white', padding:'40px 20px', textAlign:'center'}}>
        <h1 style={{fontSize:'42px', fontWeight:900, letterSpacing:'1px'}}>CSCMA VAULT</h1>
        <p>Ship, Manage, Track & Deliver - Bank-Grade</p>
        <div style={{marginTop:'30px', maxWidth:'500px', marginInline:'auto'}}>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="ENTER YOUR TRACKING CODE" style={{width:'100%', padding:'14px', border:'1px solid #ccc'}} />
          <button onClick={()=>nav(`/track?code=${code}`)} style={{marginTop:'10px', background:'#1a237e', color:'white', padding:'12px 30px', width:'100%', fontWeight:700}}>TRACK</button>
        </div>
      </div>
    </div>
  )
}

function TrackPage() {
  const [params] = useSearchParams();
  const urlCode = params.get('code') || '';
  const [code, setCode] = useState(urlCode);
  const data = TRACK_DATA[code.toUpperCase()] || null;
  const nav = useNavigate();

  return (
    <div style={{background:'#fff', minHeight:'100vh'}}>
      <div style={{background:'#fff', padding:'10px 20px', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between'}}>
        <span style={{fontWeight:800}}>CSCMA VAULT</span>
        <span style={{fontSize:'12px'}}>Select Language ▼</span>
      </div>

      <div style={{textAlign:'center', padding:'30px 15px', background:'#2c2c54'}}>
        <h2 style={{color:'white', letterSpacing:'1px'}}>TRACK RESULT PAGE</h2>
        <p style={{color:'#aaa', fontSize:'13px'}}>Home / Track</p>
      </div>

      {!data ? (
        <div style={{padding:'20px', maxWidth:'600px', margin:'auto'}}>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="NKVOUHYXBLCM" style={{width:'70%', padding:'12px', border:'1px solid #ddd'}} />
          <button onClick={()=>nav(`/track?code=${code}`)} style={{padding:'12px 20px', background:'#1a237e', color:'#fff', marginLeft:'5px'}}>TRACK</button>
          {urlCode && <p style={{marginTop:'20px', color:'red'}}>No record for {urlCode}. Try CSCMA-VA-001 or NKVOUHYXBLCM</p>}
        </div>
      ) : (
        <div style={{maxWidth:'900px', margin:'auto', padding:'15px'}}>
          <div style={{background:'#3f3a8a', color:'white', padding:'15px', textAlign:'center', fontWeight:700}}>
            ORDER TRACKING: {data.order}<br/>
            <small>Expected delivery date : {data.expected}</small><br/>
            <small>Status : {data.status} | Date Shipped : {data.shipped}</small>
          </div>

          <div style={{marginTop:'15px'}}>
            <div style={{background:'#3f3a8a', color:'white', padding:'8px 12px', fontWeight:600}}>Shipment Details</div>
            <div style={{border:'1px solid #ddd', padding:'12px', fontSize:'14px', lineHeight:'1.7'}}>
              <b>Quantity :</b> {data.quantity}<br/>
              <b>Weight :</b> {data.weight}<br/>
              <b>Service Type :</b> {data.service}<br/>
              <b>Description :</b> {data.desc}
            </div>
          </div>

          <div style={{marginTop:'15px'}}>
            <div style={{background:'#3f3a8a', color:'white', padding:'8px 12px', fontWeight:600}}>Destination</div>
            <div style={{border:'1px solid #ddd', padding:'12px', fontSize:'14px', lineHeight:'1.7'}}>
              <b>Receiver Name :</b> {data.receiverName}<br/>
              <b>Receiver Email :</b> {data.receiverEmail}<br/>
              <b>Receiver Address :</b> {data.receiverAddr}<br/>
              <b>Expected Date of Delivery :</b> {data.expected}
            </div>
          </div>

          <div style={{marginTop:'15px'}}>
            <div style={{background:'#3f3a8a', color:'white', padding:'8px 12px', fontWeight:600}}>Origin</div>
            <div style={{border:'1px solid #ddd', padding:'12px', fontSize:'14px', lineHeight:'1.7'}}>
              <b>Sender Name :</b> {data.senderName}<br/>
              <b>Location :</b> {data.senderLocation}<br/>
              <b>Sender Address :</b> {data.senderAddr}<br/>
              <b>Shipment Date :</b> {data.shipped}
            </div>
          </div>

          <div style={{marginTop:'15px'}}>
            <div style={{background:'#3f3a8a', color:'white', padding:'8px 12px', fontWeight:600}}>History summary</div>
            <div style={{border:'1px solid #ddd', padding:'0', fontSize:'13px'}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 2fr 1fr 1fr', background:'#eee', padding:'8px', fontWeight:700}}>
                <span>Date</span><span>Location</span><span>Remark</span><span>Stat</span>
              </div>
              {data.history.map((h:any,i:number)=>(
                <div key={i} style={{display:'grid', gridTemplateColumns:'1fr 2fr 1fr 1fr', padding:'8px', borderTop:'1px solid #eee'}}>
                  <span>{h.date}</span><span>{h.location}</span><span>{h.remark}</span><span>{h.stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{marginTop:'20px'}}>
            <button style={{background:'#5cb3d6', color:'white', border:'none', padding:'8px 20px', borderRadius:'5px'}}>Package Image</button>
            <div style={{marginTop:'10px', border:'1px solid #ccc', height:'450px', position:'relative', overflow:'hidden'}}>
              <iframe
                title="map"
                width="100%"
                height="100%"
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(data.receiverAddr)}&z=18&output=embed`}
              ></iframe>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.receiverAddr)}`} target="_blank" rel="noreferrer" style={{position:'absolute', top:'10px', left:'10px', background:'white', padding:'5px 10px', fontSize:'12px', boxShadow:'0 1px 4px rgba(0,0,0,0.3)', textDecoration:'none'}}>Open in Maps ↗</a>
            </div>
            <p style={{fontSize:'12px', color:'#666', textAlign:'center', marginTop:'5px'}}>Use two fingers to move the map</p>
          </div>

          <div style={{marginTop:'30px', background:'#222', color:'#aaa', padding:'20px', fontSize:'12px', textAlign:'center'}}>
            Copyright © cscma-final.vercel.app | All rights reserved
          </div>
        </div>
      )}
    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/track" element={<TrackPage/>} />
        <Route path="*" element={<TrackPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
