# neukkim-good
## 서비스 기획 의도
이 프로젝트는 신한투자증권 프로디지털아카데미 6기 과정에서 진행된 리액트 기반 미니 프로젝트입니다.
교육생 분들이 쉬는 시간에 즐겨 하시던 [사과게임](https://www.gamesaien.com/game/fruit_box_a/)을 계기로, "게임 결과를 서로 공유하고, 멀티플레이로 함께 즐길 수는 없을까?"라는 질문에서 아이디어가 시작되었습니다.

본 서비스는 사용자가 점수를 공유하고, 실시간으로 함께 플레이하며 경쟁할 수 있는 즐거운 플랫폼을 만드는 것을 목표로 합니다. 이를 통해 참여자 간의 유대감을 높이고 재미있는 경험을 제공하고자 합니다.

## 👋 introduce team member
| 이름                                        |역할  | 
| -------------------------------------------- |  ------ | 
| [여은동](https://github.com/sillonjeu)       | 로그인/회원가입, CI/CD | 
| [김민규](https://github.com/kmkkkp) | 랭킹페이지, 소켓 환경 구축 | 
| [정다영](https://github.com/Dayoung331) | 사과게임 구현(싱글, 멀티) | 
| [한정우](https://github.com/hanuuuuU) | 내기페이지, 게임 결과 공지 | 
| [황인찬](https://github.com/klklgooa) | 메인페이지, 마이페이지 | 


---

# 🛠️ Tech

## Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## Backend
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

## Socket
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

## Database
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Infrastructure
![Amazon EC2](https://img.shields.io/badge/Amazon_EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)

---

## React Project Build Instructions
1. **Clone the Repository**

   ```bash
   git clone https://github.com/neukkim-good/neukkim-client.git
   ```
2. **Navigate to the Project Directory**

   ```bash
   cd neukkim-client
   ```
3. **Install Dependencies**

   ```bash
   npm install
   ```
4. **Create an Environment File**

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_WS_URL=localhost:3002
   ```
5. **Start the Server**

   ```bash
   npm run dev
   ```

## Express Project Build Instructions
1. **Clone the Repository**

   ```bash
   git clone https://github.com/neukkim-good/neukkim-server.git
   ```
2. **Navigate to the Project Directory**

   ```bash
   cd neukkim-server
   ```
3. **Install Dependencies**

   ```bash
   npm install
   ```
4. **Create an Environment File**

   ```bash
   PW=""
   ```
5. **Start the Server**

   ```bash
   npm run start
   ```
---
# Project Introduction
## Architecture
<img width="937" alt="스크린샷 2025-07-01 오전 7 46 49" src="https://github.com/user-attachments/assets/a7161566-f277-4f16-9b6e-ec9c672efa8c" />

## 💻 demonstration video
### 메인 플로우: [시연영상](https://www.youtube.com/watch?v=rft42niRXWo) </br>
### 멀티 게임: [시연영상](https://www.youtube.com/watch?v=KJXmj76lrYI)

## ✨ Screen
| Title         | Img                                   |      
| ------------ | ---------------------------------------- | 
| 메인 스크린    | <img width="1710" alt="image" src="https://github.com/user-attachments/assets/7d59047f-b2cf-4fb3-ae69-907e35913d6d" />| 
| 싱글 플레이    | <img width="1710" alt="image" src="https://github.com/user-attachments/assets/b9eb9037-c3b4-40fd-b2d6-6541fd363f9e" />| 
| 멀티 플레이    | <img width="1710" alt="image" src="https://github.com/user-attachments/assets/bc0b17df-cadb-4fb7-a573-d2248b53e9ae" />| 
| 랭킹 스크린    | <img width="1710" alt="image" src="https://github.com/user-attachments/assets/4cac8caa-aefe-4bc7-95b3-ede33a004f31" />| 
| 공지사항(게임 결과)  | <img width="1710" alt="image" src="https://github.com/user-attachments/assets/6683cee6-cb84-46fd-bd47-419a90510fdb" />| 
| 마이페이지  | <img width="1710" alt="image" src="https://github.com/user-attachments/assets/75b816e0-7154-4902-bbd7-1f7b76387e89" />| 

---

## 🎯 Commit Convention

- feat: Add a new feature
- fix: Bug fix
- docs: Documentation updates
- style: Code formatting, missing semicolons, cases where no code change is involved
- refactor: Code refactoring
- test: Test code, adding refactoring tests
- hore: Build task updates, package manager updates

## 💡 PR Convetion

| 아이콘 | 코드                       | 설명                     |
| ------ | -------------------------- | ------------------------ |
| 🎨     | :art                       | Improving structure/format of the code   |
| ⚡️    | :zap                       | Performance improvement               |
| 🔥     | :fire                      | 	Code/file deletion          |
| 🐛     | :bug                       | Bug fix             |
| 🚑     | :ambulance                 | Critical fix|
| ✨     | :sparkles                  | New features               |
| 💄     | :lipstick                  | Adding/updating UI/style files |
| ⏪     | :rewind                    | Reverting changes     |
| 🔀     | :twisted_rightwards_arrows | Branch merging            |
| 💡     | :bulb                      | Adding/updating comments         |
| 🗃      | :card_file_box             | Database-related modifications   |
