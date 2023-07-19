import styled from "@emotion/native";
import { View } from "react-native";

export const FlexViewStyled = styled.View`
  display: flex;
  margin: ${(props) =>
    `-${(props.gapVertical || 0) / 2}px -${(props.gapHorizontal || 0) / 2}px`};
`;

const FlexView = (props) => {
  return (
    <FlexViewStyled {...props}>
      {Object.values(props.children || {})?.map((item, idx) => (
        <View
          key={idx}
          style={{
            marginTop: (props.gapVertical || 0) / 2,
            marginBottom: (props.gapVertical || 0) / 2,
            marginRight: (props.gapHorizontal || 0) / 2,
            marginLeft: (props.gapHorizontal || 0) / 2,
          }}
        >
          {item}
        </View>
      ))}
    </FlexViewStyled>
  );
};

export default FlexView;
