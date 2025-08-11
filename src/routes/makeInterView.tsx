// src/routes/makeInterview.tsx
import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { personas, type Persona } from "../data/personas";
import { generateInterview, type QA } from "../lib/openrouter_persona";

export const Route = createFileRoute("/makeInterView")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [count, setCount] = React.useState<number>(() => {
    const saved = Number(localStorage.getItem("interview_count") || 10);
    return Number.isFinite(saved) && saved > 0 ? saved : 10;
  });
  const [items, setItems] = React.useState<QA[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const persona: Persona = personas[activeIdx];

  const run = async () => {
    setLoading(true);
    setError(null);
    setItems([]);
    try {
      localStorage.setItem("interview_count", String(count));
      const res = await generateInterview(persona, count);
      setItems(res.items || []);
    } catch (e: any) {
      setError(e?.message || "생성 실패");
    } finally {
      setLoading(false);
    }
  };

  // 복사용 텍스트(질문 한 줄, 답변 한 줄)
  const textOutput = React.useMemo(() => {
    if (!items.length) return "";
    return items
      .map((qa, i) => `${i + 1}. ${qa.question}\n   A: ${qa.answer}`)
      .join("\n\n");
  }, [items]);

  const copyAll = async () => {
    if (!textOutput) return;
    await navigator.clipboard.writeText(textOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <button>
        <a
          href="https://colab.research.google.com/drive/1TUmdgqna0xwsFirylH5L0rZd1ZLt4_JY?usp=sharing"
          className="text-blue-500 hover:underline"
        >
          설문 결과 확인하기 (Colab)
        </a>
      </button>
      <h1 className="text-2xl font-semibold">페르소나 인터뷰 생성</h1>

      {/* 페르소나 선택 버튼 (파일에서만 로드) */}
      <div className="flex flex-wrap gap-2">
        {personas.map((p, idx) => (
          <button
            key={p.name}
            onClick={() => {
              setActiveIdx(idx);
              setItems([]);
              setError(null);
            }}
            className={
              "px-3 py-1 rounded-xl border " +
              (idx === activeIdx ? "bg-black text-white" : "hover:shadow")
            }
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 선택된 페르소나 정보 */}
      <div className="rounded-xl border p-4 grid md:grid-cols-2 gap-3 bg-gray-50">
        <div>
          <span className="text-gray-500 text-sm">유형</span>
          <div className="font-medium">{persona.type}</div>
        </div>
        <div>
          <span className="text-gray-500 text-sm">이름</span>
          <div className="font-medium">{persona.name}</div>
        </div>
        <div>
          <span className="text-gray-500 text-sm">나이</span>
          <div className="font-medium">{persona.age}</div>
        </div>
        <div>
          <span className="text-gray-500 text-sm">직업</span>
          <div className="font-medium">{persona.job}</div>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-500 text-sm">특징</span>
          <div className="font-medium">{persona.features}</div>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-500 text-sm">러닝 경력</span>
          <div className="font-medium">{persona.runningExp}</div>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-500 text-sm">캠페인 참여 동기</span>
          <div className="font-medium">{persona.motivation}</div>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-500 text-sm">Pain Points</span>
          <div className="font-medium">{persona.painPoint}</div>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-500 text-sm">Goal</span>
          <div className="font-medium">{persona.goal}</div>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-500 text-sm">캠페인 목표</span>
          <div className="font-medium">{persona.campaignGoal}</div>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-500 text-sm">라이프스타일</span>
          <div className="font-medium">{persona.lifestyle}</div>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-500 text-sm">관심 제품</span>
          <div className="font-medium">{persona.products}</div>
        </div>
        <div className="md:col-span-2">
          <span className="text-gray-500 text-sm">단체 참여</span>
          <div className="font-medium">{persona.groupJoin}</div>
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="flex items-end gap-3">
        <div className="grid gap-1">
          <label className="text-sm text-gray-500">질문 개수</label>
          <input
            type="number"
            min={3}
            max={30}
            className="rounded-xl border p-2 w-28"
            value={count}
            onChange={(e) => setCount(Number(e.target.value || 10))}
          />
        </div>
        <button
          onClick={run}
          disabled={loading}
          className="px-4 py-2 rounded-xl shadow border hover:shadow-md disabled:opacity-50"
        >
          {loading ? "생성 중..." : "인터뷰질문생성"}
        </button>
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>

      {/* 결과 + 복사 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-500">결과(복사용 텍스트)</label>
          <button
            onClick={copyAll}
            disabled={!items.length}
            className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50"
          >
            {copied ? "복사됨" : "복사"}
          </button>
        </div>

        <textarea
          readOnly
          className="w-full h-[32rem] rounded-xl border p-3 overflow-auto text-sm font-mono"
          value={
            items.length
              ? items
                  .map(
                    (qa, i) => `${i + 1}. ${qa.question}\n   A: ${qa.answer}`
                  )
                  .join("\n\n")
              : "// 생성 결과가 여기에 표시됩니다"
          }
        />
      </div>
    </div>
  );
}

export default RouteComponent;
