export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <>
      <div className="text-center mb-4">
        <div className="uppercase text-gray-500 text-base font-semibold">
          {subHeader}
        </div>
        <div className="text-primary text-4xl font-bold italic">
          {mainHeader}
        </div>
      </div>
    </>
  );
}
