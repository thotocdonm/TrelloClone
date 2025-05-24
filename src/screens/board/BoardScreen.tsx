import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider, Appbar, Button, IconButton, TextInput } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import ThemedText from "../../shared/components/ThemedText";
import { useEffect, useRef, useState } from "react";
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
            position: 'relative',
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
        },

    });

    const [cardContent, setCardContent] = useState('');


    const [scale, setScale] = useState(1);
    const [isZoomOut, setIsZoomOut] = useState(false);
    const [isAddList, setIsAddList] = useState(false);
    const [listName, setListName] = useState('');
    const [cardName, setCardName] = useState('');
    const [addingCardListId, setAddingCardListId] = useState<number | null>(null);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const scrollViewRef = useRef<ScrollView>(null); // Create ref for ScrollView
    const [scrollOffset, setScrollOffset] = useState(0); // Store scroll position

    const handleFocus = () => {
        setScrollEnabled(false);
        // Save current scroll position
        //@ts-ignore
        scrollViewRef.current?.getScrollResponder()?.scrollTo({ x: scrollOffset, animated: false });
    };

    const handleBlurList = () => {
        setScrollEnabled(true);
        setIsAddList(false);
        setListName('');
    };

    const handleBlurCard = () => {
        setScrollEnabled(true);
        setAddingCardListId(null);
        setCardName('');
    };

    const handleScroll = (event: any) => {
        setScrollOffset(event.nativeEvent.contentOffset.x); // Update scroll position on scroll
    };

    const handleAddList = (data: string) => {
        if (data.trim()) {
            console.log("Adding list:", data);
            setListName('');
            setIsAddList(false);
        }
    };

    const handleAddCard = (data: string, listId: number) => {
        if (data.trim()) {
            console.log(`Adding card to list ${listId}:`, data);
            setCardName('');
            setAddingCardListId(null);
        }
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
    const handlePress = (cardName: string) => {
        navigation.navigate("CardDetail", { name: cardName });
    }


    return (
        <ThemedView style={{ flex: 1 }}>
            <Appbar.Header style={{ alignItems: 'center', backgroundColor: darkenColor(mockWorkspaceBoard.background_color) }}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
                <Appbar.Content title={mockWorkspaceBoard.name} />
                <Appbar.Action icon="magnify" />
                <Appbar.Action icon="bell" />
                <Appbar.Action icon="dots-vertical" />
            </Appbar.Header>

            <ThemedView style={[styles.container]}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        contentContainerStyle={{ gap: 12, padding: 10, alignItems: 'flex-start' }}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={scrollEnabled}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >
                        {mockLists.map(list => (
                            <View key={list.id} style={styles.list}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}>{list.name}</Text>

                                {/* Cards inside this list */}
                                {mockCards.map(card => (
                                    <View key={card.id} style={styles.card}>
                                        <Text
                                            style={{ fontSize: 12, marginBottom: 8, color: 'white' }}
                                            onPress={() => handlePress(card.name)}
                                        >
                                            {card.name}
                                        </Text>
                                    </View>
                                ))}

                                {/* Add Card Input */}
                                {addingCardListId === list.id ? (
                                    <TextInput
                                        label="Tên Thẻ"
                                        mode="flat"
                                        style={{ backgroundColor: 'transparent' }}
                                        value={cardName}
                                        onChangeText={setCardName}
                                        onBlur={handleBlurCard}
                                        onFocus={handleFocus}
                                        autoFocus={true}
                                        onSubmitEditing={() => handleAddCard(cardName, list.id)}
                                        right={<TextInput.Icon icon="check" onPress={() => handleAddCard(cardName, list.id)} />}
                                    />
                                ) : (
                                    <Button mode="text" icon="plus" style={styles.addCardBtn} onPress={() => setAddingCardListId(list.id)}>
                                        Thêm thẻ
                                    </Button>
                                )}
                            </View>
                        ))}

                        {/* Add List Button or Input */}
                        <View style={{ ...styles.list, paddingBottom: 0, padding: 0 }}>
                            {isAddList ? (
                                <TextInput
                                    label="Tên danh sách"
                                    mode="flat"
                                    style={{ backgroundColor: 'transparent' }}
                                    value={listName}
                                    onChangeText={setListName}
                                    onBlur={handleBlurList}
                                    onFocus={handleFocus}
                                    autoFocus={true}
                                    onSubmitEditing={() => handleAddList(listName)}
                                    right={<TextInput.Icon icon="check" onPress={() => handleAddList(listName)} />}
                                />
                            ) : (
                                <Button mode="text" icon="plus" onPress={() => setIsAddList(true)}>
                                    Thêm danh sách
                                </Button>
                            )}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ThemedView>
            <IconButton
                icon={isZoomOut ? 'magnify-plus-outline' : 'magnify-minus-outline'}
                size={35}
                mode="contained-tonal"
                style={styles.zoomControls}
                iconColor="black"
            />
        </ThemedView>
    );
};

export default BoardScreen;