import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function LogoModel({ autoRotate = false, rotationSpeed = 0.01, ...props }) {
  const group = useRef();
  const { scene } = useGLTF("/logo.glb");

  // Only auto-rotate if explicitly enabled
  useFrame(() => {
    if (group.current && autoRotate) {
      group.current.rotation.y += rotationSpeed;
    }
  });

  return <primitive ref={group} object={scene} {...props} />;
}


// import {useRef} from 'react';
// import { useFrame } from "@react-three/fiber";

// // LogoModel component (keep this separate)
// function LogoModel({ autoRotate = false, rotationSpeed = 0.01, ...props }) {
//   const group = useRef();
  
//   // Only auto-rotate if explicitly enabled
//   useFrame(() => {
//     if (group.current && autoRotate) {
//       group.current.rotation.y += rotationSpeed;
//     }
//   });

//   return (
//     <group ref={group} {...props}>
//       {/* Simplified logo geometry - replace with your actual model */}
//       <mesh>
//         <torusKnotGeometry args={[1, 0.4, 100, 16]} />
//         <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.8} />
//       </mesh>
//     </group>
//   );
// }

// export default LogoModel