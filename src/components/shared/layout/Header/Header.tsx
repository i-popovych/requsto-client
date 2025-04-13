import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}>
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary "
          >
            Chat
          </Link>
          <Link
            to="/team"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Team
          </Link>
          <Link
            to="/company"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Company
          </Link>
          <Link
            to="/settings"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
};
