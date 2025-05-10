import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider, Appbar, Button, IconButton, TextInput } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import ThemedText from "../../shared/components/ThemedText";
import { useState } from "react";

const CreateBoardScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<any>>();



    const styles = StyleSheet.create({
        board: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 10,
            overflow: "hidden",
            padding: 10
        },
        removeBorder: {
            borderWidth: 0,
            borderColor: 'transparent',
            elevation: 0, // Android shadow
            shadowColor: 'transparent', // iOS shadow
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
        },
        transparent: {
            backgroundColor: 'transparent',
        },
        createBoardBtn: {
            position: 'absolute',
            bottom: 50, // space from the bottom
            right: 20,   // space from the left
            zIndex: 1000, // optional: ensures it's above other content
            backgroundColor: "#a28ff5",
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16
        },

    });


    return (
        <ThemedView style={{ flex: 1 }}>
            <Appbar.Header style={{ alignItems: 'center' }}>
                <Appbar.Action
                    icon="close"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content title="Tạo bảng" />
            </Appbar.Header>
        </ThemedView>
    )
};

export default CreateBoardScreen;