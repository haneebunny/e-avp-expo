import { Suspense, useRef, useState, useEffect } from "react";
import { View, Dimensions, Pressable, Text } from "react-native";
import axios from "axios";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber/native";
import { PerspectiveCamera, useHelper } from "@react-three/drei/native";
import useControls from "r3f-native-orbitcontrols";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { formatTime } from "../../src/common/api/function";

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
import { socket, URL } from "../../src/socket";

export default function Monit() {
  const innerHeight = Dimensions.get("window").height;
  const innerWidth = Dimensions.get("window").width;

  // console.log("innerHeight : ", innerHeight);
  // console.log("innerWidth : ", innerWidth);

  const [OrbitControls, events] = useControls();

  // hasData : 데이터 받는 중
  const [hasData, setHasData] = useState(false);

  // 데이터 전송 타이머
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  // socket
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

  // timer
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    return () => {
      stopFetchData();
    };
  }, []);

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

  const handleDataButton = () => {
    console.log("handleDataButton");

    setIsRunning((prev) => !prev);
    setTime(0);

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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4 }} {...events}>
        <Canvas
          dpr={[1, 1]} // Pixel-ratio
          camera={{
            position: [0, 1000, -settings.zGridCnt / 2],
            fov: 85,
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
            maxPolarAngle={Math.PI / 2}
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

          <Suspense fallback={null}>
            <AvpCar />
          </Suspense>
          <Suspense fallback={null}>
            <Car />
          </Suspense>
        </Canvas>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }} className="self-center gap-y-1">
          <Text className="text-lg text-gray-400 tracking-widest">
            {formatTime(time)}
          </Text>
          <Pressable onPress={handleDataButton} className="self-center">
            {hasData ? (
              <FontAwesome name="stop-circle" size={45} color="#424242" />
            ) : (
              <>
                <FontAwesome name="play-circle" size={45} color="#424242" />
              </>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
