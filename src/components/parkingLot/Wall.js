import settings from '../../../config/parkingLot/settings';
import wallLayerRange from '../../../config/parkingLot/wallLayerRange';

import { colors } from '../../../config/parkingLot/plColors';

export default function Wall() {

    const width = 10;
    const basicThickness = 5;

    let key = 1;

    return (
        <group name='wallLayers'>
            {
                (() => {
                    const walls = [];
                    for(let k in wallLayerRange) {
                        const xCord = parseInt(k);
                        const zRanges = wallLayerRange[k];

                        for(const zRange of zRanges) {
                            const eachDepth = zRange[1] - zRange[0] + settings.spacer;

                            let thickness = zRange[2] ? zRange[2].h : basicThickness;

                            walls.push(
                                <mesh
                                    position={[
                                        xCord * settings.spacer - settings.spacer / 2, 
                                        thickness / 2,
                                        zRange[0] + eachDepth / 2 - settings.spacer
                                    ]}
                                    key={`wall-${key}`}
                                >
                                    <boxGeometry args={[width, thickness, eachDepth]} />
                                    <meshBasicMaterial color={colors.wall} />
                                </mesh>
                            );
                            key++;
                        } // inner for
                    } // outer for;
                    return walls;
                })()
            }
        </group>
    )

}


