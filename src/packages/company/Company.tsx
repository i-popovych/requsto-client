import { userService } from "@/api/services/user/user.service";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";

export const Company = () => {
  const { data } = useQuery({
    queryKey: ["company"],
    queryFn: () => userService.profile(),
  });

  const company = data?.data?.user?.company;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center ">
        <div className="mt-10">
          <h3 className="text-lg font-medium">{company?.companyName}</h3>
        </div>
      </div>
      <Separator />

      <div className="flex flex-col items-center gap-4 max-w-[500px]">
        <Input placeholder="shadcn" value={company?.description} />
      </div>
    </div>
  );
};
