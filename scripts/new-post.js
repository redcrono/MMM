#!/usr/bin/env node

/**
 * 메가머니모멘텀 (MMM) - 새 블로그 포스트 템플릿 자동 생성 스크립트
 * 사용법: node scripts/new-post.js "제목" "카테고리(tax|wealth|subsidy|credit)" "슬러그(영문-파일명)"
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const title = args[0] || '새로운 금융 절세 가이드 제목';
const category = args[1] || 'tax';
const slug = args[2] || `post-${Date.now()}`;

const categoryNames = {
  tax: '절세·세무 실무',
  wealth: '자산관리·ISA',
  subsidy: '정부지원금·정책',
  credit: '대출·신용관리',
};

const categoryName = categoryNames[category] || '자산관리·ISA';
const today = new Date().toISOString().split('T')[0];

const template = `---
title: "${title}"
description: "${title}에 관한 핵심 조건, 계산 시뮬레이션, 신청 방법 및 주의사항 완벽 정리."
pubDate: ${today}
category: "${category}"
categoryName: "${categoryName}"
tags: ["금융", "재테크", "절세"]
author: "메가머니모멘텀 금융데이터 리서치팀"
featured: false
readingTime: "5분"
officialSources:
  - name: "국세청 홈택스 / 정부24 공식 포털"
    url: "https://www.hometax.go.kr"
---

import InfographicCard from '../../components/InfographicCard.astro';
import StepFlow from '../../components/StepFlow.astro';

실제 일상생활이나 재테크를 하면서 많은 분들이 가장 헷갈려하고 놓치기 쉬운 핵심 포인트를 알기 쉽게 정리해 드립니다.

저 역시 처음 이 제도를 접했을 때 복잡한 용어 때문에 어려움을 겪었는데요, 핵심만 추려 **실전에서 바로 써먹을 수 있는 가이드라인**을 공유합니다!

---

## 1. 핵심 요약 및 3대 자격 조건

<InfographicCard title="${title} 핵심 요약" type="primary" subtitle="2026년 최신 개정 기준">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
    <div style="background: var(--bg-main); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
      <h4 style="color: var(--primary); margin-bottom: 0.5rem;">📌 대상 및 혜택</h4>
      <p style="font-size: 0.85rem; margin: 0; line-height: 1.5;">주요 수혜 대상과 구체적인 지원/절세 금액을 기재합니다.</p>
    </div>
    <div style="background: var(--bg-main); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
      <h4 style="color: var(--secondary); margin-bottom: 0.5rem;">💡 핵심 체크포인트</h4>
      <p style="font-size: 0.85rem; margin: 0; line-height: 1.5;">놓치기 쉬운 소득 기준 및 서류 제출 기한을 안내합니다.</p>
    </div>
  </div>
</InfographicCard>

---

## 2. 3단계 실전 신청 절차

<StepFlow
  steps={[
    { num: "1", title: "온라인 포털 접속", desc: "공식 홈페이지 또는 모바일 앱 간편인증 로그인", icon: "📱" },
    { num: "2", title: "자격 모의계산", desc: "소득 및 가구원 수 입력 후 예상 수령액 확인", icon: "🔍" },
    { num: "3", title: "서류 제출 및 완료", desc: "필수 증빙서류 업로드 후 신청 완료", icon: "📝" },
  ]}
/>

---

## 3. 에디터의 실전 주의사항 & 꿀팁

- **체크포인트 1:** 신청 기한을 넘기면 소급 적용이 불가능하므로 사전에 알림을 설정해 두세요.
- **체크포인트 2:** 본인 명의 계좌번호가 정확히 입력되었는지 확인하세요.

---

> 🔗 **함께 읽으면 좋은 연관 가이드**:
> - [2026 연말정산 소득공제·세액공제 최대 환급 전략](/blog/2026-tax-refund-checklist)
> - [2026 중개형 ISA 계좌 비과세 혜택 총정리](/blog/2026-isa-account-benefits-drawbacks)
`;

const targetDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const targetPath = path.join(targetDir, `${slug}.mdx`);

if (fs.existsSync(targetPath)) {
  console.error(`❌ 이미 존재하는 파일입니다: ${targetPath}`);
  process.exit(1);
}

fs.writeFileSync(targetPath, template, 'utf-8');
console.log(`✅ 새 포스트 템플릿이 성공적으로 생성되었습니다: ${targetPath}`);
