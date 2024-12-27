import { useState } from "react";

export default function SendMessage() {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [message, setMessage] = useState("Welcome to our service!");

  // Handle adding phone numbers
  const handleAddPhoneNumber = (e) => {
    e.preventDefault();
    const phone = e.target.phone.value.trim();
    if (phone && !phoneNumbers.includes(phone)) {
      setPhoneNumbers([...phoneNumbers, phone]);
    }
    e.target.reset();
  };

  // Handle sending the message
  const handleSendMessage = async () => {
    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumbers }),
      });

      const result = await response.json();
      console.log("Messages sent:", result);
      alert("Messages sent successfully!");
      setPhoneNumbers([]);
    } catch (error) {
      console.error("Error sending messages:", error);
      alert("Failed to send messages.");
    }
  };

  return (
    <div>
      <h1>Send WhatsApp Message</h1>

      {/* Add Phone Number Form */}
      <form onSubmit={handleAddPhoneNumber}>
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          required
        />
        <button type="submit">Add</button>
      </form>

      <button
        onClick={handleSendMessage}
        disabled={!phoneNumbers.length}
      >
        Send Message
      </button>

      {/* Display Selected Numbers */}
      <ul>
        {phoneNumbers.map((num, idx) => (
          <li key={idx}>{num}</li>
        ))}
      </ul>
    </div>
  );
}
