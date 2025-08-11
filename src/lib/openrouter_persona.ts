// src/lib/makeInterview.ts
import type { Persona } from "../data/personas";

export interface QA {
  question: string;
  answer: string;
}
export interface QAResult {
  items: QA[];
}

const OR_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || "openrouter/auto";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string;
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Prompt Lab";
const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

function systemPrompt() {
  return [
    '당신은 스포츠 용품 브랜드 "하로 (Haro: Happy + Road) – 행복한 길 위의 러너"의 디지털 마케팅 기획자 나민서 매니저이며, 초보 러너들을 위한 디지털 마케팅을 기획 중입니다.',
    '당신은 러닝에 대한 진입 장벽을 낮추고, 운동의 즐거움을 알리기 위해 "RUN & FIND – QR 보물 러닝 챌린지"를 기획하였으며, 대표 페르소나 5명에 대하여 심층 인터뷰를 진행하려고 합니다.',
    "",
    '캠페인 제목: "RUN & FIND – QR 보물 러닝 챌린지" (뛰면서 찾고, 찍고, 즐기는 러닝 미션!)',
    "캠페인 개요: 러닝이 처음인 사람도 게임하듯 가볍게 즐길 수 있는 도심형 QR 러닝 보물찾기.",
    "정해진 러닝 코스 곳곳에 숨겨진 QR 코드를 찾아 찍으면, 단계별로 디지털 뱃지와 포인트가 지급되고, 모든 QR을 완주하면 특별 보상을 제공.",
    "특징: 게임 요소(QR 위치 힌트, 미션 클리어 알림, 랭킹 보드), SNS 공유 유도, 지역 상권 연계.",
    "마케팅 포인트: 초보 러너 친화적, 브랜드 경험 강화, 바이럴 가능성.",
    "",
    "아래 페르소나에 맞춰 인터뷰 질문과 답변을 생성한다.",
    '출력은 반드시 JSON만. 스키마: {"items":[{"question":string,"answer":string}]}',
    "질문은 단일 개념(이중질문 금지), 명확하고 실무 인터뷰에 적합하게.",
    "answer는 페르소나 1인칭, 2~4문장, 최소 60자 이상(단답 금지).",
  ].join(" ");
}

function userPrompt(persona: Persona, count: number) {
  return [
    `대표 페르소나 5명에 대한 정보를 바탕으로 아래 지침을 지키며 페르소나 각각에 맞는 인터뷰 질의서를 작성하세요.`,
    `1. 인터뷰 질의서에는 ${count}개의 질문을 작성`,
    `2. 실제 전화 인터뷰처럼 자연스럽고 상세한 대화 형식 사용`,
    `3. 각 답변은 2~5문장 분량으로, 감정 표현, 일상 언급, 상황 묘사 등을 포함`,
    `4. template 양식: [인터뷰 ① : 유형 / 이름] Q1. 질문 A1. 응답`,
    `5. example: [인터뷰 ① : 개인성장형 / 이지현] Q1. 러닝은 언제부터 시작하셨나요? A1. 1월 1일부터 운동을 시작했어요! 새해 맞이 다이어트를 결심하고 운동을 찾아보던 중 요즘 러닝을 많이 하더라구요. 그래서 저도 트렌드를 따라가고자 시작했어요!`,
    "",
    "TOP5 Persona (선택된 인물 정보):",
    `- 유형: ${persona.type}`,
    `- 이름: ${persona.name}`,
    `- 나이: ${persona.age}`,
    `- 직업: ${persona.job}`,
    `- 특징: ${persona.features}`,
    `- 러닝 경력: ${persona.runningExp}`,
    `- 캠페인 참여 동기: ${persona.motivation}`,
    `- Pain Point: ${persona.painPoint}`,
    `- Goal: ${persona.goal}`,
    `- 캠페인 목표: ${persona.campaignGoal}`,
    `- 라이프스타일: ${persona.lifestyle}`,
    `- 관심 제품: ${persona.products}`,
    `- 단체 가입 여부: ${persona.groupJoin}`,
  ].join("\n");
}

export async function generateInterview(
  persona: Persona,
  count = 10
): Promise<QAResult> {
  if (!API_KEY) throw new Error("VITE_OPENROUTER_API_KEY가 없습니다.");

  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt() },
      { role: "user", content: userPrompt(persona, count) },
    ],
    temperature: 0.5,
    top_p: 0.92,
    presence_penalty: 0.6,
    frequency_penalty: 0.2,
    response_format: { type: "json_object" },
  };

  const res = await fetch(OR_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "HTTP-Referer": SITE_URL,
      "X-Title": SITE_NAME,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${err}`);
  }

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content;
  const parsed = JSON.parse(content) as QAResult;

  // 가드: 필드 보정
  const items = (parsed?.items ?? []).map((it) => ({
    question: String(it?.question ?? "").trim(),
    answer: String(it?.answer ?? "").trim(),
  }));

  return { items };
}
