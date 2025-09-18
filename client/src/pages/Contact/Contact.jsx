import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ButtonElement from "../../components/utils/ButtonElement/ButtonElement";
import useContact from "../../apis/useContact";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useGSAP(() => {
    gsap.fromTo(
      "#contact-page",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form Data:", formData);

  // send form data
  await useContact(formData);

  // clear the fields
  setFormData({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
};


  return (
    <div
      id="contact-page"
      className="min-h-screen w-full py-32 flex justify-center items-start bg-black font-kite px-4 sm:px-6 md:px-8"
    >
      <div className="w-full max-w-2xl bg-zinc-900 shadow-lg rounded-2xl p-6 sm:p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-700 bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-700 bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Enter the subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-700 bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-700 bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} className="mt-4 flex justify-center">
            <ButtonElement name="Send Message" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
