import { useState, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User, Heart } from 'lucide-react';
import './Guestbook.css';

/**
 * Guestbook — Browser-local nursery guestbook with sanitized rendering and input validation.
 */
export default function Guestbook({ playClick, playChime }) {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState(null);

  // Load entries from localStorage on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pip-guestbook');
      if (stored) {
        setEntries(JSON.parse(stored));
      } else {
        // Initial friendly starter entries
        const defaults = [
          {
            id: '1',
            name: 'Sleepy Cloud Owl',
            message: 'Pip, the midnight croissant dream was delicious! Thank you! 🥐☁️',
            date: 'Oct 18, 2026'
          },
          {
            id: '2',
            name: 'Ghost Bunny',
            message: 'No more fear of silence. The music box melody kept me cozy all night! 🐰💫',
            date: 'Oct 17, 2026'
          }
        ];
        setEntries(defaults);
        localStorage.setItem('pip-guestbook', JSON.stringify(defaults));
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playClick) playClick();

    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName || !trimmedMsg) {
      setFeedback({ type: 'error', text: 'Please fill in both your name and dream note!' });
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    const newEntry = {
      id: String(Date.now()),
      name: trimmedName.slice(0, 30),
      message: trimmedMsg.slice(0, 200),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [newEntry, ...entries].slice(0, 25);
    setEntries(updated);
    try {
      localStorage.setItem('pip-guestbook', JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }

    setName('');
    setMessage('');
    if (playChime) playChime();
    setFeedback({ type: 'success', text: 'Thank you! Pip will read your note at midnight. 🌙' });
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <section id="guestbook" className="guestbook section" aria-label="Dream Guestbook">
      <div className="wrap">
        <div className="section-title">
          <h2>
            <MessageSquare size={22} className="star" aria-hidden="true" /> Dream Guestbook
          </h2>
          <p>Leave a note under Pip's pillow. Messages are securely stored locally in your browser.</p>
        </div>

        <div className="guestbook-container">
          <div className="guestbook-form-card card">
            <h3 className="form-heading">Leave a Note for Pip</h3>
            <p className="form-disclaimer">
              ℹ️ Stored locally in your browser (demo mode). Does not post to a public server.
            </p>

            <form onSubmit={handleSubmit} className="guestbook-form">
              <div className="form-group">
                <label htmlFor="guest-name" className="form-label">
                  Your Dreamer Name
                </label>
                <div className="input-wrap">
                  <User size={16} className="input-icon" />
                  <input
                    id="guest-name"
                    type="text"
                    required
                    maxLength={30}
                    placeholder="e.g. Star Wanderer, Sleepy Koala"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-counter-row">
                  <label htmlFor="guest-message" className="form-label">
                    Your Bedtime Message
                  </label>
                  <span className={`char-counter ${message.length > 180 ? 'counter-near' : ''}`}>
                    {message.length}/200
                  </span>
                </div>
                <textarea
                  id="guest-message"
                  required
                  rows={4}
                  maxLength={200}
                  placeholder="Tell Pip what kind of dream you wish to dream tonight..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                />
              </div>

              {feedback && (
                <div className={`feedback-alert alert-${feedback.type}`}>
                  <span>{feedback.text}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary submit-btn">
                <Send size={16} />
                <span>Slip Note Under Pillow</span>
              </button>
            </form>
          </div>

          <div className="guestbook-feed-col">
            <h3 className="feed-heading">
              <Sparkles size={18} className="star" /> Recent Dream Notes ({entries.length})
            </h3>

            <div className="entries-list" role="feed" aria-label="Guestbook Notes">
              {entries.map((item) => (
                <article key={item.id} className="entry-card card" tabIndex={0}>
                  <div className="entry-header">
                    <span className="entry-author">{item.name}</span>
                    <time className="entry-date">{item.date}</time>
                  </div>
                  <p className="entry-body">{item.message}</p>
                </article>
              ))}

              {entries.length === 0 && (
                <div className="empty-guestbook">
                  <Heart size={32} className="star" />
                  <p>The pillow is empty! Be the first to leave Pip a bedtime note.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
