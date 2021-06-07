export const Section: React.FC = ({ children }) => {
  return (
    <section className="max-w-full w-full flex justify-center items-center">
      <div className="max-w-screen-xl w-full">{children}</div>
    </section>
  );
};
