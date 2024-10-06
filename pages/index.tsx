import { hc } from "hono/client";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { AppType } from "./api/[...route]";
import useSWR from "swr";

const client = hc<AppType>("/");

const postHello = async (_: string, { arg }: { arg: string }) => {
  const res = await client.api.hello.$post({
    form: {
      name: arg,
    },
  });
  return await res.json();
};

const getHello = async () => {
  const res = await client.api.hello.$get();
  return await res.json();
};

export default function Home() {
  const { trigger, isMutating, data } = useSWRMutation("post-hello", postHello);
  const { data: getHelloData } = useSWR("get-hello", getHello);
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button type="button" onClick={() => trigger(name)} disabled={isMutating}>
        Send
      </button>
      <p>{data?.message}</p>

      <div>message: {getHelloData?.message}</div>
      <div>status: {getHelloData?.status}</div>
    </div>
  );
}
