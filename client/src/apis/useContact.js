import { useState } from "react";

function useContact() {

  const [loading, setloading] = useState(false);


  let sendDetails = async (formData) => {

    setloading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/contacts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Form submitted successfully:", data);
      } else {
        console.log("Error submitting form:", data);
      }
    } catch (error) {
      alert('Server error')
      console.log("Network or server error:", error);
    } finally{
      setloading(false);
    }

  };

  return {loading, sendDetails};
}

export default useContact;
