import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Button, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTrainerApi } from "../../hooks/useTrainerApi";
import { useAuth } from "../../hooks/useAuth";
import ScheduleList from "../../components/ScheduleList";
import AddScheduleModal from "../../components/AddScheduleModal";

export default function ScheduleScreen() {
  const { token, role, logout } = useAuth();
  const { members,schedule, details, fetchScheduleData,fetchMembers , addSchedule } = useTrainerApi(token, logout);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [trainingTarget, setTrainingTarget] = useState("");
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      fetchMembers();
      fetchScheduleData();
    }
  }, [token]);

  const handleDayPress = (day: { dateString: string }) => setSelectedDate(day.dateString);

  const handleAddSchedule = () => {
    if (!selectedDate || !location || !time || !trainingTarget || selectedMember === null) {
      return;
    }
    console.log(selectedDate, time)
    const newSchedule = {
      memberId: selectedMember,
      date: `${selectedDate}T${time}:00`,
      location,
      trainingTarget,
    };
    addSchedule(newSchedule);
    setModalVisible(false);
    setLocation("");
    setTime("");
    setTrainingTarget("");
    setSelectedMember(null);
  };

  return (
    <View style={styles.container}>
      {token ? (
        <>
          <Calendar markedDates={schedule} onDayPress={handleDayPress} />
          <ScrollView>
            <ScheduleList schedules={details.filter((s) => s.date.startsWith(selectedDate))}  members={ members } trainers={ undefined } role = {role}/>
          </ScrollView>
          <Button title="새 스케줄 추가" onPress={() => setModalVisible(true)} />
          <AddScheduleModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAdd={handleAddSchedule}
            location={location}
            setLocation={setLocation}
            time={time}
            setTime={setTime}
            trainingTarget={trainingTarget}
            setTrainingTarget={setTrainingTarget}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            members={members}
            selectedDate={selectedDate}
          />
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});