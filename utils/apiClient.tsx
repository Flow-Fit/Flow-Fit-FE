const BASE_URL = "https://flowfit.kro.kr/api"; // API 기본 URL 설정

// 공통 에러 처리 함수
const handleResponse = async (response: Response) => {
  const json = await response.json();
  if (json.success != true) {
    throw new Error(json.message || "Request failed");
  }
  return json.data;
};

// 인증이 필요 없는 요청
export const fetchNoAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    return await handleResponse(response);
  } catch (error) {
    console.error("FetchNoAuth failed:", error);
    throw error;
  }
};

// 인증이 필요한 요청
export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {},
  token: string | null,
  logout: () => Promise<void>
) => {
  if (!token) {
    console.warn("Token is missing, logging out...");
    await logout();
    throw new Error("No token provided");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      console.warn("Unauthorized, logging out...");
      await logout();
      throw new Error("Unauthorized: Token expired or invalid");
    }

    return await handleResponse(response);
  } catch (error) {
    console.error("FetchWithAuth failed:", error);
    throw error;
  }
};
