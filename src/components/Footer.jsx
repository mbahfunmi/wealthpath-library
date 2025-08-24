export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-4 mt-10 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} WealthPath Library. All rights reserved.</p>
      <p className="mt-1">
        Built with ❤️ for book lovers and wealth creators.
      </p>
    </footer>
  );
}
