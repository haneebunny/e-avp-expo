import { Suspense, useRef, useState, useEffect } from "react";
import { View, Dimensions } from "react-native";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber/native";
import { PerspectiveCamera, useHelper } from "@react-three/drei/native";
import useControls from "r3f-native-orbitcontrols";

// parking lot config
import settings from "../../config/parkingLot/settings";

// parking lot components
import Gate from "../../src/components/parkingLot/Gate";
import Floor from "../../src/components/parkingLot/Floor";
import Wall from "../../src/components/parkingLot/Wall";
import ParkingArea from "../../src/components/parkingLot/ParkingArea";
import ParkingSections from "../../src/components/parkingLot/ParkingSesctions";
import Car from "../../src/components/parkingLot/Car";
import AvpCar from "../../src/components/parkingLot/AvpCar";

// socket io
import { socket } from "../../src/socket";

export default function Monit() {
  const innerHeight = Dimensions.get("window").height;
  const innerWidth = Dimensions.get("window").width;

  console.log("innerHeight : ", innerHeight);
  console.log("innerWidth : ", innerWidth);

  const [OrbitControls, events] = useControls();

  useEffect(() => {
    socket.connect();

    function onConnect() {
      console.log("connected to server.");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected from server.");
      setIsConnected(false);
    }

    function onError(error) {
      console.log("error occured on socket.io connection", error);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("error", onError);

      socket.disconnect();
    };
  }, []);

  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas
        dpr={[1, 1]}
        camera={{
          position: [0, 1000, -settings.zGridCnt / 2],
          fov: 75,
          near: 0.1,
          far: 3000,
          aspect: innerWidth / innerHeight,
        }}
      >
        <OrbitControls
          dampingFactor={1}
          target={
            new THREE.Vector3(settings.xGridCnt / 2, 0, settings.zGridCnt / 2)
          }
        />

        <axesHelper args={[200]} />
        <ambientLight intensity={1} />
        <directionalLight
          position={[settings.xGridCnt / 2, 500, settings.zGridCnt / 2]}
        />
        <Floor />
        <Wall />
        <ParkingArea />
        <ParkingSections />
        <Suspense fallback={null}>
          <Gate />
        </Suspense>

        {/* <Car /> */}
        <Suspense fallback={null}>
          <AvpCar />
        </Suspense>
        <Suspense fallback={null}>
          <Car />
        </Suspense>
      </Canvas>
    </View>
  );
}
