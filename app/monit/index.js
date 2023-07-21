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
import Wall from '../../src/components/parkingLot/Wall';
import ParkingArea from '../../src/components/parkingLot/ParkingArea';
import ParkingSections from '../../src/components/parkingLot/ParkingSesctions'

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
          camera={{
            position: [0, 1000, -settings.zGridCnt / 2],
            fov: 75,
            near: 0.1,
            far: 3000,
            aspect: innerWidth / innerHeight
          }}
        >
          <OrbitControls dampingFactor={1} target={new THREE.Vector3(settings.xGridCnt / 2, 0, settings.zGridCnt / 2)}/>
         
          <axesHelper args={[200]} />
          <ambientLight intensity={1} />
				  <directionalLight position={[settings.xGridCnt / 2, 500, settings.zGridCnt / 2]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <Floor />
          <Wall />
          <ParkingArea />
          <ParkingSections />
          <Suspense fallback={null}>
            <Gate />
          </Suspense>
        </Canvas>
      </View>
    );
}
