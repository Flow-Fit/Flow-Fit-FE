import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Member } from "../hooks/useTrainerApi";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
  location: string;
  setLocation: (value: string) => void;
  time: string;
  setTime: (value: string) => void;
  trainingTarget: string;
  setTrainingTarget: (value: string) => void;
  selectedMember: number | null;
  setSelectedMember: (value: number | null) => void;
  members: Member[];
  selectedDate: string;
}

const AddScheduleModal: React.FC<Props> = ({
  visible,
  onClose,
  onAdd,
  location,
  setLocation,
  time,
  setTime,
  trainingTarget,
  setTrainingTarget,
  selectedMember,
  setSelectedMember,
  members,
  selectedDate,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>새 스케줄 추가</Text>
          <Text style={styles.modalLabel}>날짜: {selectedDate}</Text>
          <TextInput
            style={styles.input}
            placeholder="장소를 입력하세요"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="시간을 HH:MM 형식으로 입력하세요"
            value={time}
            onChangeText={setTime}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="훈련 목표를 입력하세요"
            value={trainingTarget}
            onChangeText={setTrainingTarget}
          />
          <Picker
            selectedValue={selectedMember}
            onValueChange={(itemValue) => setSelectedMember(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="멤버를 선택하세요" value={null} />
            {members.map((member) => (
              <Picker.Item
                key={member.id}
                label={member.user.name}
                value={member.id}
              />
            ))}
          </Picker>
          <Button title="추가" onPress={onAdd} />
          <Button title="취소" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
});

export default AddScheduleModal;