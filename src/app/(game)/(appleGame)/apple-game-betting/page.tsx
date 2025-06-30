// app/(game)/(appleGame)/apple-game-betting/page.tsx
import React, { Suspense } from "react";
import ClientBetting from "./ClientBetting";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중…</div>}>
      <ClientBetting />
    </Suspense>
  );
}
