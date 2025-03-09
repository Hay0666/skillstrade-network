
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold">Cookie Policy</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: May 15, 2024
          </p>
        </div>

        <div className="prose prose-sm max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              This Cookie Policy explains how Skill Swap ("we", "us", or "our") uses cookies and similar technologies on our website and mobile application (collectively, the "Service"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            <p className="mt-4">
              By using the Service, you agree to our use of cookies as described in this Cookie Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            <p className="mt-4">
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
            <p>
              We use the following types of cookies on our Service:
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">Essential Cookies</h3>
            <p>
              These cookies are necessary for the Service to function properly. They enable core functionality such as security, network management, and account authentication. You cannot opt out of these cookies.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-2">Performance and Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with the Service by collecting and reporting information anonymously. They help us improve the performance and user experience of our Service.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-2">Functionality Cookies</h3>
            <p>
              These cookies allow the Service to remember choices you make (such as your username, language, or region) and provide enhanced, more personal features. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-2">Targeting and Advertising Cookies</h3>
            <p>
              These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and to help measure the effectiveness of advertising campaigns.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may include:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Google Analytics</li>
              <li>Facebook Pixel</li>
              <li>Payment processors</li>
              <li>Social media sharing buttons</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you.
            </p>
            <p className="mt-4">
              To manage cookies in different browsers, please consult the documentation for your specific browser:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Chrome: <a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline">https://support.google.com/chrome/answer/95647</a></li>
              <li>Safari: <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="text-primary hover:underline">https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac</a></li>
              <li>Firefox: <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-primary hover:underline">https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer</a></li>
              <li>Edge: <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline">https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Do Not Track</h2>
            <p>
              Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want to have your online activity tracked. Given that there is not yet a common understanding of how to interpret the Do Not Track signal, our Service does not currently respond to browser Do Not Track signals.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>
            <p className="mt-4">
              We encourage you to review this Cookie Policy periodically for any changes. Your continued use of the Service after the posting of changes constitutes your acceptance of such changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at privacy@skillswap.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
