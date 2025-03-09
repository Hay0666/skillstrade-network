
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: May 15, 2024
          </p>
        </div>

        <div className="prose prose-sm max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              Welcome to Skill Swap, a platform that connects individuals to share and exchange skills. These Terms of Service ("Terms") govern your access to and use of the Skill Swap website and mobile application (collectively, the "Service").
            </p>
            <p className="mt-4">
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Account Registration</h2>
            <p>
              To use certain features of the Service, you must register for an account. When you register, you agree to provide accurate, current, and complete information about yourself.
            </p>
            <p className="mt-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others, including privacy and intellectual property rights</li>
              <li>Share content that is harmful, abusive, offensive, or inappropriate</li>
              <li>Impersonate another person or misrepresent your affiliation with any person or entity</li>
              <li>Engage in any activity that interferes with or disrupts the Service</li>
              <li>Attempt to gain unauthorized access to the Service or related systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Skill Exchange</h2>
            <p>
              Skill Swap facilitates the exchange of skills between users. We do not guarantee the quality, safety, or legality of skills offered or exchanged through the Service.
            </p>
            <p className="mt-4">
              Any arrangements made between users for skill exchanges are solely between the users involved. We are not responsible for any disputes that may arise between users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Content</h2>
            <p>
              You retain all rights to the content you post on the Service. By posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, copy, modify, and display the content in connection with the Service.
            </p>
            <p className="mt-4">
              We reserve the right to remove any content that violates these Terms or that we determine is harmful or inappropriate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Payments and Subscriptions</h2>
            <p>
              Certain features of the Service may require payment. By subscribing to a paid plan, you agree to pay the fees associated with the plan you select.
            </p>
            <p className="mt-4">
              Subscriptions are billed in advance and renew automatically unless cancelled. You can cancel your subscription at any time through your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service or third parties, or for any other reason.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE, OUR AFFILIATES, OR OUR LICENSORS BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO THE SERVICE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on the Service and updating the "Last updated" date at the top of these Terms.
            </p>
            <p className="mt-4">
              Your continued use of the Service after the posting of the updated Terms constitutes your acceptance of the changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at legal@skillswap.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
