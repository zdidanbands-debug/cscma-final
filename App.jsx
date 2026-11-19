import { useState, useEffect } from "react";

export default function App() {
  const [view, setView] = useState("home"); // home, signup, login, portal, owner
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("cscma_users");
    return saved ? JSON.parse(saved) : [
      { name: "Tara Aquilla Ashley", email: "tara@email.com", password: "tara123", balance: 2450, items: [
        { name: "Designer Collection", status: "IN VAULT" },
        { name: "Premium Consignment Lot", status: "DISPATCHED" },
        { name: "Vault Lot - California", status: "SOLD - PAID" },
      ]}
    ];
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [newItem, setNewItem] = useState("");
  const [selectedClient, setSelectedClient] = useState(0);

  useEffect(() => { localStorage.setItem("cscma_users", JSON.stringify(users)); }, [users]);

  const signup = (e) => {
    e.preventDefault();
    if (users.find(u => u.email === form.email)) { alert("Email already exists, please login"); return; }
    const newUser = { ...form, balance: 0, items: [] };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setView("portal");
  };

  const login = (e) => {
    e.preventDefault();
    // Owner login
    if (form.email === "owner@cscma.com" && form.password === "admin123") { setView("owner"); return; }
    const found = users.find(u => u.email === form.email && u.password === form.password);
    if (found) { setCurrentUser(found); setView("portal"); }
    else alert("Wrong email or password");
  };

  const addItemToClient = () => {
    if (!newItem) return;
    const updated = [...users];
    updated[selectedClient].items.push({ name: newItem, status: "IN VAULT" });
    setUsers(updated);
    setNewItem("");
  };

  const updateStatus = (clientIdx, itemIdx, newStatus) => {
    const updated = [...users];
    updated[clientIdx].items[itemIdx].status = newStatus;
    setUsers(updated);
  };

  const updateBalance = (clientIdx, newBal) => {
    const updated = [...users];
    updated[clientIdx].balance = Number(newBal);
    setUsers(updated);
  };

  // ---------- HOME ----------
  if (view === "home") return (
    <div style={{ fontFamily: "Arial", background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", borderBottom: "3px solid #ff4d00", alignItems: "center" }}>
        <h1 style={{ margin: 0, color: "#ff4d00", fontSize: 22 }}>CSCMA</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setView("login")} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer" }}>Login</button>
          <button onClick={() => setView("signup")} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#ff4d00", color: "white", fontWeight: "bold", cursor: "pointer" }}>Create Portal</button>
        </div>
      </header>
      <div style={{ textAlign: "center", padding: "50px 20px" }}>
        <h2 style={{ fontSize: 38, margin: 0 }}>CALIFORNIA STATE</h2>
        <h2 style={{ fontSize: 38, margin: 0, color: "#ff4d00" }}>CONSIGNMENT MANAGEMENT AGENCY</h2>
        <p style={{ opacity: 0.8, maxWidth: 500, margin: "15px auto" }}>Everyone gets their own secure portal. Consign your items, track dispatch, and get paid. Managed by CSCMA.</p>
        <button onClick={() => setView("signup")} style={{ padding: "15px 30px", background: "#ff4d00", color: "white", border: "none", borderRadius: 12, fontSize: 18, fontWeight: "bold", cursor: "pointer" }}>Create Your Portal →</button>
        <p style={{ marginTop: 10, opacity: 0.6 }}>Already have a portal? <span onClick={() => setView("login")} style={{ color: "#ff4d00", cursor: "pointer", fontWeight: "bold" }}>Login</span></p>
      </div>
      <div style={{ display: "flex", gap: 15, justifyContent: "center", flexWrap: "wrap", padding: 20 }}>
        {[{ t: "1. Create Portal", d: "Sign up in 30 seconds" }, { t: "2. Add Items", d: "We store & manage your items" }, { t: "3. Get Paid", d: "Track dispatch & balance in your portal" }].map((s, i) => (
          <div key={i} style={{ background: "#1a1a1a", padding: 20, borderRadius: 14, width: 220, textAlign: "center" }}><h3>{s.t}</h3><p style={{ opacity: 0.7 }}>{s.d}</p></div>
        ))}
      </div>
      <footer style={{ textAlign: "center", padding: 20, opacity: 0.5 }}>© 2026 CSCMA • California State Consignment Management Agency • Owner Control Panel Included</footer>
    </div>
  );

  // ---------- SIGNUP / LOGIN ----------
  if (view === "signup" || view === "login") return (
    <div style={{ fontFamily: "Arial", background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <header style={{ padding: "15px 20px" }}><h1 style={{ margin: 0, color: "#ff4d00", cursor: "pointer" }} onClick={() => setView("home")}>CSCMA DISPATCH UNIT</h1></header>
      <div style={{ maxWidth: 450, margin: "30px auto", background: "#141414", padding: 30, borderRadius: 16, width: "90%" }}>
        <h2>{view === "signup" ? "Create Your Portal" : "Login To Your Portal"}</h2>
        <p style={{ opacity: 0.7 }}>{view === "signup" ? "Everyone gets their own secure CSCMA portal." : "Client or Owner login."}</p>
        <form onSubmit={view === "signup" ? signup : login}>
          {view === "signup" && <input placeholder="Full Name - e.g. Tara Aquilla Ashley" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ width: "100%", padding: 14, margin: "8px 0", borderRadius: 10, border: "none", boxSizing: "border-box" }} />}
          <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={{ width: "100%", padding: 14, margin: "8px 0", borderRadius: 10, border: "none", boxSizing: "border-box" }} />
          <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ width: "100%", padding: 14, margin: "8px 0", borderRadius: 10, border: "none", boxSizing: "border-box" }} />
          <button style={{ width: "100%", padding: 14, background: "#ff4d00", color: "white", border: "none", borderRadius: 10, fontWeight: "bold", fontSize: 17, cursor: "pointer" }}>{view === "signup" ? "Create Portal →" : "Login →"}</button>
        </form>
        {view === "signup" ? <p style={{ textAlign: "center" }}>Have portal? <span onClick={() => setView("login")} style={{ color: "#ff4d00", cursor: "pointer" }}>Login</span></p> : <p style={{ textAlign: "center" }}>No portal? <span onClick={() => setView("signup")} style={{ color: "#ff4d00", cursor: "pointer" }}>Create one</span></p>}
        <p style={{ fontSize: 12, opacity: 0.5, textAlign: "center" }}>Owner demo: owner@cscma.com / admin123</p>
      </div>
    </div>
  );

  // ---------- CLIENT PORTAL ----------
  if (view === "portal" && currentUser) return (
    <div style={{ fontFamily: "Arial", background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", borderBottom: "3px solid #ff4d00" }}>
        <h1 style={{ margin: 0, color: "#ff4d00", fontSize: 20 }}>CSCMA DISPATCH UNIT</h1>
        <button onClick={() => { setView("home"); setCurrentUser(null); }} style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>Log Out</button>
      </header>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h2>Welcome, {currentUser.name}</h2>
        <p style={{ opacity: 0.7 }}>Your Private CSCMA Portal • California</p>
        <div style={{ background: "#1a1a1a", padding: 20, borderRadius: 14, margin: "15px 0" }}><p>Your Balance</p><h3 style={{ fontSize: 32, color: "#00e676", margin: 0 }}>${currentUser.balance.toLocaleString()}</h3></div>
        <h3>Your Items ({currentUser.items.length})</h3>
        {currentUser.items.length === 0 ? <p style={{ opacity: 0.6 }}>No items yet. Owner will add your items here.</p> : currentUser.items.map((it, i) => (
          <div key={i} style={{ background: "#1a1a1a", padding: 15, borderRadius: 12, margin: "10px 0", display: "flex", justifyContent: "space-between" }}><strong>{it.name}</strong><span style={{ background: "#ffcc00", color: "black", padding: "5px 10px", borderRadius: 20, fontWeight: "bold", fontSize: 12 }}>{it.status}</span></div>
        ))}
      </div>
    </div>
  );

  // ---------- OWNER DASHBOARD ----------
  if (view === "owner") return (
    <div style={{ fontFamily: "Arial", background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", borderBottom: "3px solid #ff4d00" }}>
        <h1 style={{ margin: 0, color: "#ff4d00", fontSize: 20 }}>CSCMA — OWNER CONTROL</h1>
        <button onClick={() => setView("home")} style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>Log Out</button>
      </header>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
        <h2>Owner Dashboard</h2>
        <p>You control everything. Total Clients: {users.length}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "10px 0" }}>
          {users.map((u, i) => <button key={i} onClick={() => setSelectedClient(i)} style={{ padding: "10px 16px", borderRadius: 20, border: "none", background: selectedClient === i ? "#ff4d00" : "#222", color: "white", fontWeight: "bold", cursor: "pointer" }}>{u.name}</button>)}
        </div>
        {users[selectedClient] && (
          <div style={{ background: "#141414", padding: 20, borderRadius: 14 }}>
            <h3>{users[selectedClient].name} — {users[selectedClient].email}</h3>
            <label>Balance: $ </label>
            <input type="number" value={users[selectedClient].balance} onChange={e => updateBalance(selectedClient, e.target.value)} style={{ padding: 10, borderRadius: 8, border: "none", width: 120, margin: "5px 0" }} />
            <h4>Items:</h4>
            {users[selectedClient].items.map((it, idx) => (
              <div key={idx} style={{ display: "flex", gap: 10, alignItems: "center", margin: "8px 0", flexWrap: "wrap" }}>
                <span style={{ flex: 1 }}>{it.name}</span>
                <select value={it.status} onChange={e => updateStatus(selectedClient, idx, e.target.value)} style={{ padding: 8, borderRadius: 8, border: "none" }}>
                  <option>IN VAULT</option><option>DISPATCHED</option><option>SOLD - PAID</option><option>PENDING</option>
                </select>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
              <input placeholder="Add new item for this client..." value={newItem} onChange={e => setNewItem(e.target.value)} style={{ flex: 1, padding: 12, borderRadius: 10, border: "none" }} />
              <button onClick={addItemToClient} style={{ padding: "12px 18px", background: "#00e676", border: "none", borderRadius: 10, fontWeight: "bold", cursor: "pointer" }}>+ Add Item</button>
            </div>
            <button onClick={() => { const u = [...users]; u.splice(selectedClient, 1); setUsers(u); setSelectedClient(0); }} style={{ marginTop: 15, padding: "10px 15px", background: "#ff3b30", color: "white", border: "none", borderRadius: 10, cursor: "pointer" }}>Delete This Client</button>
          </div>
        )}
      </div>
    </div>
  );
}
