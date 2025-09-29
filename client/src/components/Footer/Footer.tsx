import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { quickLinks, socialLinks } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#2B2118]/60 backdrop-blur text-[#f5f5dc] mt-15">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-[#D7A86E] font-bold text-3xl">Bookiverse</h2>
          <p className="mt-3 text-sm text-[#f5f5dc]/80">
            Dive into a universe of stories, knowledge, and imagination.
            Your next adventure is just a page away.
          </p>
        </div>

        <div>
          <h3 className="text-[#D7A86E] font-semibold text-xl mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-[#D7A86E] transition">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[#D7A86E] font-semibold text-xl mb-3">Connect</h3>
          <p className="text-sm text-[#f5f5dc]/80">bookiverse@example.com</p>
          <div className="flex gap-4 mt-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="hover:text-[#D7A86E] transition"
              >
                <FontAwesomeIcon icon={social.icon} size="lg" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#6C584C]/30 py-4 text-center text-sm text-[#f5f5dc]/70">
        © {new Date().getFullYear()} Bookiverse. All rights reserved.
      </div>
    </footer>

  );
};

export default Footer;
