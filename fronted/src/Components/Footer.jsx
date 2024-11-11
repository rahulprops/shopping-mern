import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm mb-2">
            We are an online store offering the best products at the best prices. Our mission is to provide excellent customer service and a great shopping experience.
          </p>
        </div>

        {/* Customer Service Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/returns" className="hover:underline">Returns & Exchanges</a></li>
            <li><a href="/shipping" className="hover:underline">Shipping Information</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/cookies" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i> {/* Font Awesome Icon */}
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i> {/* Font Awesome Icon */}
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i> {/* Font Awesome Icon */}
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i> {/* Font Awesome Icon */}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} E-Commerce Company. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer