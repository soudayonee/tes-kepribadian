export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <div className="flex items-center justify-center w-20 h-20 text-4xl text-(--male-blue) border-4 border-transparent rounded-full animate-spin border-t-(--male-blue)">
          <div className="flex items-center justify-center w-16 h-16 text-2xl text-(--female-pink) border-4 border-transparent rounded-full animate-spin border-t-(--female-pink)"></div>
        </div>
      </div>
    </div>
  );
}
