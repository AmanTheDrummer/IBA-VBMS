import { useState, useEffect } from 'react'
import { api, setToken, clearToken, setStoredUser, getStoredUser, clearStoredUser, getToken } from './api'
import './App.css'

// ── tiny helpers ──────────────────────────────────────────────
function Badge({ status }) {
  const map = {
    pending:  { bg: '#fef3c7', color: '#92400e', label: 'Pending' },
    approved: { bg: '#d1fae5', color: '#065f46', label: 'Approved' },
    rejected: { bg: '#fee2e2', color: '#991b1b', label: 'Rejected' },
    cancelled:{ bg: '#f3f4f6', color: '#6b7280', label: 'Cancelled' },
  }
  const s = map[status] || map.pending
  return (
    <span style={{ background: s.bg, color: s.color, padding: '2px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: '.04em' }}>
      {s.label}
    </span>
  )
}

// ── LOGIN PAGE ────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [erp, setErp]         = useState('')
  const [password, setPass]   = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.auth.login(erp, password)
      setToken(data.access_token)
      setStoredUser(data.user)
      onLogin(data.user)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-mark">IBA</div>
          <div className="login-subtitle">Room Booking System</div>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label>ERP ID</label>
            <input value={erp} onChange={e => setErp(e.target.value)} placeholder="e.g. 12345" required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPass(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button className="btn-primary" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── BOOKINGS TAB ──────────────────────────────────────────────
function BookingsTab({ user }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]  = useState(true)
  const [error, setError]      = useState('')
  const isAdmin = user?.role === 'admin' || user?.role === 'property_officer'

  useEffect(() => { fetchBookings() }, [])

  async function fetchBookings() {
    setLoading(true)
    try {
      const data = await api.bookings.list()
      setBookings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleAction(id, action) {
    try {
      await api.bookings[action](id)
      fetchBookings()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div className="loading">Loading bookings…</div>
  if (error)   return <div className="error-msg">{error}</div>
  if (!bookings.length) return <div className="empty">No bookings found.</div>

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Room</th><th>Date</th><th>Slots</th><th>Purpose</th><th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.room?.name || b.room_id}</td>
              <td>{b.date}</td>
              <td>{b.slot_ids?.join(', ')}</td>
              <td>{b.purpose}</td>
              <td><Badge status={b.status} /></td>
              {isAdmin && (
                <td className="action-cell">
                  {b.status === 'pending' && (
                    <>
                      <button className="btn-approve" onClick={() => handleAction(b.id, 'approve')}>✓</button>
                      <button className="btn-reject"  onClick={() => handleAction(b.id, 'reject')}>✗</button>
                    </>
                  )}
                  {b.status === 'approved' && (
                    <button className="btn-cancel" onClick={() => handleAction(b.id, 'cancel')}>Cancel</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── NEW BOOKING FORM ──────────────────────────────────────────
function NewBookingTab() {
  const [buildings, setBuildings] = useState([])
  const [rooms, setRooms]         = useState([])
  const [slots, setSlots]         = useState([])
  const [form, setForm]           = useState({ building_id: '', room_id: '', date: '', slot_ids: [], purpose: '' })
  const [success, setSuccess]     = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  useEffect(() => {
    api.buildings.list().then(setBuildings).catch(() => {})
    api.timeSlots.list().then(setSlots).catch(() => {})
  }, [])

  useEffect(() => {
    if (form.building_id) api.rooms.list(form.building_id).then(setRooms).catch(() => {})
    else setRooms([])
  }, [form.building_id])

  function toggleSlot(id) {
    setForm(f => ({
      ...f,
      slot_ids: f.slot_ids.includes(id) ? f.slot_ids.filter(s => s !== id) : [...f.slot_ids, id]
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)
    try {
      await api.bookings.create({ room_id: form.room_id, date: form.date, slot_ids: form.slot_ids, purpose: form.purpose })
      setSuccess('Booking submitted! Awaiting approval.')
      setForm({ building_id: '', room_id: '', date: '', slot_ids: [], purpose: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3 className="form-title">New Room Booking</h3>

      <div className="form-grid">
        <div className="field">
          <label>Building</label>
          <select value={form.building_id} onChange={e => setForm(f => ({...f, building_id: e.target.value, room_id: ''}))} required>
            <option value="">Select building…</option>
            {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div className="field">
          <label>Room</label>
          <select value={form.room_id} onChange={e => setForm(f => ({...f, room_id: e.target.value}))} required disabled={!form.building_id}>
            <option value="">Select room…</option>
            {rooms.map(r => <option key={r.id} value={r.id}>{r.name} (cap: {r.capacity})</option>)}
          </select>
        </div>

        <div className="field">
          <label>Date</label>
          <input type="date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} required min={new Date().toISOString().split('T')[0]} />
        </div>

        <div className="field">
          <label>Purpose</label>
          <input value={form.purpose} onChange={e => setForm(f => ({...f, purpose: e.target.value}))} placeholder="e.g. Study group, Meeting…" required />
        </div>
      </div>

      {slots.length > 0 && (
        <div className="field">
          <label>Time Slots</label>
          <div className="slots-grid">
            {slots.map(s => (
              <button type="button" key={s.id}
                className={`slot-btn ${form.slot_ids.includes(s.id) ? 'selected' : ''}`}
                onClick={() => toggleSlot(s.id)}>
                {s.label || `Slot ${s.id}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {error   && <div className="login-error">{error}</div>}
      {success && <div className="success-msg">{success}</div>}

      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? 'Submitting…' : 'Submit Booking'}
      </button>
    </form>
  )
}

// ── ROOMS TAB ─────────────────────────────────────────────────
function RoomsTab() {
  const [rooms, setRooms]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    api.rooms.list().then(setRooms).catch(err => setError(err.message)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">Loading rooms…</div>
  if (error)   return <div className="error-msg">{error}</div>

  return (
    <div className="rooms-grid">
      {rooms.map(r => (
        <div className="room-card" key={r.id}>
          <div className="room-name">{r.name}</div>
          <div className="room-meta">
            <span>🏢 {r.building?.name || 'Building'}</span>
            <span>👥 {r.capacity} seats</span>
          </div>
          {r.description && <div className="room-desc">{r.description}</div>}
          <div className={`room-status ${r.is_active ? 'active' : 'inactive'}`}>
            {r.is_active ? 'Available' : 'Unavailable'}
          </div>
        </div>
      ))}
      {!rooms.length && <div className="empty">No rooms found.</div>}
    </div>
  )
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function App() {
  const [user, setUser]   = useState(getStoredUser)
  const [tab, setTab]     = useState('bookings')

  function handleLogin(u) { setUser(u) }
  function handleLogout() { clearToken(); clearStoredUser(); setUser(null) }

  if (!user || !getToken()) return <LoginPage onLogin={handleLogin} />

  const isAdmin = user.role === 'admin' || user.role === 'property_officer'

  return (
    <div className="app">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-left">
          <span className="header-logo">IBA</span>
          <span className="header-title">Room Booking</span>
        </div>
        <div className="header-right">
          <span className="header-user">👤 {user.name || user.erp}</span>
          <span className="header-role">{user.role}</span>
          <button className="btn-logout" onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      {/* TABS */}
      <nav className="tabs">
        <button className={tab === 'bookings' ? 'tab active' : 'tab'} onClick={() => setTab('bookings')}>My Bookings</button>
        <button className={tab === 'new'      ? 'tab active' : 'tab'} onClick={() => setTab('new')}>+ New Booking</button>
        <button className={tab === 'rooms'    ? 'tab active' : 'tab'} onClick={() => setTab('rooms')}>Rooms</button>
      </nav>

      {/* CONTENT */}
      <main className="app-main">
        {tab === 'bookings' && <BookingsTab user={user} />}
        {tab === 'new'      && <NewBookingTab />}
        {tab === 'rooms'    && <RoomsTab />}
      </main>
    </div>
  )
}
