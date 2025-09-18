// useContact.js
const useContact = async (formData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Form submitted successfully:", data);
    } else {
      console.log("Error submitting form:", data);
    }
  } catch (error) {
    console.log("Network or server error:", error);
  }
};

export default useContact;
