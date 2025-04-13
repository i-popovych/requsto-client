import { messageService } from "@/api/services/message/message.service";
import { Mail } from "@/packages/mail/components/mail";
import { accounts, mails } from "@/packages/mail/data";
import { useQuery } from "@tanstack/react-query";

const labels_list = ["meeting", "work", "important", "personal", "social"];

const getRandomLabel = () => {
  const randomIndex = Math.floor(Math.random() * labels_list.length);
  return labels_list[randomIndex];
};

export default function MailPage() {
  const { data, isFetching } = useQuery({
    queryFn: () => messageService.getChatMessages(),
    queryKey: ["chat"],
  });
  console.log("🚀 ~ MailPage ~ data:", data);

  const threadDto = isFetching
    ? []
    : data?.data?.chatList?.map((item) => {
        return {
          id: item.chat._id,
          subject: item.messages[0].message.slice(0, 120),
          from: item.chat.externalSenderEmail,
          emai: item.chat.externalSenderEmail,
          to: "Support Team",
          date: item.chat.createdAt,
          body: item.messages[0].message,
          read: true,
          labels: [
            getRandomLabel(),
            Math.random() > 0.5 ? getRandomLabel() : undefined,
            Math.random() > 0.5 ? getRandomLabel() : undefined,
          ].filter(Boolean),
          text: item.messages[0].message,
          name: `${item.chat?.firstName} ${item.chat?.lastName}`,
          messages: item.messages,
          chat: item.chat,
        };
      });

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <img
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={threadDto}
          defaultLayout={undefined}
          defaultCollapsed={undefined}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
