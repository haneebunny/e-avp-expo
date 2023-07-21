import { colors } from '../../../config/parkingLot/plColors';

import parkingAreaCords from '../../../config/parkingLot/parkingAreaCords';

export default function ParkingArea() {

return(
        <group name="parkingArea" >
            {
                (() => {
                    const result = [];
                    for(let k in parkingAreaCords) {
                        const cord = parkingAreaCords[k].cord;
                        result.push(
                            <mesh 
                                position={[
                                    cord.start[0] + cord.vector[0] / 2,
                                    1,
                                    cord.start[1] + cord.vector[1] / 2
                                ]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                key={`parkingArea-${k}`}
                            >
                                <planeGeometry args={[cord.vector[0] - 1, cord.vector[1] - 1]}  />
                                <meshBasicMaterial color={colors.pa} />
                            </mesh>
                        )
                    }
                    return result;
                })()
            }
        </group>
    )    
}