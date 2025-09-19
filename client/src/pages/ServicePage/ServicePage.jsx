import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceCard from '../../components/Services/ServiceCard'
import Contact from '../Contact/Contact'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function ServicePage() {
  let { serviceName } = useParams();
  const pageRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const worksRef = useRef(null)
  const worksTitleRef = useRef(null)
  const reviewsRef = useRef(null)
  const reviewsTitleRef = useRef(null)
  const contactRef = useRef(null)
  const contactTitleRef = useRef(null)
  const contactSubtitleRef = useRef(null)

  // Format service name for display
  const formattedServiceName = serviceName 
    ? serviceName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Our Service';

  // Sample data - you would replace this with actual data fetching
  const sampleWorks = [
    {
      id: 1,
      name: "Project Alpha",
      description: "A cutting-edge solution for modern businesses",
      images: ["https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      tags: ["Web", "Design"],
      link: "/project-alpha"
    },
    {
      id: 2,
      name: "Project Beta",
      description: "Revolutionizing user experience with innovative design",
      images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      tags: ["App", "Development"],
      link: "/project-beta"
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "Transforming ideas into digital reality",
      images: ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      tags: ["Branding", "Strategy"],
      link: "/project-gamma"
    },
    {
      id: 4,
      name: "Project Delta",
      description: "Creating immersive digital experiences",
      images: ["https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      tags: ["UI/UX", "Development"],
      link: "/project-delta"
    },
    {
      id: 5,
      name: "Project Delta",
      description: "Creating immersive digital experiences",
      images: ["https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      tags: ["UI/UX", "Development"],
      link: "/project-delta"
    },
    {
      id: 6,
      name: "Project Delta",
      description: "Creating immersive digital experiences",
      images: ["https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      tags: ["UI/UX", "Development"],
      link: "/project-delta"
    }
  ]

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "The team delivered exceptional results beyond our expectations. Their attention to detail and creative approach solved our complex challenges."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager, InnovateCo",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Professional, responsive, and incredibly talented. The website they created has significantly increased our conversion rates."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthLabs",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Working with this team was a game-changer for our brand. Their strategic insights combined with technical excellence delivered outstanding results."
    },
    {
      id: 4,
      name: "David Kim",
      role: "Founder, LaunchPad Ventures",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "The quality of work exceeded our expectations. They understood our vision perfectly and executed with precision and creativity."
    },
    {
      id: 5,
      name: "David Kim",
      role: "Founder, LaunchPad Ventures",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "The quality of work exceeded our expectations. They understood our vision perfectly and executed with precision and creativity."
    },
    {
      id: 6,
      name: "David Kim",
      role: "Founder, LaunchPad Ventures",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "The quality of work exceeded our expectations. They understood our vision perfectly and executed with precision and creativity."
    }
  ]

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Reset scroll position to top when component mounts
    window.scrollTo(0, 0);

    // Page entrance animation
    gsap.fromTo(pageRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power3.out" 
      }
    )

    // Title animation - fixed to show immediately on page load
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        delay: 0.3, // Small delay after page animation
        ease: "back.out(1.7)",
        // Remove ScrollTrigger for title to make it always visible
      }
    )

    // Subtitle animation - fixed to show immediately on page load
    gsap.fromTo(subtitleRef.current, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        delay: 0.6, // Slightly after title
        ease: "power2.out",
        // Remove ScrollTrigger for subtitle to make it always visible
      }
    )

    // Works section title animation
    gsap.fromTo(worksTitleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: worksRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse"
        }
      }
    )

    // Animate service cards individually
    gsap.utils.toArray('.service-card-item').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play reverse play reverse"
          }
        }
      )
    })

    // Reviews section title animation
    gsap.fromTo(reviewsTitleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse"
        }
      }
    )

    // Animate review cards
    gsap.utils.toArray('.review-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play reverse play reverse"
          }
        }
      )
    })

    // Contact section title animation
    gsap.fromTo(contactTitleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse"
        }
      }
    )

    // Contact section subtitle animation
    gsap.fromTo(contactSubtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: contactSubtitleRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse"
        }
      }
    )

    // Animate the contact container
    gsap.fromTo('.contact-container',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: '.contact-container',
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      document.documentElement.style.scrollBehavior = 'auto';
    }
  }, [serviceName])

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-kite pb-20 pt-[10rem]">
      {/* Global styles for smooth scrolling */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #1a1a1a;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #4a4a4a;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #5a5a5a;
          }
          
          /* Smooth scrolling for all browsers */
          * {
            scroll-behavior: smooth;
          }
        `}
      </style>
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Title Section */}
        <section className="text-center mb-16 md:mb-24">
          <div className="inline-block">
            <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-white">
              {formattedServiceName}
            </h1>
          </div>
          <p ref={subtitleRef} className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our exceptional work and see why clients choose us for their {formattedServiceName.toLowerCase()} needs.
          </p>
        </section>

        {/* Sample Works Section */}
        <section ref={worksRef} className="mb-20 md:mb-28">
          <h2 ref={worksTitleRef} className="text-2xl md:text-3xl font-bold mb-10 text-center">Sample Works</h2>
          
          <div className="flex overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4">
            <div className="flex space-x-6 min-w-max">
              {sampleWorks.map((work, index) => (
                <div key={work.id} className="service-card-item" style={{ minWidth: '300px', width: '300px' }}>
                  <ServiceCard service={work} index={index} />
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-center text-gray-400 mt-6 md:hidden">Swipe to see more →</p>
        </section>

        {/* Customer Reviews Section */}
        <section ref={reviewsRef} className="mb-20 md:mb-28">
          <h2 ref={reviewsTitleRef} className="text-2xl md:text-3xl font-bold mb-10 text-center">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="review-card bg-gray-800 rounded-xl p-6 flex flex-col">
                <div className="flex items-center mb-4">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-bold">{review.name}</h3>
                    <p className="text-sm text-gray-400">{review.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-300 flex-grow">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef}>
          <div className="contact-container bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12">
            <h2 ref={contactTitleRef} className="text-2xl md:text-3xl font-bold mb-6 text-center">Ready to Get Started?</h2>
            <p ref={contactSubtitleRef} className="text-gray-300 text-center max-w-2xl mx-auto mb-8">
              Let's discuss how our {formattedServiceName} services can help you achieve your goals. 
              Contact us today for a free consultation.
            </p>
            
            <Contact />
          </div>
        </section>
      </div>
    </div>
  )
}

export default ServicePage