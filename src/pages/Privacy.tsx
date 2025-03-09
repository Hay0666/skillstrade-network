
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: May 15, 2024
          </p>
        </div>

        <div className="prose prose-sm max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              At Skill Swap, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and mobile application (collectively, the "Service").
            </p>
            <p className="mt-4">
              Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our Service:
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">Personal Information</h3>
            <p>
              When you register for an account, we collect information that can be used to identify you, such as:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Profile picture (if provided)</li>
              <li>Skills you want to teach and learn</li>
              <li>Biographical information you choose to share</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-2">Usage Information</h3>
            <p>
              We automatically collect information about your interactions with the Service, including:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Providing and maintaining the Service</li>
              <li>Matching users with complementary skills</li>
              <li>Processing transactions</li>
              <li>Responding to your requests and inquiries</li>
              <li>Sending you technical notices and updates</li>
              <li>Improving the Service and user experience</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Protecting the security and integrity of the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Sharing Your Information</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>With other users:</strong> Your profile information, including your name, profile picture, and skills, will be visible to other users of the Service.</li>
              <li><strong>With service providers:</strong> We may share your information with third-party vendors who provide services on our behalf, such as payment processing and data analysis.</li>
              <li><strong>For legal purposes:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
              <li><strong>Business transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="mt-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Accessing your personal information</li>
              <li>Correcting inaccurate information</li>
              <li>Deleting your personal information</li>
              <li>Objecting to certain processing activities</li>
              <li>Withdrawing consent</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at privacy@skillswap.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
            <p>
              The Service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete that information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p className="mt-4">
              We encourage you to review this Privacy Policy periodically for any changes. Your continued use of the Service after the posting of changes constitutes your acceptance of such changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@skillswap.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
