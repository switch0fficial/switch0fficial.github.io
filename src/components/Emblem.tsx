import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Emblem({ scrollProgress: _scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Group>(null)
  const shardsRef = useRef<THREE.Group>(null)
  const [loaded, setLoaded] = useState(false)

  // Create power symbol geometry using Three.js primitives
  const groupGeometry = useMemo(() => {
    const group = new THREE.Group()

    // Circle (outer ring)
    const circleGeometry = new THREE.TorusGeometry(3, 0.3, 16, 64)
    const circleMaterial = new THREE.MeshStandardMaterial({
      color: '#02040A',
      metalness: 0.9,
      roughness: 0.1,
      emissive: '#1F6BFF',
      emissiveIntensity: 0.5,
    })
    const circle = new THREE.Mesh(circleGeometry, circleMaterial)
    group.add(circle)

    // Circle edge glow
    const circleEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(circleGeometry),
      new THREE.LineBasicMaterial({ color: '#4DA3FF', linewidth: 2 })
    )
    group.add(circleEdges)

    // Vertical line (power symbol)
    const lineGeometry = new THREE.BoxGeometry(0.3, 2.5, 0.3)
    const lineMaterial = new THREE.MeshStandardMaterial({
      color: '#02040A',
      metalness: 0.9,
      roughness: 0.1,
      emissive: '#1F6BFF',
      emissiveIntensity: 0.5,
    })
    const line = new THREE.Mesh(lineGeometry, lineMaterial)
    line.position.y = 1.5
    group.add(line)

    // Line edge glow
    const lineEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(lineGeometry),
      new THREE.LineBasicMaterial({ color: '#4DA3FF', linewidth: 2 })
    )
    lineEdges.position.y = 1.5
    group.add(lineEdges)

    return group
  }, [])

  useEffect(() => {
    if (groupGeometry) {
      setLoaded(true)
    }
  }, [groupGeometry])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Rotate rings
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.2
      ringRef.current.rotation.y = time * 0.3
    }

    // Animate shards
    if (shardsRef.current) {
      shardsRef.current.children.forEach((shard, i) => {
        shard.position.y = Math.sin(time + i) * 0.5
        shard.rotation.x = time * 0.5 + i
      })
    }

    // Initial assembly animation
    if (groupRef.current && !loaded) {
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.05))
    }
  })

  if (!groupGeometry) return null

  return (
    <group ref={groupRef}>
      {/* Main emblem */}
      <primitive object={groupGeometry} />

      {/* Orbiting rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.1, 16, 100]} />
          <meshBasicMaterial color="#1F6BFF" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[5, 0.05, 16, 100]} />
          <meshBasicMaterial color="#4DA3FF" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Floating wireframe shards */}
      <group ref={shardsRef}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[
            Math.cos(i * Math.PI / 4) * 6,
            Math.sin(i * Math.PI / 4) * 6,
            0
          ]}>
            <icosahedronGeometry args={[0.3, 0]} />
            <meshBasicMaterial
              color="#4DA3FF"
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Lights */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#4DA3FF" />
      <pointLight position={[-10, -10, 10]} intensity={1} color="#1F6BFF" />
      <ambientLight intensity={0.5} />
    </group>
  )
}

export default Emblem
