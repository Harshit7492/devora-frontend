import { OrganizationChat } from "@/components/modules/chat/organization-chat";

type PingsPageProps = {
  params: Promise<{
    instance: string;
  }>;
};

export default async function PingsPage({ params }: PingsPageProps) {
  const { instance } = await params;

  return <OrganizationChat instance={instance} />;
}
