import { useLayoutEffect, useState } from "react";
import { View, Button, Text, Image } from "react-native";

import { Stack } from "expo-router";

function LogoTitle() {
  return <Image style={{ width: 50, height: 50 }} />;
}

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => setCount((c) => c + 1)}
              title="Update count"
            />
          ),
        }}
      />
      <Text>Count: {count}</Text>
    </>
  );
}
