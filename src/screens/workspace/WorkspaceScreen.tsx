import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider, Appbar, Button, IconButton, TextInput } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import ThemedText from "../../shared/components/ThemedText";
import { useState } from "react";
import { RootNavigationProp } from "../../types/types";

const WorkspaceScreen = () => {
    const drawerNavigation = useNavigation<DrawerNavigationProp<any>>();
    const navigation = useNavigation<RootNavigationProp<'Workspace'>>();

    const mockWorkspaceBoards = [
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
        },
        {
            id: 2,
            created_at: '2025-05-10T09:15:00.000000Z',
            updated_at: '2025-05-10T09:30:00.000000Z',
            is_deleted: 0,
            name: 'Product Development',
            background_color: '#e74c3c',  // Red color for the second board
            workspace_id: 2,
            workspace: {
                id: 2,
                name: 'Engineering Team',
                description: 'Workspace for the engineering team',
            },
        },
    ];

    const styles = StyleSheet.create({
        boardContainer: {
            padding: 10,
            margin: 16,
            backgroundColor: mockWorkspaceBoards[0].background_color,
            overflow: 'hidden',
            borderRadius: 16
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
        createTableBtn: {
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

    const [cardContent, setCardContent] = useState('');

    return (
        <>
            <ThemedView style={{ flex: 1 }}>

                <Appbar.Header style={{ alignItems: 'center' }}>
                    <Appbar.Action
                        icon="menu"
                        onPress={() => drawerNavigation.openDrawer()}
                    />
                    <Appbar.Content title="Your Workspace" />
                    <Appbar.Action icon="magnify" />
                    <Appbar.Action icon="bell" />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar.Header>

                <ThemedView style={{ width: "100%", height: '100%' }}>
                    <ThemedView style={styles.boardContainer}>
                        <ThemedView style={styles.board}>
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View>
                                    <ThemedText style={{ fontWeight: 'bold' }}>
                                        Board name
                                    </ThemedText>
                                    <ThemedText>
                                        Card name
                                    </ThemedText>
                                </View>


                                <IconButton
                                    icon='pencil'
                                    size={24}
                                    onPress={() => console.log('Pressed')}
                                    accessibilityLabel="Avatar button"
                                />
                            </View>
                            <ThemedView style={styles.transparent}>
                                <TextInput
                                    placeholder="Thêm thẻ"
                                    outlineStyle={{ borderRadius: 10, overflow: 'hidden', ...styles.removeBorder }}
                                    mode="outlined"
                                    value={cardContent}
                                    onChangeText={setCardContent}
                                    right={
                                        cardContent ? <TextInput.Icon icon="check" onPress={() => console.log('check clicked')} /> : null
                                    }
                                >

                                </TextInput>
                            </ThemedView>

                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={{ backgroundColor: 'black', padding: 16, display: 'flex', alignItems: 'flex-start' }}>
                        <ThemedText>
                            Không gian làm việc của Nguyễn Minh Sơn
                        </ThemedText>
                    </ThemedView>

                    {
                        mockWorkspaceBoards && mockWorkspaceBoards.length > 0 &&
                        mockWorkspaceBoards.map(workspace => {
                            return (
                                <ThemedView key={workspace.id} style={{ display: 'flex', gap: 20, alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                                    <ThemedView style={{ backgroundColor: workspace.background_color, borderRadius: 3, overflow: 'hidden', width: 60, height: 40 }}>

                                    </ThemedView>
                                    <ThemedText>
                                        {workspace.name}
                                    </ThemedText>
                                </ThemedView>
                            )
                        })
                    }
                </ThemedView>

                <Button icon="plus" mode="contained" style={styles.createTableBtn} onPress={() => navigation.navigate('CreateBoard')}>
                    Tạo bảng
                </Button>
            </ThemedView>
        </>

    )
};

export default WorkspaceScreen;