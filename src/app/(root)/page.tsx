import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
