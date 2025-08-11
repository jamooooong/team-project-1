import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { generateSurvey, type Persona, type QA } from "../lib/openrouter_makeQ";

export const Route = createFileRoute("/makeQ")({
  component: RouteComponent,
});

const LS_KEY = "persona_makeQ_v1";

function RouteComponent() {
  const [persona, setPersona] = React.useState<Persona>(() => {
    const raw = localStorage.getItem(LS_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          name: "",
          age: "",
          job: "",
          traits: "",
          motivation: "",
          painPoints: "",
        };
  });
  const [count, setCount] = React.useState<number>(10);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<QA[]>([]);
  const [copied, setCopied] = React.useState(false);

  // autosave persona
  React.useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(persona));
  }, [persona]);

  const onChange =
    (k: keyof Persona) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setPersona((p) => ({ ...p, [k]: e.target.value }));

  const onGenerate = async () => {
    setLoading(true);
    setError(null);
    setItems([]);
    try {
      const res = await generateSurvey(persona, count);
      setItems(res.items || []);
    } catch (e: any) {
      setError(e?.message || "생성 실패");
    } finally {
      setLoading(false);
    }
  };

  // 복사용 순수 텍스트 구성: 질문 한 줄, 답변 한 줄
  const textOutput = React.useMemo(() => {
    if (!items.length) return "";
    return items
      .map(
        (qa, i) =>
          `${i + 1}. ${qa.question.trim()}\n   답변: ${qa.sample_answer.trim()}`
      )
      .join("\n\n");
  }, [items]);

  const onCopy = async () => {
    if (!textOutput) return;
    await navigator.clipboard.writeText(textOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const onResetPersona = () => {
    localStorage.removeItem(LS_KEY);
    setPersona({
      name: "",
      age: "",
      job: "",
      traits: "",
      motivation: "",
      painPoints: "",
    });
  };

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        makeQ · 페르소나 기반 설문 생성 (텍스트 복사)
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 왼쪽: 페르소나 폼 */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label className="text-sm text-gray-500">이름</label>
              <input
                className="rounded-xl border p-2"
                value={persona.name}
                onChange={onChange("name")}
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm text-gray-500">나이</label>
              <input
                className="rounded-xl border p-2"
                value={persona.age}
                onChange={onChange("age")}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-gray-500">직업</label>
            <input
              className="rounded-xl border p-2"
              value={persona.job}
              onChange={onChange("job")}
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-gray-500">특징 (쉼표로 구분)</label>
            <input
              className="rounded-xl border p-2"
              value={persona.traits}
              onChange={onChange("traits")}
              placeholder="예) 초보 러너, 주 2회 운동, 디지털 기기 선호"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-gray-500">러닝 동기</label>
            <input
              className="rounded-xl border p-2"
              value={persona.motivation}
              onChange={onChange("motivation")}
              placeholder="예) 스트레스 해소와 건강 관리"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-gray-500">
              주요 pain-point (쉼표로 구분)
            </label>
            <textarea
              className="rounded-xl border p-2 h-24"
              value={persona.painPoints}
              onChange={onChange("painPoints")}
              placeholder="예) 부상 걱정, 시간 부족, 코스 지루함"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-end">
            <div className="grid gap-1">
              <label className="text-sm text-gray-500">문항 수</label>
              <input
                type="number"
                min={3}
                max={30}
                className="rounded-xl border p-2"
                value={count}
                onChange={(e) => setCount(Number(e.target.value || 10))}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={onGenerate}
                disabled={loading}
                className="px-4 py-2 rounded-xl shadow border hover:shadow-md disabled:opacity-50"
              >
                {loading ? "생성 중..." : "설문 생성"}
              </button>
              <button
                onClick={onResetPersona}
                className="px-4 py-2 rounded-xl border"
              >
                초기화
              </button>
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>

        {/* 오른쪽: 결과(텍스트 + 복사 버튼) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-500">결과(복사용 텍스트)</label>
            <button
              onClick={onCopy}
              disabled={!textOutput}
              className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50"
            >
              {copied ? "복사됨" : "복사"}
            </button>
          </div>

          <textarea
            readOnly
            className="w-full h-[32rem] rounded-xl border p-3 overflow-auto text-sm font-mono"
            value={textOutput || "// 생성 결과가 여기에 표시됩니다"}
          />
        </div>
      </div>

      {/* 미리보기(리스트) */}
      {items.length > 0 && (
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-2">미리보기</h2>
          <ol className="list-decimal list-inside space-y-2">
            {items.map((qa, i) => (
              <li key={i}>
                <div className="font-medium">{qa.question}</div>
                <div className="text-sm text-gray-600 mt-1">
                  답변: {qa.sample_answer}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default RouteComponent;
