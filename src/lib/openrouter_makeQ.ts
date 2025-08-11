// OpenRouter 호출로 "설문 질문 + 모범답안" 생성
export interface Persona {
  name: string;
  age: string;
  job: string;
  traits: string; // 쉼표 분리 텍스트
  motivation: string;
  painPoints: string; // 쉼표 분리 텍스트
}

export interface QA {
  question: string;
  sample_answer: string;
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
    "너는 소비자 리서치 전문가다.",
    "입력된 페르소나(러닝 입문자)의 정보를 바탕으로 러닝 관련 디지털 마케팅 조사를 위한 설문 질문을 만든다.",
    "각 문항은 편향 최소화, 단일 개념 측정, 응답 쉬움(5점 리커트/객관식/서술형 혼합) 원칙을 따른다.",
    "출력은 JSON만. 스키마:",
    `{"items":[{"question":string,"sample_answer":string}]}`,
  ].join(" ");
}

function userPrompt(persona: Persona, count: number) {
  return [
    "다음 페르소나에 대해 설문 문항을 생성하라.",
    `문항 수: ${count}개`,
    "문항 유형은 혼합: (예) 5점 리커트, 객관식, 서술형. 문항 앞에 유형을 명시하지 말고 본문만 자연스럽게 작성.",
    "모범답안(sample_answer)은 페르소나의 입장에서 일관성 있게 작성.",
    "",
    "페르소나:",
    `- 이름: ${persona.name}`,
    `- 나이: ${persona.age}`,
    `- 직업: ${persona.job}`,
    `- 특징: ${persona.traits}`,
    `- 러닝 동기: ${persona.motivation}`,
    `- 주요 pain-point: ${persona.painPoints}`,
  ].join("\n");
}

export async function generateSurvey(
  persona: Persona,
  count: number
): Promise<QAResult> {
  if (!API_KEY) throw new Error("VITE_OPENROUTER_API_KEY가 없습니다.");

  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt() },
      { role: "user", content: userPrompt(persona, count) },
    ],
    temperature: 0.2,
    top_p: 0.9,
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
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content;
  return JSON.parse(content) as QAResult;
}
