// import { useEffect, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Sparkles } from "@react-three/drei";
// import LogoModel from "./LogoModel";
// import "./EnhancedLoader.css";

// function Loader() {
//   return (
//     <div className="enhanced-loader fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
//       <div className="canvas-container relative w-64 h-64 md:w-80 md:h-80">
//         <Canvas>
//           <ambientLight args={[0.6]} />
//           <directionalLight 
//             position={[2, 2, 5]} 
//             intensity={1.2} 
//             color="#4f46e5"
//           />
//           <pointLight 
//             position={[-3, -3, 2]} 
//             intensity={0.8} 
//             color="#8b5cf6"
//           />
//           <Sparkles
//             count={30}
//             scale={[6, 6, 6]}
//             size={0.8}
//             speed={0.4}
//             color="#818cf8"
//           />
//           <LogoModel 
//             scale={1.2} 
//             rotation={[0, Math.PI / 4, 0]}
//           />
//           <OrbitControls 
//             enableZoom={false} 
//             enableRotate={false}
//             enablePan={false}
//             autoRotate={true}
//             autoRotateSpeed={2}
//           />
//         </Canvas>
//       </div>
//     </div>
//   );
// }

// export default Loader;


import { Canvas } from "@react-three/fiber";
import LogoModel from "./LogoModel";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="w-48 h-48 md:w-56 md:h-56">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[2, 2, 5]} intensity={1.8} color="#4f46e5" />
          <pointLight position={[-2, -2, 3]} intensity={0.8} color="#8b5cf6" />
          <LogoModel scale={1.8} autoRotate={true} rotationSpeed={0.02} />
        </Canvas>
      </div>
    </div>
  );
}
