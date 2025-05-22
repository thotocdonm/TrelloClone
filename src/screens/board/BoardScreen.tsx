import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, View,Pressable } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider, Appbar, Button, IconButton, TextInput } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import ThemedText from "../../shared/components/ThemedText";
import { useState } from "react";
import { RootNavigationProp } from "../../types/types";
import { ScrollView } from "react-native-gesture-handler";

const BoardScreen = () => {
    const drawerNavigation = useNavigation<DrawerNavigationProp<any>>();
    const navigation = useNavigation<RootNavigationProp<'Workspace'>>();

    const mockWorkspaceBoard =
    {
        id: 1,
        created_at: '2025-05-09T14:30:00.000000Z',
        updated_at: '2025-05-09T14:45:00.000000Z',
        is_deleted: 0,
        name: 'Project Alpha',
        background_color: '#3498db',  // Trello Blue
        workspace_id: 1,
        workspace: {
            id: 1,
            name: 'Marketing Team',
            description: 'Workspace for the marketing team',
        },
    }

    const mockLists = [
        {
            id: 1,
            name: 'To Do',
            board_id: 1,
            created_at: '2025-05-09T14:30:00.000Z',
            updated_at: '2025-05-09T14:45:00.000Z',
            is_deleted: false,
        },
        {
            id: 2,
            name: 'In Progress',
            board_id: 1,
            created_at: '2025-05-09T15:00:00.000Z',
            updated_at: '2025-05-09T15:10:00.000Z',
            is_deleted: false,
        },
        {
            id: 3,
            name: 'Done',
            board_id: 1,
            created_at: '2025-05-09T15:30:00.000Z',
            updated_at: '2025-05-09T15:45:00.000Z',
            is_deleted: false,
        },
    ];

    const mockCards = [
        {
            id: 1,
            name: 'To Do',
            created_at: '2025-05-09T14:30:00.000Z',
            updated_at: '2025-05-09T14:45:00.000Z',
            is_deleted: false,
        },
        {
            id: 2,
            name: 'In Progress',
            created_at: '2025-05-09T15:00:00.000Z',
            updated_at: '2025-05-09T15:10:00.000Z',
            is_deleted: false,
        },
        {
            id: 3,
            name: 'Done',
            created_at: '2025-05-09T15:30:00.000Z',
            updated_at: '2025-05-09T15:45:00.000Z',
            is_deleted: false,
        },
    ];




    const styles = StyleSheet.create({
        container: {
            backgroundColor: mockWorkspaceBoard.background_color,
            overflow: 'hidden',
            width: '100%',
            // height: '100%',
            flex: 1
        },
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
        zoomControls: {
            position: 'absolute',
            bottom: 50, // space from the bottom
            right: 20,   // space from the left
            zIndex: 1000, // optional: ensures it's above other content
            backgroundColor: "#42f57b",
            height: 70,
            width: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            elevation: 5
        },
        list: {
            backgroundColor: 'rgba(0,0,0,1)',
            borderRadius: 8,
            padding: 15,
            paddingBottom: 70,
            width: 250,
            flexShrink: 0,
            position: 'relative'
        },
        card: {
            backgroundColor: 'rgb(68, 64, 64)',
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
            width: '100%',
        },
        addCardBtn: {
            position: 'absolute',
            left: 0,
            bottom: 10
        }

    });

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
    const handlePress = (cardName:string) =>{
        navigation.navigate("CardDetail",{name:cardName});
    }

    return (
        <>
            <ThemedView style={{ flex: 1 }}>

                <Appbar.Header style={{ alignItems: 'center', backgroundColor: darkenColor(mockWorkspaceBoard.background_color) }}>
                    <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
                    <Appbar.Content title={mockWorkspaceBoard.name} />
                    <Appbar.Action icon="magnify" />
                    <Appbar.Action icon="bell" />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar.Header>

                <ThemedView style={[styles.container]}>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ gap: 12, padding: 10, alignItems: 'flex-start' }} // for spacing between lists
                        showsHorizontalScrollIndicator={false}
                    >
                        {mockLists.map(list => (
                            <View
                                key={list.id}
                                style={styles.list}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: 'white' }}>{list.name}</Text>
                                {
                                    mockCards.map(card => (
                                        <Pressable key={card.id} onPress={()=>handlePress(card.name)}>
                                            <View
                                                
                                                style={styles.card}
                                            >
                                                <Text style={{ fontSize: 12, marginBottom: 8, color: 'white' }}>{card.name}</Text>
                                            </View>
                                        </Pressable>
                                    ))
                                }
                                <Button mode="text" icon="plus" style={styles.addCardBtn}>
                                    Thêm thẻ
                                </Button>
                            </View>
                        ))}
                    </ScrollView>
                </ThemedView>
                {
                    <IconButton
                        icon={isZoomOut ? "magnify-plus-outline" : "magnify-minus-outline"}
                        size={35}
                        mode="contained-tonal"
                        onPress={isZoomOut ? zoomIn : zoomOut}
                        style={styles.zoomControls}
                        iconColor="black"
                    />
                }


            </ThemedView>
        </>

    )
};

export default BoardScreen;