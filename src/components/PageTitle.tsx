import { Helmet } from "react-helmet-async";

interface ITitleProps {
  title: string;
}

export const PageTitle: React.FC<ITitleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | NagulTv</title>
    </Helmet>
  );
};
