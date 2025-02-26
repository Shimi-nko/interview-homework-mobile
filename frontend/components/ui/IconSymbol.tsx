import React from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";
import { SymbolWeight } from "expo-symbols";
import AntDesign from "@expo/vector-icons/AntDesign";

export type IconSymbolName = React.ComponentProps<typeof AntDesign>["name"];

export function IconSymbol({
	name,
	size = 24,
	color,
	style,
}: {
	name: IconSymbolName;
	size?: number;
	color: string | OpaqueColorValue;
	style?: StyleProp<TextStyle>;
	weight?: SymbolWeight;
}) {
	return <AntDesign color={color} size={size} name={name} style={style} />;
}
