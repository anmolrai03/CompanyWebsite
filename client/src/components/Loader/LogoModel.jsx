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