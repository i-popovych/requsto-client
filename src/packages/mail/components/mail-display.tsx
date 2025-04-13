import { ChatResponseItem } from "@/api/services/message/libs/MessageResponse.type";
import { messageService } from "@/api/services/message/message.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Message } from "@/entities/Message";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { addDays, addHours, format, nextSaturday } from "date-fns";

import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface MessagesListProps {
  messages: Message[] | null;
  chat: ChatResponseItem & { subject: string };
}

export function MessagesList({ messages, chat }: MessagesListProps) {
  const { invalidateQueries } = useQueryClient();

  const [resposneMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = useAppSelector((state) => state.user.user?._id);

  const today = new Date();

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      await messageService.sendResponseMessage({
        chatId: chat._id,
        responderUserId: userId as string,
        companyId: chat.companyId,
        message: resposneMessage,
      });

      setResponseMessage("");
      invalidateQueries({ queryKey: ["chat"] });
    } catch {
    } finally {
      setLoading(false);
    }
  };

  if (!chat) return null;

  const fullName = `${chat?.firstName} ${chat?.lastName}`;

  return (
    <div className="flex  h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <ArchiveX className="h-4 w-4" />
                <span className="sr-only">Move to junk</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to junk</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Clock className="h-4 w-4" />
                    <span className="sr-only">Snooze</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-[535px] p-0">
                <div className="flex flex-col gap-2 border-r px-2 py-4">
                  <div className="px-4 text-sm font-medium">Snooze until</div>
                  <div className="grid min-w-[250px] gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Later today{" "}
                      <span className="ml-auto text-muted-foreground">
                        {format(addHours(today, 4), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Tomorrow
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 1), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      This weekend
                      <span className="ml-auto text-muted-foreground">
                        {format(nextSaturday(today), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Next week
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 7), "E, h:m b")}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <Calendar />
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>Snooze</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Forward className="h-4 w-4" />
                <span className="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      <div className="flex items-start p-4">
        <div className="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarImage alt={fullName} />
            <AvatarFallback>
              {fullName
                .split(" ")
                .map((chunk: any) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold">{fullName}</div>
            <div className="line-clamp-1 text-xs">
              <span className="font-medium">Reply-To:</span>{" "}
              {chat.externalSenderEmail}
            </div>
          </div>
        </div>
        {chat.createdAt && (
          <div className="ml-auto text-xs text-muted-foreground">
            {format(new Date(chat.createdAt), "PPpp")}
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-4 mt-2 h-[80vh] overflow-y-auto">
        {messages?.map((message) => {
          return (
            <div>
              <div
                className={cn(
                  "flex-col whitespace-pre-wrap p-4 text-sm border  w-[85%] rounded-lg mx-2",
                  message.exteranlSenderEmail
                    ? "bg-[#616161]"
                    : "bg-[#4a81d5] ml-auto"
                )}
              >
                <div className="">{message.message}</div>
              </div>
              <div
                className={cn(
                  "text-xs mx-2 mt-1 flex",
                  message.admin && "justify-end"
                )}
              >
                {format(new Date(message.createdAt), "PPpp")}
              </div>
            </div>
          );
        })}
      </div>

      <Separator className="mt-auto" />
      <div className="p-4">
        <form>
          <div className="grid gap-4">
            <Textarea
              className="p-4"
              placeholder={`Reply ...`}
              value={resposneMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
            />
            <div className="flex items-center">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                size="sm"
                className="ml-auto text-white"
                disabled={loading}
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
