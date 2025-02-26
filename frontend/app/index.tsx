import { useCallback, useEffect, useState } from "react";
import {
	FlatList,
	Linking,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { WarehouseItem } from "@/models/WarehouseItem";
import { ProductListing } from "@/components/ProductListing";
import { ProductsMock } from "@/mocks/Products.mock";
import { SocialIcons } from "@/constants/SocialIcons";

export default function Index() {
	const theme = useColorScheme() ?? "light";

	const [products, setProducts] = useState<WarehouseItem[]>([]);

	const openURL = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error("An error occurred", err),
		);
	};

	const renderItem = useCallback(
		({ item }: { item: WarehouseItem }) => <ProductListing item={item} />,
		[],
	);

	useEffect(() => {
		setProducts(ProductsMock);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<ThemedText
					type="defaultSemiBold"
					style={styles.headerText}
					lightColor={Colors.light.textInverse}
					darkColor={Colors.dark.textInverse}
				>
					Welcome adventurer and Good luck, looking forward to meeting
					you!
				</ThemedText>
				<View style={styles.socialIcons}>
					{SocialIcons.map((icon) => (
						<TouchableOpacity
							key={icon.name}
							onPress={() => {
								openURL(icon.link);
							}}
						>
							<IconSymbol
								name={icon.name as IconSymbolName}
								size={18}
								weight="medium"
								color={
									theme === "light"
										? Colors.light.textInverse
										: Colors.dark.textInverse
								}
							/>
						</TouchableOpacity>
					))}
				</View>
			</View>

			<FlatList
				data={products}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	header: {
		backgroundColor: "#0A0A32",
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 4,
		alignItems: "center",
	},
	headerText: {
		flex: 1,
	},
	socialIcons: {
		flexDirection: "row",
		gap: 10,
	},
});
