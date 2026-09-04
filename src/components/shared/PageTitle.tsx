import Divider from "@/components/ui/Divider";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Divider
      chipPosition="center"
      chip={{ label: title, color: "muted", variant: "outlined" }}
    />
  );
};

export default PageTitle;
