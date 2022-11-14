import { Site } from "@prisma/client";

interface SiteListProps {
  sites: Site[] | undefined;
}

const SiteList = ({ sites }:SiteListProps) => {
  return (
    <div>
      {sites?.map((site) => (
        <p>{site?.name}</p>
      ))}
    </div>
  )
}

export default SiteList