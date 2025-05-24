import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Appbar, IconButton, TextInput, Icon } from 'react-native-paper';
import ThemedView from "../../shared/components/ThemedView";
import { useState } from "react";
import { RootNavigationProp, RootRouteProp } from "../../types/types";
import { ScrollView } from "react-native-gesture-handler";
import { DatePickerInput } from 'react-native-paper-dates';

const CardDetailScreen = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const navigation = useNavigation<RootNavigationProp<'CardDetail'>>();
  const param = useRoute<RootRouteProp<"CardDetail">>();
  const { name } = param.params;

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#1c1c1e" }}>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
        <Appbar.Content title={name} />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardRow}>
          <Icon source="format-align-left" size={20} />
          <TextInput
            style={styles.txtInput}
            mode="flat"
            label="Thêm mô tả thẻ"
            underlineColor="transparent"
          />
        </View>

        <View style={styles.cardRow}>
          <Icon source="label-percent-outline" size={20} />
          <Text style={styles.label}>Nhãn</Text>
        </View>

        <View style={styles.cardRow}>
          <Icon source="account" size={20} />
          <Text style={styles.label}>Thành viên</Text>
        </View>

        <View style={[styles.cardRow, { flexDirection: 'column', alignItems: 'flex-start', gap: 20 }]}>
          <View style={styles.dateSection}>
            <Icon source="clock" size={20} />
            <View>
              <Text style={styles.label}>Ngày bắt đầu</Text>
              <DatePickerInput
                locale="en"
                label="Start"
                value={startDate}
                onChange={(d) => setStartDate(d)}
                inputMode="start"
                style={styles.dateInput}
              />
            </View>
          </View>

          <View style={styles.dateSection}>
            <Icon source="clock" size={20} />
            <View>
              <Text style={styles.label}>Ngày kết thúc</Text>
              <DatePickerInput
                locale="en"
                label="End"
                value={endDate}
                onChange={(d) => setEndDate(d)}
                inputMode="end"
                style={styles.dateInput}
              />
            </View>
          </View>
        </View>

        <View style={styles.cardRow}>
          <Icon source="file" size={20} />
          <Text style={styles.label}>Các tập tin đính kèm</Text>
          <IconButton icon="plus" size={20} style={styles.iconRight} onPress={() => { }} />
        </View>

        <View style={styles.cardRow}>
          <Icon source="sticker-check-outline" size={20} />
          <Text style={styles.label}>Danh sách các công việc</Text>
          <IconButton icon="plus" size={20} style={styles.iconRight} onPress={() => { }} />
        </View>

        <View style={[styles.cardRow,{backgroundColor:"transparent", borderWidth: 0}]}>
          <Text style={styles.label}>Hoạt động</Text>
          <IconButton icon="dots-vertical" size={20} style={[styles.iconRight,{backgroundColor:"transparent"}]} onPress={() => { }} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Comment Box */}
      <View style={styles.commentContainer}>
        <Icon source="sticker-check-outline" size={20} />
        <TextInput
          style={styles.commentInput}
          mode="outlined"
          label="Thêm nhận xét"
          placeholder="Type something"
        />
        <IconButton icon="file-upload" size={20} style={styles.iconRight} onPress={() => { }} />
      </View>
    </ThemedView>
  );
};

export default CardDetailScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    paddingBottom: 100, 
  },
  cardRow: {
    backgroundColor: "#2b2b2b",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  txtInput: {
    flex: 1,
    backgroundColor: "#2b2b2b",
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateInput: {
    backgroundColor: "#2b2b2b",
    height: 36,
    width: 200,
  },
  iconRight: {
    backgroundColor: "#2b2b2b",
    marginLeft: "auto",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2b2b2b",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    gap: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#1c1c1e",
    borderRadius: 20,
  },
});
