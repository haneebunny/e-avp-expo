import { useEffect, useState } from 'react';
import { socket } from '../../socket';

export default function AvpCar() {
    const thickness = 6;

    const [cctvAvp, setCctvAvp] = useState({position: [0,0]});

    useEffect(() => {
        function onCctvAvpEvent(data) {
          console.log('cctvAvpData on socketio event', data);
          setCctvAvp(data);
        }

        // event
        socket.on('cctvAvp', onCctvAvpEvent);
         
        return () => {
          // event off
          socket.off('cctvAvp', onCctvAvpEvent);
        }
         
      }, [cctvAvp]);

    return (
        <group name="normalCar" position={[cctvAvp.position[0], thickness / 2, cctvAvp.position[1]]}>

            <mesh>
                <cylinderGeometry args={[20, 20, 5, 15, 2]} />
                <meshStandardMaterial color={'white'} />
            </mesh>

            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[2, 20, 5, 3, 2]} />
                <meshStandardMaterial color={'yellow'} />
            </mesh>

        </group>
    )
}