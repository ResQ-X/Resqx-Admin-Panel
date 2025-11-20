import React, { useState, useEffect } from "react";

type Overdraft = {
  id: string;
};

function Page() {
  const [overdraft, setOverdraft] = useState<Overdraft | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("selectedOverdraft");
    if (data) {
      setOverdraft(JSON.parse(data));
      sessionStorage.removeItem("selectedOverdraft"); // Clean up
    }
  }, []);

  console.log(overdraft);
  return (
    <div className="">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
}

export default Page;
