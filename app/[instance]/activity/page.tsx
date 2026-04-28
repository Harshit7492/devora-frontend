import { ActivityFeed } from "@/components/modules/activity/activity-feed";

type ActivityPageProps = {
  params: Promise<{
    instance: string;
  }>;
};

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { instance } = await params;

  return <ActivityFeed instance={instance} />;
}
