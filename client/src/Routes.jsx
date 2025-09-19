// import React, { lazy, Suspense } from 'react'
// import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom'

// // Add artificial delay for testing the loader
// const lazyWithDelay = (importFn, delay = 2000) => {
//   return lazy(() =>
//     new Promise(resolve => {
//       setTimeout(() => {
//         resolve(importFn());
//       }, delay);
//     })
//   );
// };

// // COMPONENT IMPORT
// import Loader from "./components/Loader/Loader"
// import Layout from './Layout';

// // PAGES IMPORTS
// // const Hero = lazy( () => import('./pages/Hero/Hero'))

// // Lazy load your components with delay for testing
// const Home = lazyWithDelay(() => import('./pages/Home/Home'), 3000);
// // const About = lazyWithDelay(() => import('./pages/About'), 2000);
// // const Contact = lazyWithDelay(() => import('./pages/Contact'), 2000);

// function Routes() {

//   const router = createBrowserRouter(createRoutesFromChildren(
//     <Route path='/' element={<Layout />}>
//       <Route
//         index
//         element={
//           <Suspense fallback={ <Loader/> }>
//             <Home />
//           </Suspense>
//         }
//       />
//     </Route>
//   ))

//   return (
//     <RouterProvider router={router} />
//   )
// }

// export default Routes

import { lazy, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
  Route,
} from "react-router-dom";

// CONTEXT IMPORTS
import { useLoading } from "./context/LoadingContext/LoadingContext";
import LoadingContextProvider from "./context/LoadingContext/LoadingContextProvider";

//COMPONENTS IMPORT
import Layout from "./Layout";
import Loader from "./components/Loader/Loader";
import PageLoader from "./components/Loader/PageLoader";
// import ServicePage from "./pages/ServicePage/ServicePage";
// import Contact from "./pages/Contact/Contact";

// LAZY IMPORTS
const Home = lazy( () => import('./pages/Home/Home'))
const Contact = lazy(() => import("./pages/Contact/Contact"));
const ServicePage = lazy( () => import("./pages/ServicePage/ServicePage"));

// // Add artificial delay for testing the loader
const lazyWithDelay = (importFn, delay = 2000) => {
  return lazy(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(importFn());
        }, delay);
      })
  );
};

// const Home = lazyWithDelay(() => import("./pages/Home/Home"), 3000);
// const Contact = lazyWithDelay( () => import("./pages/Contact/Contact"), 3000);
// const ServicePage = lazyWithDelay( () => import("./pages/ServicePage/ServicePage"), 3000);


// Custom Suspense wrapper that manages loading state
function LoadingAwareLoader() {
  const { setIsLoading } = useLoading();

  // Set loading to true when this component mounts
  useEffect(() => {
    setIsLoading(true);
    return () => setIsLoading(false); // Cleanup when unmounting
  }, [setIsLoading]);

  return <Loader />;
}

function Routes() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/pages" element={<Layout />}>
          <Route
            path="contact"
            element={
              <Suspense fallback={ <PageLoader /> }>
                <Contact />
              </Suspense>
            }
          />
          <Route 
            path="services/:serviceName"
            element={
              <Suspense fallback={ <PageLoader />}>
                <ServicePage />
              </Suspense>
            }
          />
        </Route>
        ,
        <Route
          path="/"
          index
          element={
            <Suspense fallback={<LoadingAwareLoader />}>
              <Home />
            </Suspense>
          }
        />
      </>
    )
  );

  return (
    <LoadingContextProvider>
      <RouterProvider router={router} />
    </LoadingContextProvider>
  );
}

export default Routes;
