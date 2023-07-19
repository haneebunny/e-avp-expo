import { Suspense, useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { useGLTF, PerspectiveCamera } from '@react-three/drei/native';
import useControls from "r3f-native-orbitcontrols";

import gateGlbPath from '../../assets/models/gate.glb';

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial
        attach='material'
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  );
}

function Gate() {
    const { nodes, materials } = useGLTF(gateGlbPath);
    
    console.log(nodes);
    console.log(materials);
  
    return (
        <group position={[0, 0, 0]}>
            <mesh
                name='1-2 path'
                castShadow 
                receiveShadow 
                geometry={nodes.Cube001.geometry}
            >
                <meshPhongMaterial color={`red`} />
            </mesh>
            <mesh
                name='1-2 arrow'
                castShadow 
                receiveShadow 
                geometry={nodes.Cube002.geometry}
            >
                <meshPhongMaterial color={`white`} />
            </mesh>
            <mesh
                name='2-3 path'
                castShadow 
                receiveShadow 
                geometry={nodes.Cube001.geometry}
                // rotation={[0, Math.PI, 0]}
                rotation-y={Math.PI}
            >
                <meshPhongMaterial color={`red`} />
            </mesh>
            <mesh
                name='2-3 arrow'
                castShadow 
                receiveShadow 
                geometry={nodes.Cube002.geometry}
                rotation={[0, Math.PI, Math.PI]}
            >
                <meshPhongMaterial color={`white`} />
            </mesh>
        </group>
    )
  }

export default function Monit() {
    const innerHeight = Dimensions.get('window').height;
    const innerWidth = Dimensions.get('window').width;
  
    console.log('innerHeight : ', innerHeight);
    console.log('innerWidth : ', innerWidth);
  
    const [OrbitControls, events] = useControls();
    // const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
  
    return (
      <View style={{ flex: 1 }} {...events}>
        <Canvas
          dpr={[1, 1]}
          resize={{ debounce: 0 }}
        >
          {/* <OrthographicCamera 
              makeDefault
              left={innerWidth / -2} right={innerWidth / 2} 
              top={innerHeight / 2} bottom={innerHeight / -2} 
              near={0.1} far={1000} 
              position={new THREE.Vector3(10, 10, 10)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              zoom={10}
          /> */}
          <PerspectiveCamera 
            fov={75}
            aspect={innerWidth / innerHeight}
            near={0.1}
            far={1000}
          />
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <Suspense fallback={null}>
            <Gate />
          </Suspense>
        </Canvas>
      </View>
    );
}
