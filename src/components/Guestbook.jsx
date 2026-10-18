import { useState, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User, Heart, Trash2, Info } from 'lucide-react';
import './Guestbook.css';

/**
 * Guestbook — Browser-local nursery guestbook with sanitized rendering,
 * input validation, and ability to delete own notes.
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
        // Initial friendly canon starter entries
        const defaults = [
          {
            id: 'default-1',
            name: 'Sleepy Cloud Owl',
            message: 'Pip, the midnight lavender croissant dream was delicious! Thank you! 🥐☁️',
            date: 'Oct 18, 2026',
            isUser: false
          },
          {
            id: 'default-2',
            name: 'Ghost Bunny',
            message: 'No more fear of silence. The music box melody kept me cozy all night! 🐰💫',
            date: 'Oct 17, 2026',
            isUser: false
          },
          {
            id: 'default-3',
            name: 'Tiny Moth of Lantern Way',
            message: 'The aurora nightlight is the warmest green I have ever seen. Goodnight Pip! 🏮',
            date: 'Oct 16, 2026',
            isUser: false
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
      setTimeout(() => setFeedback(null), 3500);
      return;
    }

    const newEntry = {
      id: String(Date.now()),
      name: trimmedName.slice(0, 30),
      message: trimmedMsg.slice(0, 200),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isUser: true // Flags this note as created by the current visitor
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

  const handleDeleteEntry = (id) => {
    if (playClick) playClick();
    const updated = entries.filter((item) => item.id !== id);
    setEntries(updated);
    try {
      localStorage.setItem('pip-guestbook', JSON.stringify(updated));
    } catch { /* storage error */ }
  };

  return (
    <section id="guestbook" className="guestbook section" aria-label="Dream Guestbook">
      <div className="wrap">
        <div className="section-title">
          <h2>
            <MessageSquare size={22} className="star" aria-hidden="true" /> Dream Guestbook
          </h2>
          <p>Leave a note under Pip's pillow. Messages are stored securely inside your browser.</p>
        </div>

        <div className="guestbook-container">
          <div className="guestbook-form-card card">
            <h3 className="form-heading">Leave a Note for Pip</h3>
            <div className="local-storage-disclaimer">
              <Info size={14} />
              <span>
                Browser Demo Storage: Your notes are saved in your local browser only and won't be sent to an external server.
              </span>
            </div>

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
                  placeholder="Tell Pip what kind of dream you wish to fall asleep inside tonight..."
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
                    <div className="entry-author-box">
                      <span className="entry-author">{item.name}</span>
                      {item.isUser && <span className="entry-you-badge">Your Note</span>}
                    </div>
                    <div className="entry-meta-right">
                      <time className="entry-date">{item.date}</time>
                      {item.isUser && (
                        <button
                          type="button"
                          className="entry-delete-btn"
                          onClick={() => handleDeleteEntry(item.id)}
                          title="Delete your note"
                          aria-label={`Delete note by ${item.name}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
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
