// import React from 'react'
// import Hero from '../../components/Hero/Hero'
// import Header from '../../components/Header/Header'

// function Home() {
//   return (
//     <main className="min-h-screen w-full overflow-x-hidden">
//       <Header />
//       {/* Add padding-top equal to header height to the first section after header */}
//       <div className="pt-24 md:pt-28"> {/* Adjust this value based on your header height */}
//         <Hero />
//       </div>
      
//       <section className="bg-red-500 w-full min-h-[200px] flex items-center justify-center">
//         <div className="w-full px-4">
//           abc
//         </div>
//       </section>

//       <section className="bg-orange-500 w-full min-h-[200px] flex items-center justify-center">
//         <div className="w-full px-4">
//           abc
//         </div>
//       </section>
//     </main>
//   )
// }

// export default Home


// pages/Home.jsx
import React from 'react'
import Hero from '../../components/Hero/Hero'
import MiddleSection from '../../components/MiddleSection/MiddleSection'

function Home() {
  return (
    <>
      <Hero />
      
      {/* <section className="bg-red-500 w-full min-h-[200px] flex items-center justify-center">
        <div className="w-full px-4">
          abc
        </div>
      </section> */}


      <MiddleSection/>

      {/* <section className="bg-orange-500 w-full min-h-[200px] flex items-center justify-center">
        <div className="w-full px-4">
          abc
        </div> */}
      {/* </section> */}
    </>
  )
}

export default Home