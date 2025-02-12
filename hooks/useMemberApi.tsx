import { useState } from "react";
import { Alert } from "react-native";
import { fetchWithAuth } from "../utils/apiClient";

export interface ScheduleData {
  id: number;
  date: string; // ISO 8601 형식
  location: string;
  trainingTarget: string;
  status: string;
  memberId: number;
  trainerId: number;
}

export interface Trainer {
  id: number;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

export const useMemberApi = (token: string | null, logout: () => Promise<void>) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [schedule, setSchedule] = useState<Record<string, { marked: boolean; dotColor: string }>>({});
  const [details, setDetails] = useState<ScheduleData[]>([]);
  
  const fetchTrainers = async () => {
    try {
      const response = await fetchWithAuth(
        "/trainer/trainers",
        {},
        token,
        logout
      );
      
      setTrainers(response.trainers|| []);
    } catch (error) {
      console.error("Failed to fetch trainers:", error);
      Alert.alert("오류", "멤버 데이터를 가져오는데 실패했습니다.");
    }
  };

  const fetchScheduleData = async () => {
    try {
      const response: ScheduleData[] = await fetchWithAuth(
        "/member/schedules?month=2025-01",
        {},
        token,
        logout
      );

      const markedDates: Record<string, { marked: boolean; dotColor: string }> = {};
      
      response.forEach((item) => {
        if (item.date) {
          const date = item.date.split("T")[0];
          markedDates[date] = { marked: true, dotColor: "blue" };
        }
      });

      setSchedule(markedDates);
      setDetails(response);

    } catch (error) {
      console.error("Failed to fetch schedule data:", error);
      Alert.alert("오류", "스케줄 데이터를 가져오는데 실패했습니다.");
    }
  };

  return { trainers, schedule, details, fetchTrainers ,fetchScheduleData};
};