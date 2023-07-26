import { Suspense, useRef, useState, useEffect } from "react";
import { View, Dimensions, Pressable, Text } from "react-native";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber/native";
import { PerspectiveCamera, useHelper } from "@react-three/drei/native";
import useControls from "r3f-native-orbitcontrols";
import { AntDesign } from "@expo/vector-icons";

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
import axios from "axios";

export default function Monit() {
  const innerHeight = Dimensions.get("window").height;
  const innerWidth = Dimensions.get("window").width;

  console.log("innerHeight : ", innerHeight);
  console.log("innerWidth : ", innerWidth);

  const [OrbitControls, events] = useControls();
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      console.log("connected to server.");
    }

    function onDisconnect() {
      console.log("disconnected from server.");
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

  const handleDataButton = () => {
    console.log("handleDataButton");
    const URL = "http://192.168.123.142:3001";

    const fetchData = async () => {
      await axios
        .post(`${URL}/sample/data`, {
          interval: 0.2,
          set: "set3",
        })
        .then(() => setHasData(true));
    };

    const stopFetchData = async () => {
      await axios.post(`${URL}/sample/stop`).then(() => setHasData(false));
    };

    try {
      if (!hasData) {
        fetchData();
      } else if (hasData) {
        stopFetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <View
        onPress={handleDataButton}
        style={{ flex: 4 }}
        className="bg-blue-200 w-24 absolute bottom-[15%] left-1/2 -translate-x-1/4"
      >
        {hasData ? (
          <AntDesign
            className="-translate-x-1/2"
            name="pausecircle"
            size={40}
            color="black`"
          />
        ) : (
          <AntDesign
            className="absolute left-1/2 translate-x-[-50%]"
            name="play"
            size={40}
            color="#2b7bb4"
          />
        )}
      </View>
    </View>
  );
}
