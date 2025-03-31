# Commit Convention
<접두사>(#<이슈번호>): <제목>
> ex) feat(#1): UI 개발

### 접두사
| 타입 | 설명 |
|:--:|--|
| feat     | 기능, 사용자 경험에 변경이 있는 경우 (모든 커밋은 기본적으로 feat)|
| refactor | 기능, 사용자 경험에 변경 없이 코드 구조를 개선한 경우 (패키지 변경, 변수명 변경, 가독성 개선 등) |
| fix      | 이슈 또는 버그 해결 |
| style    | 들여쓰기, 공백 등 코드 스타일 또는 여백/글자 크기 등 UI 요소의 변경 |
| docs     | 주석, README.md 등 문서의 변경 |
| chore    | 라이브러리 업데이트 및 기타 변경사항 |

</br>

# PR Title
<접두사>/#<이슈번호>: <제목>
> ex) Feature/#1: UI 개발

</br>

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

