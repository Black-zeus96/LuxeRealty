import React, { useState } from "react";

// Here we are using Formspree, a free email service that does not need backend

function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-6xl mb-12 mt-12 mx-auto p-12 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-8">Contact Us</h2>
      {formSubmitted ? (
        <p className="text-green-500 text-center">
          Your message has been sent to our team. Thank you!
        </p>
      ) : (
        <form
          action="https://formspree.io/f/movawngd" //Formspree API key
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-95 transition duration-300"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
