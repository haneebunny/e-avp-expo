import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { normalCarPositionsState } from "../../common/store/atom";
import { socket } from "../../socket";

export default function Car() {
  const [normalÇarPositions, setNormalCarPositions] = useRecoilState(
    normalCarPositionsState
  );

  useEffect(() => {
    function onCctvMonitEvent(data) {
      console.log("cctvMonit on socketio event", data);
      setNormalCarPositions(data["car-coordinate"]);
    }

    // event
    socket.on("cctvMonit", onCctvMonitEvent);

    return () => {
      // event off
      socket.off("cctvMonit", onCctvMonitEvent);
    };
  }, []);

  return (
    <>
      {normalÇarPositions?.map((position, index) => (
        <NormalCarGroup key={index} position={position} />
      ))}
    </>
  );
}

function NormalCarGroup({ position }) {
  const thickness = 6;

  return (
    <group
      name="normalCar"
      position={[position[0], thickness / 2, position[1]]}
    >
      <mesh>
        <cylinderGeometry args={[20, 20, 5, 15, 2]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>

      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[2, 20, 5, 3, 2]} />
        <meshStandardMaterial color={"cyan"} />
      </mesh>
    </group>
  );
}
