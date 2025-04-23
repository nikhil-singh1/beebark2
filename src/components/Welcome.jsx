import React, { Suspense, useMemo, useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Generate particles (with more particles)
const generateParticles = (count = 80000) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 50;
    const y = (Math.random() - 0.5) * 50;
    const z = (Math.random() - 0.5) * 50;
    positions.push(x, y, z);
  }
  return new Float32Array(positions);
};

const Particles = () => {
  const positions = useMemo(() => generateParticles(), []);
  return (
    <Points positions={positions} frustumCulled>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.07}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const WelcomeText = ({ show }) => (
  <Html center>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-yellow-400 text-6xl md:text-9xl font-extrabold text-center drop-shadow-lg"
      >
        Welcome to the Future
      </motion.div>
    )}
  </Html>
);

const Spark = ({ show }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current && show) {
      groupRef.current.rotation.z += 0.2;
    }
  });

  if (!show) return null;

  const sparkLines = [...Array(30)].map((_, i) => {
    const angle = (Math.PI * 2 * i) / 30;
    const len = Math.random() * 0.7 + 0.3;
    return (
      <line key={i}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([0, 0, 0, Math.cos(angle) * len, Math.sin(angle) * len, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="yellow" linewidth={2} />
      </line>
    );
  });

  return <group ref={groupRef}>{sparkLines}</group>;
};

const Star = ({ fromLeft = true, onHit }) => {
  const meshRef = useRef();
  const speed = 0.05;

  useFrame(() => {
    if (!meshRef.current) return;
    const direction = fromLeft ? 1 : -1;
    meshRef.current.position.x += direction * speed;
    meshRef.current.position.y -= speed;

    if (Math.abs(meshRef.current.position.x) < 0.1 && Math.abs(meshRef.current.position.y) < 0.1) {
      onHit();
      meshRef.current.visible = false;
    }
  });

  return (
    <mesh ref={meshRef} position={[fromLeft ? -3 : 3, 3, 0]}>
      <sphereGeometry args={[0.45, 64, 64]} />
      <meshStandardMaterial emissive="yellow" color="yellow" />
    </mesh>
  );
};

const FuturisticAnimation = () => {
  const [leftHit, setLeftHit] = useState(false);
  const [rightHit, setRightHit] = useState(false);
  const [showText, setShowText] = useState(false);
  const [sparkVisible, setSparkVisible] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      setLeftHit(false);
      setRightHit(false);
      setShowText(false);
      setSparkVisible(false);
    }
  }, [inView]);

  useEffect(() => {
    if (leftHit && rightHit) {
      setSparkVisible(true);
      setTimeout(() => {
        setSparkVisible(false);
        setShowText(true);
      }, 1000);
    }
  }, [leftHit, rightHit]);

  return (
    <div
      ref={ref}
      className="h-[300px] md:h-screen w-full"
      style={{ backgroundColor: "#221912" }}
    >
      {inView && (
        <div className="h-[100vh] w-full relative">
          <div className="absolute inset-0 pointer-events-none">
            <Canvas style={{ pointerEvents: "none" }} camera={{ position: [0, 0, 5], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <Suspense fallback={null}>
                <Particles />
                <Star fromLeft onHit={() => setLeftHit(true)} />
                <Star fromLeft={false} onHit={() => setRightHit(true)} />
                <Spark show={sparkVisible} />
                <WelcomeText show={showText} />
              </Suspense>
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuturisticAnimation;
