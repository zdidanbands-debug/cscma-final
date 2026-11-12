import { useState, useEffect } from 'react';

type User = { email: string; password: string };
type Item = { id: string; name: string; desc: string };

export default function App() {
  const [view, setView] = useState<'client' | 'admin'>('client');
  const path = window.location.pathname;
  
  useEffect(() => {
    if (path.startsWith('/admin')) setView('admin');
    if (path.startsWith('/client')) setView('client');
  }, [path]);

  // --- CLIENT STATE ---
  const [step, setStep] = useState<'signup' | 'otp' | 'vault'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [realOtp, setRealOtp] = useState('123456');

  // --- ADMIN STATE ---
  const [videos, setVideos] = useState<string[]>(() => {
    const saved = localStorage.getItem('cscma_videos');
    return saved ? JSON.parse(saved) : [];
  });
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('cscma_items');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Cash Consignment', desc: 'Private amount secured - $629,000 USD - Documentation on file' },
      { id: '2', name: 'Engagement Ring', desc: '1x Ring - Personal property' },
      { id: '3', name: 'Letters from SSgt Phillip Dow Jones', desc: 'Personal correspondence - Owner: SSgt Phillip Dow Jones' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('cscma_videos', JSON.stringify(videos));
  }, [videos]);
  useEffect(() => {
    localStorage.setItem('cscma_items', JSON.stringify(items));
  }, [items]);

  const handleSignup = (e: any) => {
    e.preventDefault();
    if (!email || !password) return alert('Enter email and password');
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setRealOtp(otp);
    alert(`Demo OTP for Tara: ${otp} - In production send via email/SMS`);
    setStep('otp');
  };

  const handleOtp = (e: any) => {
    e.preventDefault();
    if (otpInput === realOtp) {
      setStep('vault');
    } else {
      alert('Invalid OTP');
    }
  };

  const handleVideoUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideos([...videos, url]);
  };

  if (view === 'admin') {
    return (
      <div style={{ fontFamily: 'sans-serif', padding: 20, maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ color: '#ff6a00' }}>CSCMA DISPATCH UNIT - Admin Upload</h1>
        <p>Private developer area. Uploads appear in client portal.</p>
        
        <div style={{ border: '1px solid #ddd', padding: 15, borderRadius: 8, marginBottom: 20 }}>
          <h3>Upload Video</h3>
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
          <p style={{ fontSize: 12, color: '#666' }}>Videos are stored locally for demo. For production, upload to Supabase Storage / Cloudinary.</p>
        </div>

        <div style={{ border: '1px solid #ddd', padding: 15, borderRadius: 8 }}>
          <h3>Inventory List (Editable)</h3>
          {items.map((it, idx) => (
            <div key={it.id} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <input value={it.name} onChange={e => {
                const newItems = [...items];
                newItems[idx].name = e.target.value;
                setItems(newItems);
              }} style={{ flex: 1 }} />
              <input value={it.desc} onChange={e => {
                const newItems = [...items];
                newItems[idx].desc = e.target.value;
                setItems(newItems);
              }} style={{ flex: 2 }} />
            </div>
          ))}
          <button onClick={() => setItems([...items, { id: Date.now().toString(), name: '', desc: '' }])}>+ Add Item</button>
        </div>
        <br />
        <a href="/client">Go to Client Portal →</a>
      </div>
    );
  }

  // CLIENT VIEW
  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0f0f0f', minHeight: '100vh', color: 'white', padding: 20 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: 15 }}>
          <h2 style={{ color: '#ff6a00', margin: 0 }}>CSCMA DISPATCH UNIT</h2>
          <span style={{ fontSize: 12, background: '#222', padding: '5px 10px', borderRadius: 20 }}>Private Vault Portal</span>
        </header>

        {step === 'signup' && (
          <form onSubmit={handleSignup} style={{ maxWidth: 400, margin: '60px auto', background: '#1a1a1a', padding: 25, borderRadius: 12 }}>
            <h3>Create Client Account</h3>
            <p style={{ fontSize: 13, color: '#aaa' }}>For Tara Aquilla Ashley - Secure access to private consignment</p>
            <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 12, marginBottom: 10, borderRadius: 6, border: 'none' }} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 12, marginBottom: 15, borderRadius: 6, border: 'none' }} />
            <button type="submit" style={{ width: '100%', padding: 12, background: '#ff6a00', color: 'white', border: 'none', borderRadius: 6, fontWeight: 'bold' }}>Sign Up & Get OTP</button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtp} style={{ maxWidth: 400, margin: '60px auto', background: '#1a1a1a', padding: 25, borderRadius: 12 }}>
            <h3>Enter One-Time Password</h3>
            <p style={{ fontSize: 13, color: '#aaa' }}>Sent to {email}</p>
            <input placeholder="6-digit OTP" value={otpInput} onChange={e => setOtpInput(e.target.value)} style={{ width: '100%', padding: 12, marginBottom: 15, borderRadius: 6, border: 'none', letterSpacing: 5, textAlign: 'center' as any }} />
            <button type="submit" style={{ width: '100%', padding: 12, background: '#ff6a00', color: 'white', border: 'none', borderRadius: 6, fontWeight: 'bold' }}>Verify & Access Vault</button>
          </form>
        )}

        {step === 'vault' && (
          <div style={{ marginTop: 30 }}>
            <h3 style={{ color: '#ff6a00' }}>Welcome, Tara - Your Private Consignment Vault</h3>
            <p style={{ color: '#aaa', fontSize: 14 }}>Owner: SSgt Phillip Dow Jones | Beneficiary: Tara Aquilla Ashley</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
              <div style={{ background: '#1a1a1a', padding: 15, borderRadius: 10 }}>
                <h4>Vault Status</h4>
                <p style={{ background: '#0a2e0a', color: '#7CFC00', padding: '6px 10px', borderRadius: 20, display: 'inline-block', fontSize: 12 }}>SECURED IN VAULT</p>
                <p style={{ fontSize: 13, color: '#ccc', marginTop: 10 }}>Items are secured at CSCMA facility. Not in courier transit. Handover by appointment only with ID verification.</p>
              </div>
              <div style={{ background: '#1a1a1a', padding: 15, borderRadius: 10 }}>
                <h4>Security Notice</h4>
                <p style={{ fontSize: 12, color: '#aaa' }}>This is a private vault receipt. Large cash consignments must comply with banking laws. This portal does not represent USPS/UPS international shipment.</p>
              </div>
            </div>

            <div style={{ background: '#1a1a1a', padding: 15, borderRadius: 10, marginTop: 20 }}>
              <h4>Video Evidence</h4>
              {videos.length === 0 ? <p style={{ color: '#777' }}>No videos uploaded yet. Check back soon or contact custodian.</p> : videos.map((v, i) => (
                <video key={i} src={v} controls style={{ width: '100%', borderRadius: 8, marginBottom: 10 }} />
              ))}
            </div>

            <div style={{ background: '#1a1a1a', padding: 15, borderRadius: 10, marginTop: 20 }}>
              <h4>Inventory List</h4>
              {items.map(it => (
                <div key={it.id} style={{ borderBottom: '1px solid #333', padding: '10px 0' }}>
                  <strong>{it.name}</strong><br />
                  <span style={{ fontSize: 13, color: '#aaa' }}>{it.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
