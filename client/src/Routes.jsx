import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom'

// Add artificial delay for testing the loader
const lazyWithDelay = (importFn, delay = 2000) => {
  return lazy(() => 
    new Promise(resolve => {
      setTimeout(() => {
        resolve(importFn());
      }, delay);
    })
  );
};

// COMPONENT IMPORT
import Loader from "./components/Loader/Loader"

// PAGES IMPORTS
// const Hero = lazy( () => import('./pages/Hero/Hero'))

// Lazy load your components with delay for testing
const Home = lazyWithDelay(() => import('./pages/Home/Home'), 3000);
// const About = lazyWithDelay(() => import('./pages/About'), 2000);
// const Contact = lazyWithDelay(() => import('./pages/Contact'), 2000);


function Routes() {

  const router = createBrowserRouter(createRoutesFromChildren(
    <>
      <Route 
        path='/'
        element={
          <Suspense fallback={ <Loader/> }> 
            <Home />
          </Suspense>
        }
      />
      {/* <Route 
      path='/'
      element={
        <Suspense fallback={<Loader /> }> 
          <Hero/>
        </Suspense>
      }
      /> */}
    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default Routes