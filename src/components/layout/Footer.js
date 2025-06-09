import React from 'react';
import { 
  Github, Twitter, Linkedin, Mail, ExternalLink, 
  Database, Heart, Shield, Zap, Globe, HelpCircle
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Contact Enrichment', href: '#contact-enrichment' },
      { name: 'Company Enrichment', href: '#company-enrichment' },
      { name: 'API Documentation', href: '#api-docs' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Integrations', href: '#integrations' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press Kit', href: '#press' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Help Center', href: '#help' },
      { name: 'API Reference', href: '#api-ref' },
      { name: 'Status Page', href: '#status' },
      { name: 'Changelog', href: '#changelog' },
      { name: 'Security', href: '#security' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'GDPR Compliance', href: '#gdpr' },
      { name: 'Data Processing', href: '#data-processing' },
      { name: 'Cookie Policy', href: '#cookies' }
    ]
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/leadflow', 
      icon: Github,
      description: 'Open source projects' 
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/leadflow', 
      icon: Twitter,
      description: 'Latest updates' 
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/leadflow', 
      icon: Linkedin,
      description: 'Professional network' 
    },
    { 
      name: 'Email', 
      href: 'mailto:hello@leadflow.com', 
      icon: Mail,
      description: 'Get in touch' 
    }
  ];

  const certifications = [
    { name: 'SOC 2 Type II', icon: Shield, description: 'Security compliance' },
    { name: 'GDPR Compliant', icon: Globe, description: 'Data protection' },
    { name: 'ISO 27001', icon: Database, description: 'Information security' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">LeadFlow</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Enrichment Platform</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
              The most powerful lead enrichment platform for modern sales teams. 
              Enrich contacts and companies with 95%+ accuracy using AI-powered data intelligence.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1M+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Contacts Enriched</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">95%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">10K+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Happy Users</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title={social.description}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center group"
                  >
                    <span>{link.name}</span>
                    {link.name === 'Help Center' && (
                      <HelpCircle className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Certifications & Trust Signals */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Trusted & Secure
              </span>
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center space-x-2 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                  title={cert.description}
                >
                  <cert.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {cert.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Performance Indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  All Systems Operational
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-3 w-3 text-yellow-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  99.9% Uptime
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
              <span>© {currentYear} LeadFlow. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for sales teams worldwide.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
              <span>Version 2.1.0</span>
              <a 
                href="#status" 
                className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Status
              </a>
              <a 
                href="#changelog" 
                className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                What's New
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
