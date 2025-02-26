import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { WarehouseItem } from "@/models/WarehouseItem";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export type ProductListingProps = {
	item: WarehouseItem;
	style?: StyleProp<ViewStyle>;
};

export function ProductListing({
	item: { name, description, quantity, unitPrice },
	style,
}: ProductListingProps) {
	const theme = useColorScheme() ?? "light";

	const formatCurrency = (amount: number) => {
		return `€${parseFloat(amount.toString()).toFixed(2)}`;
	};

	return (
		<View style={[styles.container, style]}>
			<View style={styles.productInfo}>
				<ThemedText type="defaultSemiBold">{name}</ThemedText>
				<ThemedText
					type="description"
					style={styles.productDescription}
				>
					{description}
				</ThemedText>
			</View>
			<ThemedText type="defaultSemiBold" style={styles.productQuantity}>
				{quantity}x
			</ThemedText>
			<ThemedText type="defaultSemiBold" style={styles.productPrice}>
				{formatCurrency(unitPrice)}
			</ThemedText>
			<Pressable
				style={styles.addButton}
				onPress={() => {}}
				accessibilityLabel={`Add ${name} to Shipment`}
			>
				<IconSymbol
					name="addfile"
					size={16}
					color={
						theme === "light" ? Colors.light.icon : Colors.dark.icon
					}
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderBottomWidth: 1,
		borderColor: "#ddd",
	},
	productImage: {
		width: 50,
		height: 50,
		marginRight: 10,
	},
	productInfo: {
		flex: 1,
	},
	productDescription: {
		color: "#555",
	},
	productQuantity: {
		marginHorizontal: 10,
	},
	productPrice: {
		marginHorizontal: 10,
	},
	addButton: {
		backgroundColor: "#ddd",
		padding: 8,
		borderRadius: 5,
	},
});
