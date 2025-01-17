export default function Footer() {
  var getYear = new Date().getFullYear();
  return (
    <>
      <footer className="mt-auto">
        <div className="text-gray-500 text-center border-t p-8 mt-16">&copy; {getYear} All rights reserved</div>
      </footer>
    </>
  );
}
