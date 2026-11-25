import type { Metadata } from "next";

import { getSettingsMap } from "@/lib/cms-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Baoshan Optical Communication's development history, technical expertise, and corporate culture.",
};

export const revalidate = 3600;

export default async function AboutPage() {
  const settingsMap = await getSettingsMap();

  const companyName =
    settingsMap.company_name ?? "Baoshan Optical Communication Technology Co., Ltd.";
  const aboutContent =
    settingsMap.about_content ??
    "Baoshan Optical Communication Technology Co., Ltd. specializes in the R&D, production, and sales of optical communication products, dedicated to providing high-quality optical fiber, optical cables, optical modules, and system solutions to customers.";

  const milestones = [
    { year: "2004", event: "Company founded, focusing on R&D and production of optical fiber and cable products" },
    { year: "2008", event: "Achieved ISO 9001 quality management system certification" },
    { year: "2012", event: "Expanded product line into optical modules and passive components" },
    { year: "2016", event: "Established nationwide service network covering 80+ cities" },
    { year: "2019", event: "Started exporting to Southeast Asia, Middle East, and other regions" },
    { year: "2022", event: "Launched 400G optical module series, entering high-speed data center market" },
    { year: "2024", event: "R&D team exceeded 100 members, began R&D on 800G and silicon photonics technology" },
  ];

  const values = [
    { icon: "🎯", title: "Focus & Expertise", desc: "Dedicated to optical communications for 20 years, focusing on excellence in every product" },
    { icon: "💡", title: "Continuous Innovation", desc: "Continuous R&D investment to keep pace with latest industry technology trends" },
    { icon: "🤝", title: "Integrity & Partnership", desc: "Building long-term relationships with customers and partners based on integrity" },
    { icon: "🌱", title: "Green Development", desc: "Promoting low-power products and practicing sustainable development" },
  ];

  const stats = [
    { value: "2004", label: "Founded" },
    { value: "500+", label: "Product Models" },
    { value: "100+", label: "R&D Engineers" },
    { value: "1000+", label: "Customers Served" },
  ];

  const certifications = [
    { icon: "🏅", name: "ISO 9001:2015", desc: "Quality management system certification" },
    { icon: "✅", name: "CE Certification", desc: "EU market access certification" },
    { icon: "♻️", name: "RoHS Certification", desc: "EU environmental directive compliance" },
    { icon: "📋", name: "Telecom Equipment Access License", desc: "Industry certification" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">About Us</h1>
          <p className="text-blue-200">{companyName}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Profile</h2>
              <p className="text-gray-600 leading-relaxed">{aboutContent}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🏭</div>
                <div className="text-gray-600 font-medium">Modern Production Base</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Corporate Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Development History</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-0.5" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex items-center gap-4 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold md:mx-auto" />
                  <div className={`bg-blue-50 rounded-lg p-4 flex-1 md:max-w-sm ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="font-bold text-blue-700">{m.year}</div>
                    <div className="text-sm text-gray-600 mt-1">{m.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="border rounded-lg p-4 text-center hover:border-blue-300 transition-colors">
                <div className="text-3xl mb-2">{cert.icon}</div>
                <div className="font-semibold text-sm">{cert.name}</div>
                <div className="text-xs text-gray-500 mt-1">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
