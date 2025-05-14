import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';

export default function LetsTalk() {
  const location = useLocation();
  const form = useRef();
  const [helpType, setHelpType] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (location.state && location.state.helpType) {
      setHelpType(location.state.helpType);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    console.log("Form Data Before Submission:", {
      name,
      phone,
      email,
      regarding: helpType,
      industry: category,
      other_industry: otherCategory,
      message,
    });

    try {
      const result = await emailjs.sendForm('service_zcomwfj', 'template_5hy1nr2', form.current, 'O4oMnUj8fIL0pwhU5');
      console.log('SUCCESS!', result.text);
      setSnackbarMessage("Message sent successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      resetForm();
    } catch (error) {
      console.error('FAILED...', error.text);
      setSnackbarMessage("Failed to send message. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setCategory("");
    setOtherCategory("");
  };

  return (
    <div className="bg-white pt-28 pb-16 px-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="min-h-[300px]">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Let's Talk</h1>
          <form ref={form} onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name" // ENSURE THIS MATCHES YOUR EMAILJS TEMPLATE VARIABLE
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-4 text-black border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone" // ENSURE THIS MATCHES YOUR EMAILJS TEMPLATE VARIABLE
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-4 text-black border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email" // ENSURE THIS MATCHES YOUR EMAILJS TEMPLATE VARIABLE
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 text-black border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="regarding">
                Regarding
              </label>
              <input
                type="text"
                id="regarding"
                name="regarding" // ENSURE THIS MATCHES YOUR EMAILJS TEMPLATE VARIABLE
                value={helpType}
                readOnly
                className="w-full p-4 border text-black border-gray-300 rounded-md bg-yellow-300"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Industry
              </label>
              <select
                id="category"
                name="industry" // ENSURE THIS MATCHES YOUR EMAILJS TEMPLATE VARIABLE
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 text-black border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="Architect">Architect</option>
                <option value="Construction">Construction</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Designer">Designer</option>
                <option value="others">Others</option>
              </select>
            </div>

            {category === "others" && (
              <div className="mb-6">
                <label htmlFor="otherCategory" className="block text-gray-700 font-medium mb-2">
                  Please Specify
                </label>
                <input
                  type="text"
                  id="otherCategory"
                  name="other_industry" // ENSURE THIS MATCHES YOUR EMAILJS TEMPLATE VARIABLE
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                  className="w-full p-4 text-black border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                Tell Us More
              </label>
              <textarea
                id="message"
                name="message" // ENSURE THIS MATCHES YOUR EMAILJS TEMPLATE VARIABLE
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 border text-black border-gray-300 rounded-md"
              ></textarea>
            </div>

            <button
              type="submit"
              className={`bg-yellow-400 text-black py-3 px-8 rounded-lg hover:bg-yellow-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="items-center justify-center hidden md:flex">
          <img
            src="/c5.jpeg"
            alt="Let's talk"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
}