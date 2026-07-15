import { Link } from "react-router-dom";
import logo from "../../assets/logo_footer.png";
import React from "react";
import {
  FaLinkedinIn, FaInstagram, FaFacebookF,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe,
  FaWhatsapp,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home",     path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact",  path: "/contact" },
];

const serviceLinks = [
  { name: "Web Development",   path: "/services/static-websites" },
  { name: "Software Solutions", path: "/services/erp-solutions" },
  { name: "Branding & Design",  path: "/services/auto-branding" },
  { name: "Digital Marketing",  path: "/services/digital-marketing" },
  { name: "Advertising",        path: "/services/pvr-ads" },
];

const socials = [
  { icon: <FaGlobe />,      href: "https://connect2future.in",                                          label: "Website" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/connect2future/",                    label: "LinkedIn" },
  { icon: <FaInstagram />,  href: "https://www.instagram.com/_connect2future__?igsh=MnVxdXd4bzgzbDho", label: "Instagram" },
  { icon: <FaWhatsapp />,   href: "https://wa.me/917019436720?text=Hello%20Connect2Creovox,%20I%20would%20like%20to%20know%20more%20about%20your%20services.", label: "WhatsApp" },
];

const Footer = () => (
  <footer className="bg-[#0c0c0c] text-gray-300">

    {/* ── Top gradient bar ── */}
    <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#ec4899,#db2777,#be185d)" }} />

    {/* ── Main grid – reduced padding ── */}
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="lg:col-span-1">
          <img
            src={logo}
            alt="Connect2Creovox"
            className="h-24 w-auto object-contain mb-4"
          />
          <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
            We help businesses connect, innovate and grow in the digital world through design, technology and strategy.
          </p>
          <div className="flex gap-2.5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : "_self"}
                 rel="noreferrer" aria-label={s.label} className="social-icon text-gray-400 hover:text-white">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links – brighter default, pink hover, smooth transition */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-[3px] mb-5">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.name}>
                <Link
                  to={l.path}
                  className="text-gray-300 hover:text-pink-500 hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services – same style */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-[3px] mb-5">Services</h4>
          <ul className="space-y-2.5">
            {serviceLinks.map((l) => (
              <li key={l.name}>
                <Link
                  to={l.path}
                  className="text-gray-300 hover:text-pink-500 hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact – unchanged */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-[3px] mb-5">Get In Touch</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:Support@connect2future.com" className="flex items-start gap-3 group">
                <FaEnvelope className="text-brand-500 mt-0.5 shrink-0 text-sm" />
                <span className="text-gray-400 text-sm group-hover:text-brand-400 transition-colors leading-snug">
                  Support@connect2future.com
                </span>
              </a>
            </li>
            <li>
              <a href="mailto:Docs@connect2future.com" className="flex items-start gap-3 group">
                <FaEnvelope className="text-brand-500 mt-0.5 shrink-0 text-sm" />
                <span className="text-gray-400 text-sm group-hover:text-brand-400 transition-colors leading-snug">
                  Docs@connect2future.com
                </span>
              </a>
            </li>
            <li>
              <a href="tel:+918088980347" className="flex items-center gap-3 group">
                <FaPhone className="text-brand-500 shrink-0 text-sm" />
                <span className="text-gray-400 text-sm group-hover:text-brand-400 transition-colors">+91 80889 80347</span>
              </a>
            </li>
            <li>
              <a href="tel:+917019436720" className="flex items-center gap-3 group">
                <FaPhone className="text-brand-500 shrink-0 text-sm" />
                <span className="text-gray-400 text-sm group-hover:text-brand-400 transition-colors">+91 70194 36720</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-brand-500 mt-0.5 shrink-0 text-sm" />
              <span className="text-gray-400 text-sm">Mysuru, Karnataka, India</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* ── Bottom bar ── */}
    <div className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Connect2Creovox. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link to="#" className="text-gray-600 text-xs hover:text-brand-400 transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-gray-600 text-xs hover:text-brand-400 transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;