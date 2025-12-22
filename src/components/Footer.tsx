export function Footer() {
  return (
    <footer className="bg-medical-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">متجر المنتجات الطبية</h3>
            <p className="text-gray-200">متجر إلكتروني متخصص في المنتجات الطبية عالية الجودة.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">الرئيسية</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p>© 2024 متجر المنتجات الطبية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}