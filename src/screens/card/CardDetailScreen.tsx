import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider, Appbar, Button, IconButton, TextInput,Icon } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import ThemedText from "../../shared/components/ThemedText";
import { useState } from "react";
import { RootNavigationProp,RootRouteProp } from "../../types/types";
import { ScrollView } from "react-native-gesture-handler";

const CardDetailScreen = () => {
    const drawerNavigation = useNavigation<DrawerNavigationProp<any>>();
    const navigation = useNavigation<RootNavigationProp<'CardDetail'>>();
    const param = useRoute<RootRouteProp<"CardDetail">>()
    const {name} = param.params;
    

    

    const [cardContent, setCardContent] = useState('');


    const [scale, setScale] = useState(1);
    const [isZoomOut, setIsZoomOut] = useState(false);

    const zoomIn = () => {
        setScale(prev => {
            const newScale = Math.min(prev + 0.1, 2); // max 2x
            if (newScale === 2) setIsZoomOut(true); // If zoom is maxed out, show zoom-out button
            return newScale;
        });
    };

    const zoomOut = () => {
        setScale(prev => {
            const newScale = Math.max(prev - 0.1, 0.5); // min 0.5x
            if (newScale === 0.5) setIsZoomOut(false); // If zoom is min, show zoom-in button
            return newScale;
        });
    };

    const darkenColor = (hex: any, amount = 80) => {
        let color = hex.replace('#', '');
        if (color.length === 3) {
            color = color.split('').map((c: any) => c + c).join('');
        }
        const num = parseInt(color, 16);
        let r = Math.max((num >> 16) - amount, 0);
        let g = Math.max(((num >> 8) & 0x00FF) - amount, 0);
        let b = Math.max((num & 0x0000FF) - amount, 0);
        return `rgb(${r}, ${g}, ${b})`;
    };


    return (
        <>
            <ThemedView style={{ flex: 1 }}>
                <Appbar.Header style={{ alignItems: 'center' }}>
                    <Appbar.Action
                        icon="close"
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content title={name} />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar.Header>

                <View style={style.container}>
                    <View style={style.child}>
                        <Icon source="format-align-left" size={20} />
                        <TextInput style={style.txtInput}
                        contentStyle={{
                            paddingVertical: 0,
                            paddingHorizontal: 8,
                        }}
                        mode="flat"/>
                    </View>
                </View>
                <View style={style.container}>
                    <View style={style.child}>
                        <Icon source="label" size={20} />
                        <TextInput style={style.txtInput}
                        contentStyle={{
                            paddingVertical: 0,
                            paddingHorizontal: 8,
                        }}
                        mode="flat"/>
                    </View>
                </View>
            </ThemedView>
        </>

    )
};

export default CardDetailScreen;

const style=StyleSheet.create(
    {
        container:{
            backgroundColor: "#2b2b2b",
            borderWidth: 1,
            borderColor: "gray",
            height: 100,
            marginTop: 30,
        },
        child:{
            justifyContent: "space-between",
            alignItems: "center",
            height: "80%", 
            width: "90%" ,
            flexDirection:"row",
        },
        txtInput:{
            backgroundColor: "#2b2b2b",
            height: 36, 
            width: "80%",
        }
    }
)