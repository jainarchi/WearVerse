const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative h-18 w-18">
        <div className="absolute inset-0 rounded-full border-2 border-snitch-faint"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-snitch-warm animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;