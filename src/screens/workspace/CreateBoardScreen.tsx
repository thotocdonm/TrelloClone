import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Provider as PaperProvider, Appbar, Button, IconButton, TextInput, Portal, Modal } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import ThemedText from "../../shared/components/ThemedText";
import { useState } from "react";
import { Dropdown } from "react-native-paper-dropdown";
import ColorPicker from "react-native-wheel-color-picker";

const CreateBoardScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<any>>();



    const screenWidth = Dimensions.get('window').width;
    const modalWidth = screenWidth * 0.8;

    const styles = StyleSheet.create({
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
        colorBox: {
            width: 40,
            height: 40,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#ccc'
        },
        colorPickerModal: {
            backgroundColor: '1E1E1E',
            padding: 20,
            width: modalWidth,     // 90% of screen width
            alignSelf: 'center',    // center the modal
            borderRadius: 10,
            position: 'relative'
        },
        addBtn: {
            width: screenWidth * 0.9,
            borderRadius: 2,
            height: 50,
            position: 'absolute',
            bottom: 30,
            right: 16,
            left: 16,
            justifyContent: 'center',
            alignItems: 'center',
        }

    });

    const OPTIONS = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ];

    const [visible, setVisible] = useState(false);
    const [boardName, setBoardName] = useState('');
    const [workspace, setWorkspace] = useState<string | undefined>(OPTIONS[0].value);
    const [backgroundColor, setBackgroundColor] = useState('#0079BF');

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    return (
        <ThemedView style={{ flex: 1 }}>
            <Appbar.Header style={{ alignItems: 'center' }}>
                <Appbar.Action
                    icon="close"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content title="Tạo bảng" />
            </Appbar.Header>

            <ThemedView style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingHorizontal: 16, paddingVertical: 10 }}>
                <TextInput mode="flat" label={'Tên bảng'} value={boardName} onChangeText={setBoardName} style={{ width: '100%' }} />
                <Dropdown
                    mode="outlined"
                    label="Không gian làm việc"
                    placeholder="Select Gender"
                    options={OPTIONS}
                    value={workspace}
                    onSelect={setWorkspace}
                />

                <ThemedView style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <ThemedText>
                        Phông nền bảng
                    </ThemedText>
                    <TouchableOpacity
                        style={[styles.colorBox, styles.removeBorder, { backgroundColor: backgroundColor }]}
                        onPress={() => setVisible(true)}
                    />
                </ThemedView>
            </ThemedView>

            <Button style={styles.addBtn} mode="contained" disabled={boardName.length > 0 ? false : true}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Tạo bảng</Text>
            </Button>


            {/* color picker modal */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[styles.colorPickerModal, styles.removeBorder]}>
                    <View style={{ height: 300 }}>
                        <ColorPicker
                            color={backgroundColor}
                            onColorChange={setBackgroundColor}

                        />
                    </View>
                </Modal>
            </Portal>



        </ThemedView>
    )
};

export default CreateBoardScreen;