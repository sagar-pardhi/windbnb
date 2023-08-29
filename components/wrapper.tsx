interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <main className="mx-4 my-4 md:mx-8 md:my-8 lg:mx-16 lg:my-8 max-w-7xl xl:mx-auto">
      {children}
    </main>
  );
};
