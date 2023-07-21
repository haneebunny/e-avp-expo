import { Suspense, useRef, useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';

import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber/native';
import { PerspectiveCamera, useHelper } from '@react-three/drei/native';
import useControls from "r3f-native-orbitcontrols";

// parking lot config
import settings from '../../config/parkingLot/settings';

// parking lot components
import Gate from '../../src/components/parkingLot/Gate';
import Floor from '../../src/components/parkingLot/Floor';

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



export default function Monit() {
    const innerHeight = Dimensions.get('window').height;
    const innerWidth = Dimensions.get('window').width;
  
    console.log('innerHeight : ', innerHeight);
    console.log('innerWidth : ', innerWidth);
  
    const [OrbitControls, events] = useControls();
    // const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);

    // const camera = useRef(null);
    // useEffect(() => {
    //   if(camera.current) {
    //     useHelper(camera, THREE.CameraHelper, 1, 'hotpink');
    //   }
    // }, [camera])

    return (
      <View style={{ flex: 1 }} {...events}>
        <Canvas
          dpr={[1, 1]}
          per
          camera={{
            position: [-100, 0, -100],
            fov: 75,
            near: 0.1,
            far: 2000,
          }}
        >
          <OrbitControls />
          {/* <OrthographicCamera 
              makeDefault
              left={innerWidth / -2} right={innerWidth / 2} 
              top={innerHeight / 2} bottom={innerHeight / -2} 
              near={0.1} far={1000} 
              position={new THREE.Vector3(10, 10, 10)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              zoom={10}
          /> */}
          {/* <PerspectiveCamera
            makeDefault={true}
            // ref={camera}
            fov={75}
            aspect={innerWidth/innerHeight}
            near={0.1}
            far={1000}
            position={new THREE.Vector3(0, 1000, 0)}
            lookAt={new THREE.Vector3(settings.xGridCnt / 2, 0, settings.zGridCnt / 2)}
          /> */}
          
          <ambientLight position={[]} intensity={0.5} />
				  {/* <directionalLight position={[settings.xGridCnt / 2, 300, settings.zGridCnt / 2]} /> */}
          {/* <pointLight position={[10, 10, 10]} /> */}
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <Floor />
          <Suspense fallback={null}>
            <Gate />
          </Suspense>
        </Canvas>
      </View>
    );
}
