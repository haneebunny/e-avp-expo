import { useRef } from 'react';

import { useGLTF } from '@react-three/drei/native';
import { useFrame } from '@react-three/fiber/native';

import gateGlbPath from '../../../assets/models/gate.glb';

import { colors } from '../../../config/parkingLot/plColors';

export default function Gate() {
    const { nodes, materials } = useGLTF(gateGlbPath);
    
    const arrow1 = useRef();
	const arrow2 = useRef();

    useFrame(({ clock }) => {
		if(arrow1.current && arrow2.current) {

			arrow1.current.position.y += Math.cos(clock.getElapsedTime()) * 0.04;
			arrow2.current.position.y += Math.sin(clock.getElapsedTime()) * 0.04;
		}
	});

    // console.log(nodes);
    // console.log(materials);
  
    return (
        <group position={[0, 0, 0]}>
            <mesh
                name='1-2 path'
                castShadow 
                receiveShadow
                scale={[11.85, 9, 9]}
				position={[350 + 55, 0, 1010]}
                geometry={nodes.Cube001.geometry}
            >
                <meshPhongMaterial color={`${colors.gate}`} />
            </mesh>
            <mesh
                name='1-2 arrow'
                ref={arrow1}
                castShadow 
                receiveShadow 
                geometry={nodes.Cube002.geometry}
                scale={[10.85, 9, 9]}
				position={[350 + 55, 0, 1010]}
            >
                <meshPhongMaterial color={`white`} />
            </mesh>
            <mesh
                name='2-3 path'
                ref={arrow2}
                castShadow 
                receiveShadow 
                geometry={nodes.Cube001.geometry}
                scale={[11.85, 9, 9]}
				position={[350 + 55, 0, 540 + 80]}
                // rotation={[0, Math.PI, 0]}
                rotation-y={Math.PI}
            >
                <meshPhongMaterial color={`${colors.gate}`} />
            </mesh>
            <mesh
                name='2-3 arrow'
                castShadow 
                receiveShadow
                geometry={nodes.Cube002.geometry}
                scale={[10.85, 9, 9]}
                position={[350 + 55, 120, 540 + 80]}
                rotation={[0, Math.PI, Math.PI]}
            >
                <meshPhongMaterial color={`white`} />
            </mesh>
        </group>
    )
}