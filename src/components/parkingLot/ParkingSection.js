import { Vector3 } from 'three';
import { Line } from '@react-three/drei/native';

export default function ParkingSection({ parkingSectionInfo }) {
    const start = parkingSectionInfo.start;
    const end = parkingSectionInfo.end;

    const startVector = new Vector3(start.x, 0, start.z);
    const endVector = new Vector3(end.x, 0, end.z);

    const width = end.x - start.x;
    const height = end.z - start.z;

    const posX = start.x + width / 2;
    const posZ = start.z + height / 2;

    const points = [];
    points.push(startVector);
    points.push(new Vector3(start.x + width, 0, startVector.z));
    points.push(endVector);
    points.push(new Vector3(endVector.x - width, 0, endVector.z));
    points.push(startVector);

    return (
        <>
            <Line points={points} color={parkingSectionInfo.color} lineWidth={1.5} position={[0, 5, 0]} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[posX, 2, posZ]}>
                <planeGeometry args={[end.x - start.x, end.z - start.z]} />
                <meshStandardMaterial color={parkingSectionInfo.color} transparent={true} opacity={parkingSectionInfo.opacity}/>
            </mesh>
           
        </>
    )
}