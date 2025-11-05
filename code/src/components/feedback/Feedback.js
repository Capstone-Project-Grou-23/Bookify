import React, { useState } from 'react';
import './Feedback.css'; 

const Feedback = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to your backend
    console.log('Feedback submitted:', { subject, message });
    setSubmitted(true);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="feedback-container">
      <div className="feedback-box">
        {submitted ? (
          <div className="feedback-success">
            <h2>Thank You!</h2>
            <p>Your feedback has been received. We appreciate you taking the time to help us improve.</p>
          </div>
        ) : (
          <>
            <h2>Give Feedback</h2>
            <p>We'd love to hear what you think. What's working well? What could be better?</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                // --- THIS IS THE FIXED LINE ---
                placeholder="e.g., 'Suggestion for search'"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="6"
                placeholder="Your detailed feedback..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button type="submit" className="btn-submit">Send Feedback</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Feedback;
