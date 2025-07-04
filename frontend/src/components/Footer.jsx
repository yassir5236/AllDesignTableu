import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-50 text-gray-700 py-12 px-6 overflow-hidden">
      {/* Background image with flow effect */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Logo and Contact */}
          <div className="space-y-4  bg-opacity-70 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
                <svg fill="#000000" width="30px" height="30px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M517.257 1127.343c72.733 0 148.871 36.586 221.274 107.45 87.455 110.418 114.922 204.135 81.632 278.296-72.733 162.274-412.664 234.897-618.666 259.178 34.609-82.62 75.15-216.88 75.15-394.645 0-97.123 66.47-195.455 157.88-233.689 26.698-11.097 54.494-16.59 82.73-16.59Zm229.404-167.109c54.055 28.895 106.462 65.371 155.133 113.494l13.844 15.6c28.016 35.378 50.649 69.987 70.425 104.155-29.554 26.259-59.878 52.737-90.75 79.545-18.898-35.488-43.069-71.964-72.843-109.319l-4.285-4.834c-48.342-47.683-99.43-83.39-151.727-107.011 26.368-30.653 53.066-61.196 80.203-91.63Zm1046.49-803.133c7.801 7.8 18.129 21.754 16.92 52.187-6.043 155.683-284.338 494.405-740.509 909.266-19.995-32.302-41.969-64.822-67.788-97.453l-22.523-25.27c-49.22-48.671-101.408-88.883-156.012-121.074 350.588-385.855 728.203-734.356 910.254-741.828 30.983-.109 44.497 9.01 59.658 24.172Zm126.678 56.472c2.087-53.615-14.832-99.98-56.142-141.29-34.28-34.279-81.962-51.198-134.588-49.11-304.554 12.414-912.232 683.377-1179.54 996.17-53.616-5.383-106.682 2.088-157.441 23.402-132.61 55.263-225.339 193.038-225.339 334.877 0 268.517-103.935 425.737-104.923 427.275L0 1896.747l110.307-6.153c69.217-3.735 681.29-45.375 810.165-332.46 24.39-54.604 29.225-113.163 15.93-175.239 374.32-321.802 972.11-879.71 983.427-1169.322" fill-rule="evenodd"></path> </g></svg>
              <span className="text-xl font-bold text-gray-800">ALLDESIGN</span>
            </div>
            <p className="text-sm text-gray-600">Le tableau, le bijou de votre maison</p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-sm">
                  <strong>Service clients:</strong> 06-65-99-33-64
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-gray-600" />
                <span className="text-sm">
                  <strong>WhatsApp:</strong> 06-65-99-33-64
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="text-sm">
                  <strong>Email:</strong> contact@AllDesign.ma
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-600 mt-1" />
                <span className="text-sm">
                  <strong>Adresse Showroom:</strong> N°38 Lot Assafae, Quartier Laymoune, Oulfa Casablanca 20260 Maroc.
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 - Social Media */}
          <div className="space-y-4  bg-opacity-70 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Nous sommes actifs sur les réseaux
            </h3>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <div className="w-4 h-4  rounded-full"></div>
              </a>
              <a href="#" className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <div className="w-4 h-4  rounded-full"></div>
              </a>
            </div>
            


         
          </div>

          {/* Column 3 - Everything Section */}
          <div className="space-y-4  bg-opacity-70 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Tout savoir
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">À propos de nous</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Notre promesse</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Liste de souhaits</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Avis Clients</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Offrir Carte cadeau</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Vendez votre Art</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Paravents</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Astuces Deco</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Questions fréquentes FAQ</a></li>
            </ul>
          </div>

          {/* Column 4 - Information Section */}
          <div className="space-y-4  bg-opacity-70 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Informations
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Conditions Générales de Vente</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Politique d'expédition</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Politique de remboursement</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Paiement sécurisé</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Service aux professionnels</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Nous contacter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Nos points de vente</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 relative">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0  bg-opacity-70 p-4 rounded-lg backdrop-blur-sm">
            <div className="text-sm text-gray-600">
              © 2025, <strong>AllDesign.Ma</strong>. All rights reserved.
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              {/* Security Badge */}
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-xs text-gray-600">Ce site web est sécurisé 3D Secure</span>
              </div>
              
              {/* Innovation Label */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <span className="text-xs text-blue-600">Label "Jeune Entreprise Innovante en Nouvelles Technologies"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;