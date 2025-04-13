import { Mail, mails } from "@/packages/mail/data";
import { atom, useAtom } from "jotai";

type Config = {
  selected: Mail["id"] | null;
};

const configAtom = atom<Config>({
  selected: mails[0].id,
});

export function useMail() {
  return useAtom(configAtom);
}
