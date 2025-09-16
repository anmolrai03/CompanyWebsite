import { useEffect, useRef } from "react";
import ServiceCard from "./ServiceCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Services() {
  const services = [
    {
      id: 1,
      name: "Web Development",
      images: [
        "/images/web-dev/webdev1.jpeg",
        "/images/web-dev/webdev2.jpeg",
      ],
    },
    {
      id: 2,
      name: "Social Media Marketing",
      images: [
        "/images/social/social1.gif",
        "/images/social/social2.gif",
      ],
    },
    {
      id: 3,
      name: "SaaS Solutions",
      images: ["/images/saas/saas1.gif"],
    },
    {
      id: 4,
      name: "Digital Marketing",
      images: [],
    },
    {
      id: 5,
      name: "Photography",
      images: [],
    },
    {
      id: 6,
      name: "Videography",
      images: [],
    },
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    // Animate title (unchanged)
    gsap.fromTo(
      title,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate cards with left/right to center and stagger
    cards.forEach((card, index) => {
      // Determine direction: left for even index, right for odd index
      const direction = index % 2 === 0 ? -100 : 100; // Move left (-100) or right (100)

      gsap.fromTo(
        card,
        { x: direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.2, // Stagger for line-by-line effect
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Cleanup ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-8 py-16 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl font-mono text-white text-center mb-12 tracking-wide"
        >
          OUR SERVICES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;