import $baseAPI from "@/api/axios";

import { User } from "../../../entities/User";

class CompanyService {
  getAllCompanyUser() {
    return $baseAPI.get<{ data: User[] }>(`/v1/company/team`);
  }
}

export const companyService = new CompanyService();
