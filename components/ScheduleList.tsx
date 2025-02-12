import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScheduleData, Member } from "../hooks/useTrainerApi";
import { Trainer } from "../hooks/useMemberApi";

interface Props {
  schedules: ScheduleData[];
  members?: Member[]; // TRAINER만 필요
  trainers?: Trainer[]; // MEMBER만 필요
  role: "TRAINER" | "MEMBER" | null; // 역할 추가
}

const ScheduleList: React.FC<Props> = ({ schedules, members = [], trainers = [], role }) => {
  const getMemberName = (memberId: number) => {
    const member = members.find((m) => m.id === memberId);
    return member?.user.name || "Unknown";
  };

  const getTrainerName = (trainerId: number) => {
    const trainer = trainers.find((t) => t.id === trainerId);
    return trainer?.user.name || "Unknown";
  };

  return schedules.length > 0 ? (
    schedules.map((item) => (
      <View key={item.id} style={styles.item}>
        {role === "TRAINER" && <Text>회원: {getMemberName(item.memberId)}</Text>}
        {role === "MEMBER" && <Text>트레이너: {getTrainerName(item.trainerId)}</Text>}
        <Text>날짜: {item.date.split("T")[0]}</Text>
        <Text>시간: {item.date.split("T")[1].split(":").slice(0, 2).join(":")}</Text>
        <Text>장소: {item.location}</Text>
        <Text>운동 부위: {item.trainingTarget}</Text>
        <Text>상태: {item.status}</Text>
      </View>
    ))
  ) : (
    <Text style={styles.noContentText}>해당 날짜에 스케줄이 없습니다.</Text>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f0f8ff",
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
  },
  noContentText: {
    fontSize: 16,
    color: "#888",
    marginVertical: 8,
  },
});

export default ScheduleList;