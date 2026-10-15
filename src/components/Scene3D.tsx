import { useRef, Suspense, lazy } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Grid, PerspectiveCamera, useProgress, Html } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useMousePosition } from '../hooks/useMousePosition'

// Lazy load the emblem component
const Emblem = lazy(() => import('./Emblem'))

function LoadingScreen() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-glow font-mono text-sm">
        LOADING {Math.round(progress)}%
      </div>
    </Html>
  )
}

function SceneContent({ scrollProgress, mousePosition, fxEnabled }: { scrollProgress: number, mousePosition: { x: number, y: number }, fxEnabled: boolean }) {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const isMobile = window.innerWidth < 768

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()

    // Scroll-based camera movement
    if (fxEnabled) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, scrollProgress * 3, 0.02)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2 - scrollProgress * 2, 0.02)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 - scrollProgress * 2, 0.02)
      camera.lookAt(0, 0, 0)
    }

    // Mouse parallax (desktop only)
    if (!isMobile && fxEnabled) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.1,
        0.05
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.1,
        0.05
      )
    } else {
      // Gentle idle drift on mobile
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.05
      groupRef.current.rotation.y = Math.cos(time * 0.3) * 0.05
    }

    // Scroll storyboard: different states based on scroll
    if (fxEnabled) {
      if (scrollProgress < 0.2) {
        // Hero: emblem centered
        groupRef.current.position.set(0, 0, 0)
        groupRef.current.scale.setScalar(1)
      } else if (scrollProgress < 0.4) {
        // About: emblem slides aside
        groupRef.current.position.set(2, 0, 0)
        groupRef.current.rotation.z = Math.sin(time) * 0.1
      } else if (scrollProgress < 0.6) {
        // What I Make: emblem splits
        groupRef.current.position.set(0, 0, 0)
        groupRef.current.scale.setScalar(0.8 + Math.sin(time * 2) * 0.1)
      } else if (scrollProgress < 0.8) {
        // Featured Edits: camera tilts
        groupRef.current.rotation.x = scrollProgress * 0.5
      } else {
        // Contact: camera pushes in
        groupRef.current.scale.setScalar(1.2)
      }
    }
  })

  return (
    <group ref={groupRef}>
      <Suspense fallback={<LoadingScreen />}>
        <Emblem scrollProgress={scrollProgress} />
      </Suspense>
      
      {/* Grid floor */}
      {fxEnabled && (
        <Grid
          args={[100, 100]}
          cellSize={2}
          cellThickness={0.5}
          cellColor="#1F6BFF"
          sectionSize={10}
          sectionThickness={1}
          sectionColor="#4DA3FF"
          fadeDistance={50}
          fadeStrength={1}
          position={[0, -3, 0]}
          rotation={[0, 0, 0]}
        />
      )}

      {/* Fog */}
      {fxEnabled && <fog attach="fog" args={['#02040A', 10, 50]} />}
    </group>
  )
}

export default function Scene3D({ fxEnabled }: { fxEnabled: boolean }) {
  const scrollProgress = useScrollProgress()
  const mousePosition = useMousePosition()
  const isMobile = window.innerWidth < 768
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2]

  if (!fxEnabled) {
    return null
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ height: '100lvh', maxHeight: '100vh' }}>
      <Canvas
        dpr={dpr}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 2, 8], fov: 50 }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        
        <SceneContent scrollProgress={scrollProgress} mousePosition={mousePosition} fxEnabled={fxEnabled} />
        
        {/* Post-processing */}
        {fxEnabled && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            <Vignette eskil={false} offset={0.5} darkness={0.5} />
            <Noise opacity={0.05} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
