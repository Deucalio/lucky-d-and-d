import { Shield, Award, CheckCircle, Globe, Lock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const certifications = [
  {
    name: "ISO 27001",
    description: "Information Security Management System",
    issuer: "International Organization for Standardization",
    validUntil: "2025-12-31",
    icon: Shield,
    verified: true,
  },
  {
    name: "PCI DSS Level 1",
    description: "Payment Card Industry Data Security Standard",
    issuer: "PCI Security Standards Council",
    validUntil: "2025-06-30",
    icon: Lock,
    verified: true,
  },
  {
    name: "Gaming License",
    description: "Licensed Gaming Operator",
    issuer: "Malta Gaming Authority",
    validUntil: "2026-03-15",
    icon: Award,
    verified: true,
  },
  {
    name: "Fair Play Certified",
    description: "Independently Audited Random Number Generation",
    issuer: "eCOGRA",
    validUntil: "2025-09-20",
    icon: CheckCircle,
    verified: true,
  },
];

const affiliations = [
  {
    name: "International Association of Gaming Regulators",
    role: "Member Organization",
    since: "2020",
    logo: "/placeholder.svg?height=80&width=120",
  },
  {
    name: "Responsible Gaming Council",
    role: "Certified Partner",
    since: "2021",
    logo: "/placeholder.svg?height=80&width=120",
  },
  {
    name: "Better Business Bureau",
    role: "A+ Rated Business",
    since: "2019",
    logo: "/placeholder.svg?height=80&width=120",
  },
  {
    name: "TrustPilot",
    role: "Excellent Rating (4.8/5)",
    since: "2020",
    logo: "/placeholder.svg?height=80&width=120",
  },
];

const securityFeatures = [
  {
    title: "256-bit SSL Encryption",
    description:
      "All data transmission is protected with bank-level encryption",
    icon: Lock,
  },
  {
    title: "Two-Factor Authentication",
    description: "Optional 2FA for enhanced account security",
    icon: Shield,
  },
  {
    title: "Regular Security Audits",
    description: "Quarterly penetration testing and security assessments",
    icon: CheckCircle,
  },
  {
    title: "GDPR Compliant",
    description: "Full compliance with European data protection regulations",
    icon: Users,
  },
];

export default function CertificationsPage() {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-200 bg-clip-text text-transparent mb-6">
            We Are Trusted
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Lucky D&D maintains the highest standards of security, fairness, and
            transparency. Our certifications and affiliations demonstrate our
            commitment to providing a safe and trustworthy platform.
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Our Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center">
                        <cert.icon className="h-6 w-6 text-purple-300" />
                      </div>
                      <div>
                        <CardTitle className="text-white">
                          {cert.name}
                        </CardTitle>
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                      </div>
                    </div>
                    {cert.verified && (
                      <Badge className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-3">{cert.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Valid Until:</span>
                    <span className="text-white font-medium">
                      {new Date(cert.validUntil).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Security & Privacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <Card
                key={index}
                className="text-center bg-slate-900/50 border-slate-800/50"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-purple-300" />
                  </div>
                  <CardTitle className="text-lg text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Affiliations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Our Affiliations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {affiliations.map((affiliation, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-16 bg-slate-800/50 rounded-lg flex items-center justify-center">
                      <img
                        src={affiliation.logo || "/placeholder.svg"}
                        alt={affiliation.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        {affiliation.name}
                      </h3>
                      <p className="text-purple-300 text-sm mb-1">
                        {affiliation.role}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Member since {affiliation.since}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Statement */}
        <Card className="bg-slate-900/50 border-slate-800/50">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white flex items-center justify-center">
              <Globe className="mr-2 h-6 w-6 text-purple-300" />
              Our Commitment to Trust
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="text-center space-y-4">
              <p className="text-gray-400 leading-relaxed">
                At Lucky D&D, trust is the foundation of everything we do. We
                understand that when you purchase products you are placing your
                trust in us.
              </p>
              <p className="text-gray-400 leading-relaxed">
                That's why we've invested heavily in obtaining the most rigorous
                certifications, partnering with respected industry
                organizations, and implementing cutting-edge security measures.
                Every draw is conducted under strict supervision, every winner
                is verified, and every transaction is protected.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our certifications aren't just badges on our website – they
                represent our ongoing commitment to maintaining the highest
                standards of integrity, security, and fairness in everything we
                do.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
