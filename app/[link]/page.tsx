"use client";

import React, { useActionState, useEffect, useTransition } from "react";
import { getLinkByCode } from "../actions/linkAction";

type Params = {
  link: string;
};

const Page = ({ params }: { params: Promise<Params> }) => {
  const { link } = React.use(params);

  const [linkState, linkAction] = useActionState(
    getLinkByCode,
    { success: false, message: ""}
  );

  const [, startTransition] = useTransition();
  useEffect(() => {
    if (link) {
      startTransition(() => {
        linkAction({ code: link }); // ✅ wrapped in transition
      });
    }
  }, [link]);

  useEffect(() => {
    if (linkState?.success && linkState.originalUrl) {
      window.location.href = linkState.originalUrl;
    }
  }, [linkState]);

  return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
};

export default Page;
