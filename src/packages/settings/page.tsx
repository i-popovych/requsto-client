import { Separator } from "@/components/ui/separator";
import SettingsLayout from "@/packages/settings/layout";
import { ProfileForm } from "@/packages/settings/profile-form";

export default function SettingsProfilePage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </SettingsLayout>
  );
}
