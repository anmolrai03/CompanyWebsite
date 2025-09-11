import React from 'react'
import Hero from '../../components/Hero/Hero'
import Header from '../../components/Header/Header'

function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <Hero />
      
      <section className="bg-red-500 w-full min-h-[200px] flex items-center justify-center">
        <div className="w-full px-4">
          abc
        </div>
      </section>

      <section className="bg-orange-500 w-full min-h-[200px] flex items-center justify-center">
        <div className="w-full px-4">
          abc
        </div>
      </section>
    </main>
  )
}

export default Home




// import React, { useEffect, useRef, useState } from 'react'
// import Hero from '../../components/Hero/Hero'
// import Header from '../../components/Header/Header'
// import { gsap } from 'gsap'

// function Home() {
//   const [isLoaderVisible, setIsLoaderVisible] = useState(true)
//   const contentRef = useRef()
//   const heroRef = useRef()
//   const section1Ref = useRef()
//   const section2Ref = useRef()

//   useEffect(() => {
//     // Simulate loader completion (replace with your actual loader completion logic)
//     const timer = setTimeout(() => {
//       setIsLoaderVisible(false)
//       animateContent()
//     }, 3000) // Match this with your loader duration

//     return () => clearTimeout(timer)
//   }, [])

//   const animateContent = () => {
//     // Animate the content to appear after header animation
//     const tl = gsap.timeline()

//     tl.to(contentRef.current, {
//       opacity: 1,
//       duration: 0.5,
//       ease: "power2.out"
//     })
    
//     // Stagger animation for sections
//     tl.fromTo([heroRef.current, section1Ref.current, section2Ref.current], 
//       { y: 20, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" }
//     )
//   }

//   return (
//     <div 
//       ref={contentRef}
//       className="min-h-screen w-full overflow-x-hidden opacity-0"
//     >
//       <Header />
      
//       <div ref={heroRef}>
//         <Hero />
//       </div>
      
//       <section 
//         ref={section1Ref}
//         className="bg-red-500 w-full min-h-[200px] flex items-center justify-center opacity-0"
//       >
//         <div className="w-full px-4">
//           abc
//         </div>
//       </section>

//       <section 
//         ref={section2Ref}
//         className="bg-orange-500 w-full min-h-[200px] flex items-center justify-center opacity-0"
//       >
//         <div className="w-full px-4">
//           abc
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Home