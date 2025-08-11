// src/data/personas.ts
export interface Persona {
  type: string;
  name: string;
  age: string;
  job: string;
  features: string;
  runningExp: string;
  motivation: string;
  painPoint: string;
  goal: string;
  campaignGoal: string;
  lifestyle: string;
  products: string;
  groupJoin: string;
}

export const personas: Persona[] = [
  {
    type: "1. 일상 탈출형",
    name: "이서아",
    age: "21세",
    job: "대학생 (디자인 전공)",
    features:
      "시험과 과제에 지쳐, 뻔한 카페 투어 대신 새로운 주말 활동을 찾아다니는 대학생.",
    runningExp: "1개월 (친구 따라 몇 번)",
    motivation:
      "매주 똑같은 데이트는 지겨워요. 남자친구랑 같이 미션을 깨는 것처럼 도시를 탐험하면 재밌을 것 같아요.",
    painPoint:
      "반복되는 데이트 코스가 지루하고, 함께 즐길 만한 새롭고 의미 있는 활동을 찾는 데 어려움을 느낌. 금전적 부담이 적은 활동 선호.",
    goal: "친구/연인과 함께 즐기는 게임 같은 경험을 통해 일상의 활력을 얻고 특별한 추억을 만드는 것.",
    campaignGoal:
      "주말 동안 남자친구와 함께 모든 QR 코스를 완주하고, 인스타 스토리에 '이번 주말 데이트도 성공적'이라고 올리기.",
    lifestyle:
      "주 1-2회 카페 탐방, 넷플릭스 몰아보기. 모바일 방탈출, 숨은그림찾기 게임 좋아함.",
    products:
      "커플로 신기 좋은 HARO '데일리 컴포트' 러닝화, 디자인이 예쁜 반팔 티셔츠.",
    groupJoin: "Yes (커플 참여)",
  },
  {
    type: "2. 가족 활동형",
    name: "박지혜",
    age: "42세",
    job: "전업주부",
    features:
      "초등학생 아들이 스마트폰만 보는 게 걱정되어, 주말에 함께 땀 흘리며 즐길 수 있는 야외 활동을 찾는 엄마.",
    runningExp: "없음 (완전 초보)",
    motivation:
      "운동하자고 하면 싫어하는 아이가 '보물찾기'는 신나서 따라나설 것 같아요. 아이와 함께 목표를 달성하고 싶어요.",
    painPoint:
      "아이들이 스마트폰만 보는 것을 걱정하지만, 온 가족이 함께 안전하게 즐길 만한 야외 활동을 찾기 어려움.",
    goal: "아이에게 건강한 야외 활동의 즐거움을 알려주고, 가족 모두가 협력하며 유대감을 쌓는 것.",
    campaignGoal:
      "아들과 협동해서 모든 QR을 찾고, 완주 기념 티셔츠를 '가족티'처럼 입고 인증샷 찍기.",
    lifestyle:
      "아이 학원 스케줄에 맞춰 생활. 맘카페에서 정보 수집. 건강을 위해 유튜브 '홈트' 채널 구독.",
    products:
      "아들을 위한 HARO '키즈 러닝화', 본인을 위한 발이 편한 쿠셔닝 좋은 러닝화.",
    groupJoin: "Yes (가족 단위)",
  },
  {
    type: "3. 다이어트 집중형",
    name: "최민준",
    age: "29세",
    job: "마케터",
    features:
      "바디 프로필을 목표로 식단과 운동을 병행하며, 매일의 성과를 SNS에 기록하는 열정 다이어터.",
    runningExp: "6개월 (헬스장 트레드밀 위주)",
    motivation:
      "헬스장에서 트레드밀만 뛰는 건 너무 지루해요. 야외에서 게임처럼 달리다 보면 유산소 운동 시간을 더 늘릴 수 있을 거예요.",
    painPoint: "혼자 하는 유산소 운동의 지루함과 정체기.",
    goal: "즐거운 과정을 통해 목표(바디 프로필)를 달성하고, 성취감을 SNS로 공유하며 자신감을 얻는 것.",
    campaignGoal:
      "챌린지 기간 동안 체지방 3% 감량. 매일 QR 미션을 클리어하는 모습을 #오운완 #HARO챌린지 태그와 함께 인증하기.",
    lifestyle:
      "아침은 닭가슴살, 저녁 약속 최소화. 매일 운동 기록 앱 사용. 운동 전후 사진 업로드.",
    products: "HARO 기능성 컴프레션 웨어, 스마트 워치 연동 러닝화.",
    groupJoin: "No (혼자 참여)",
  },
  {
    type: "4. SNS 인증형",
    name: "김유나",
    age: "25세",
    job: "인플루언서 (운동/일상)",
    features: "핫한 챌린지를 가장 먼저 경험하고 공유하는 트렌드세터.",
    runningExp: "1년 (콘텐츠용 러닝)",
    motivation:
      "그냥 달리는 영상은 식상하죠. 'QR 보물찾기'는 숏폼 만들기에 완벽해요.",
    painPoint: "남들과 똑같은 '오운완' 콘텐츠의 한계.",
    goal: "힙한 이미지를 구축하고 팔로워 참여를 유도하는 바이럴 콘텐츠 제작.",
    campaignGoal: "챌린지 과정을 담은 숏폼 영상 조회수 10만 회 달성.",
    lifestyle:
      "주 3회 이상 운동 콘텐츠 촬영. 예쁜 운동복·장비 투자. 영상 편집 능숙.",
    products: "화사한 컬러의 HARO 러닝 의류 풀세트, 로고 잘 보이는 액세서리.",
    groupJoin: "상황에 따라 다름",
  },
  {
    type: "5. 포인트 헌터",
    name: "박성훈",
    age: "28세",
    job: "온라인 쇼핑몰 운영자",
    features: "이벤트 보상을 극대화하는 실속파.",
    runningExp: "2개월 (동기 부족)",
    motivation: "운동하면서 포인트 모아 필요한 용품을 공짜로 얻고 싶어요.",
    painPoint: "시간·노력 대비 보상이 적을까 걱정.",
    goal: "최소 노력으로 최대 혜택 획득.",
    campaignGoal: "최대 포인트를 모아 5만원 상당 HARO 제품을 0원에 구매.",
    lifestyle: "짠테크 커뮤니티 활동, 멤버십 포인트 적극 활용.",
    products: "포인트 구매 가능 제품, 할인율 높은 상품.",
    groupJoin: "No (혼자 참여)",
  },
];
