import React from "react"; //React was imported from react library
// Navbar   with image and heading is created here and then exported out
const Navbar = () => {
  return (
    <nav className="shadow-md p-2 bg-blue-300 ">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        {/* brand logo */}
        <img
          src="https://th.bing.com/th?id=OIP.5UGWB-sbeAUak-YbuZiTGQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          alt="brand logo"
          className="w-14"
        />
        <h2 className="text-blue-800">Latest Movie Released</h2>
        {/* *********************** */}
      </div>
    </nav>
  );
};

export default Navbar; // Navbar export here for usage on the appjs file
