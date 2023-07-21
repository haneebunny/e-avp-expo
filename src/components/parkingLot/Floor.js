import { colors } from '../../../config/parkingLot/plColors';
import settings from '../../../config/parkingLot/settings';

export default function Floor() {

    const thickness = 10;
    const yAdjust = -thickness / 2;

    return (
        <group name='floor'>
        <mesh
            position={[settings.xAdjust, yAdjust, settings.zAdjust]}
        >
            <boxGeometry attach="geometry" args={[settings.xGridCnt, thickness, settings.zGridCnt]} />
            <meshStandardMaterial attach="material" color={colors.floor}/>
        </mesh>
    </group>
    )
}