import Translate from "nyc-lib/nyc/lang/Translate"

const ccLanguages = ['en', 'ar', 'bn', 'zh', 'fr', 'ht', 'ko', 'po', 'ru', 'es', 'ur']
const languages = {}

ccLanguages.forEach(lang => {
	languages[lang] = Translate.DEFAULT_LANGUAGES[lang]
})

const messages = {}

messages.en = {
	cc_title: "Cooling Center Finder",
	btn_cooling_centers: "Cooling Centers",
	panel_note: '<p>New York City opens cooling centers in air-conditioned public facilities for those experiencing physical discomfort in a heat wave.</p><p>To find a cooling center, simply type your address or intersection into the search field on the upper-left corner of the map and then hit "Enter"; or zoom and pan the map to your neighborhood location.</p><p>To search or view only accessible centers, click the Accessible Only button below; click All Centers to switch back all centers search or view status.</p><p><b>NOTE:</b> Please check this site daily. Cooling centers may change hours of operation. </p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">Learn more about ways to stay cool</a>.</p>',
	acc_all: "All Centers",
	acc_only: "Accessible Only",
	btn_legend: "Legend",
	legend_comm: "Community Center",
	legend_senior: "Senior Center",
	legend_cornerstone: "Cornerstone Program",
	legend_library: "Library",
	legend_school: "School",
	pop_name: "Name",
	pop_type: "Facility Type",
	pop_address: "Address",
	pop_phone: "Phone",
	pop_hours: "Hours",
	pop_extended: "Extended Hours",
	pop_access: "Wheelchair Accessible"
}
messages.zh = {
	cc_title: "尋找紐約市避暑中心",
	btn_cooling_centers: '避暑中心',
	panel_note: "<p>紐約市在設有空調公共設施中為那些在熱浪中感到身體不適的人們開設避暑中心。</p><p>若要尋找一個避暑中心，只需在地圖的左上角的搜索框中輸入您的地址或街道交叉點，再按下“Enter” 鍵，或放大和平移動地圖到您的鄰居位置。</p><p>若要搜尋或查詢有輪椅通道的中心，請按下方的「僅限有輪椅通道」按鈕；點選「所有的中心」切換回所有中心的搜尋或查詢狀態。</p><p><b>注意：</b> 請每天查閲此網站。避暑中心開放時間可能會更改。</p><p><a href='http://www1.nyc.gov/site/em/ready/extreme-heat.page' target='_blank'>詳細了解如何保持涼爽的各種方式</a>。</p>",
	acc_all: "所有中心",
	acc_only: "只顯示無障礙設施",
	btn_legend: '說明',
	legend_comm: "社區中心",
	legend_senior: "老年人中心",
	legend_cornerstone: "Cornerstone計畫 ",
	legend_library: "圖書館",
	legend_school: "學校",
	pop_name: "設施名称",
	pop_type: "設施種類",
	pop_address: "地址",
	pop_phone: "電話號碼",
	pop_hours: "開放時間",
	pop_extended: "加開時間",
	pop_access: "無障礙設施"
}
messages.fr = {
	cc_title: "Centre de rafraîchissement",
	btn_cooling_centers: 'Centers de<br>Rafraîchissement',
	panel_note: "<p>La ville de New York ouvre des centres de refroidissement dans des établissements publics climatisés pour les personnes éprouvant une gêne physique lors de canicule.</p><p>Pour trouver un centre de refroidissement, tapez simplement votre adresse ou intersection de rues dans le champ de recherche du coin supérieur gauche de la carte, puis appuyez sur Enter (Saisir); ou effectuez un zoom et déplacez la carte vers votre quartier.</p><p>Pour rechercher ou afficher uniquement les centres accessibles aux fauteuils roulants, cliquez sur le bouton Accessible Only (Accessibles uniquement) ci-dessous; cliquez sur All Centers (Tous les centres) pour revenir à la recherche de tous les centres ou afficher le statut.</p> <p><b>REMARQUE:</b> Revenez sur ce site quotidiennement. Les centres de refroidissement peuvent changer d'heures d’ouverture.</p><p><a href='http://www1.nyc.gov/site/em/ready/extreme-heat.page' target='_blank'>En savoir plus sur les moyens de rester au frais.</a></p>",
	acc_all: "Tous les centres",
	acc_only: "Accessible uniquement",
	btn_legend: 'Légende',
	legend_comm: "Centre communautaire",
	legend_senior: "Centre pour personnes âgées",	
    legend_cornerstone: "Programme Cornerstone",
	legend_library: "Bibliothèque",
	legend_school: "École",
	pop_name: "Nom",
	pop_type: "Type d’établissement",
	pop_address: "Adresse",
	pop_phone: "Téléphone",
	pop_hours: "Heures",
	pop_extended: "Heures ajoutées",
	pop_access: "Accessible aux fauteuils roulants"
}
messages.ar = {
	cc_title: "الباحث عن مركز تبريد في مدينة نيويورك",
	btn_cooling_centers: "مراكز التبريد",
	panel_note: 'تفتح مدينة نيويورك مراكز تبريد في المرافق العامة المكيفة لاستخدامها من طرف من يتضايقون من موجة الحر.<p>للعثور على مركز تبريد، ما عليك سوى كتابة عنوانك أو  أسم  أقرب تقاطع  في حقل البحث في الزاوية العلوية اليسرى من الخريطة ثم الضغط على "إدخال" ؛ أو تكبير الخريطة وتحريكها إلى موقع منطقتك.</p><p>للبحث او لعرض المراكز المتاحة فقط، انقر على زر المتاح فقط؛ انقر على زر جميع المراكز للعودة الى مكان البحث العام او الى حالة العرض.</p><p>ملاحظة: يرجى مراجعة الموقع يوميا. قد تغير مراكز التبريد ساعات العمل.</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">تعرف على المزيد لكي تبقى باردا.<a></p>',
	acc_all: "كافة المراكز.",
	acc_only: "المراكز المتاحة فقط",
	btn_legend: "مفتاح الخريطة",
	legend_comm: "مركز مجتمعي ",
	legend_senior: "مركز للكبار السن",
    legend_cornerstone: "يرنامج Cornerstone",
	legend_library: "المكتبة",
	legend_school: "المدرسة",
	pop_name: "الاسم",
	pop_type: "نوع المرفق",
	pop_address: "العنوان",
	pop_phone: "الهاتف",
	pop_hours: "ساعات العمل",
	pop_extended: "ساعات العمل الممتدة",
	pop_access: "متاح بالكرسي المتحرك"
}

messages.bn = {
	cc_title: "কুলিং সেন্টার ফাইন্ডার",
	btn_cooling_centers: 'কুলিং সেন্টার',
	panel_note: 'তাপদাহে শারীরিক অস্বাচ্ছন্দ্যের শিকার হওয়া ব্যক্তিদের জন্য নিউ ইয়র্ক সিটি শীতাতপ নিয়ন্ত্রিত সরকারি স্থাপনাগুলোতে কুলিং সেন্টার খুলে থাকে৷<p>একটি কুলিং সেন্টার খুঁজে বের করতে, মানচিত্রের উপরে বাম কোণে অনুসন্ধানের ঘরে আপনার ঠিকানা বা ইন্টারসেকশনের নাম লিখুন এবং “Enter” চাপুন; অথবা মানচিত্রে আপনার মহল্লার অবস্থানের জায়গায় জুম ও প্যান করুন৷</p><p>শুধু হুইলচেয়ার প্রবেশযোগ্য সেন্টারগুলো খুঁজতে, নিচের “Accessible Only” (শুধু হুইলচেয়ার প্রবেশযোগ্য) বাটনে ক্লিক করুন; সব কেন্দ্র খোঁজার জন্য ফিরে যেতে বা স্ট্যাটাস দেখতে “All Centers” (সব কেন্দ্র) অপশনে ক্লিক করুন৷</p><p><b>দ্রষ্টব্য:</b> অনুগ্রহ করে এই সাইট প্রতিদিন চেক করুন৷ কুলিং সেন্টারগুলো খোলা থাকার সময়সূচি পরিবর্তিত হতে পারে৷</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">ঠাণ্ডা থাকার উপায়গুলো সম্পর্কে আরো জানুন৷</a></p>',
	acc_all: "সব সেন্টার",
	acc_only: "শুধু হুইলচেয়ার প্রবেশযোগ্য",
	btn_legend: 'ব্যাখ্যা',
	legend_comm: "কমিউনিটি সেন্টার",
	legend_senior: "সিনিয়র সেন্টার",
    legend_cornerstone: "Cornerstone কর্মসূচি",
	legend_library: "লাইব্রেরি",
	legend_school: "স্কুল",
	pop_name: "নাম",
	pop_type: "কেন্দ্রের ধরন",
	pop_address: "ঠিকানা",
	pop_phone: "ফোন",
	pop_hours: "সময়সূচি",
	pop_extended: "সম্প্রসারিত সময়সূচি",
	pop_access: "হুইলচেয়ার প্রবেশযোগ্য"
}
messages.ht = {
	cc_title: "Zouti pou Chèche Sant Refwadisman",
	btn_cooling_centers: 'Sant Refwadisman',
	panel_note: '<p>Vil New York ap louvri sant refwadisman nan etablisman piblik ki gen klimatizè pou moun ki santi malèz fizik pandan yon kout chalè.</p><p>Pou jwenn yon sant refwadisman, tou senpleman tape adrès ou oswa entèseksyon nan chan rechèch la sou kwen anwo a goch nan kat la epi frape "Enter" (Antre); oswa zoume epi panche kote katye ou ye a.<p>Pou chèche oswa wè sant ki aksesib sèlman, klike sou bouton Sèlman Aksesib ki anba a; klike sou Tout Sant pou retounen chèche tout sant yo oswa pou gade kondisyon yo.</p><p><b>NÒT:</b> Tanpri tcheke sit sa a chak jou. Sant refwadisman yo ka chanje orè fonksyonman yo.</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">Jwenn plis enfòmasyon sou fason pou rete fre.</a></p>',
	acc_all: "Tout Sant",
	acc_only: "Sèlman Aksesib",
	btn_legend: 'Lejann',
	legend_comm: "Sant Kominotè",
	legend_senior: "Sant pou Moun Aje",
    legend_cornerstone: "Pwogram Cornerstone",
	legend_library: "Bibliyotèk ",
	legend_school: "Lekòl",
	pop_name: "Non",
	pop_type: "Kalite Etablisman",
	pop_address: "Adrès",
	pop_phone: "Telefòn",
	pop_hours: "Orè Fonksyonman",
	pop_extended: "Orè Pwolonje",
	pop_access: "Aksesib pou Chèz-Woulant"
}
messages.ko = {
	cc_title: "뉴욕시 쿨링 센터 검색",
	btn_cooling_centers: '쿨링 센터',
	panel_note: '<p>뉴욕시는 폭염중에 신체적인 불편을 격는 분들에게 에어컨이 작동되는 공공시설 내 쿨링 센터를 운영하고 있습니다.</p><p>쿨링 센터를 검색하려면 주소 또는 교차로를 지도의 왼쪽 상단에 위치한 검색창에 입력한후 “엔터”를 누르시기 바랍니다; 또는 원하시는 지역에 지도를 줌하여 설정하시기 바랍니다.</p><p>장애인 접근 가능한 센터만을 검색하려면 아래 장애인 접근 가능 센터 버튼을 누르세요; 다시 전 센터 또는 상태보기를 위해서는 All Centers (전 센터)를 클릭하시기 바랍니다.</p><p><b>비고:</b> 본 사이트를 매일 확인하시기 바랍니다.  쿨링 센터의 운영 시간이 바뀔수 있습니다. </p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">더위를 피할수 있는 방법</a></p>',
	acc_all: "전 센터",
	acc_only: "이용 가능 센터",
	legend_cornerstone: "Cornerstone 프로그램",
	btn_legend: '레전드',
	legend_comm: "커뮤니티 센터",
	legend_senior: "노인 센터",
	legend_library: "도서관",
	legend_school: "학교",
	pop_name: "이름",
	pop_type: "시설 종류",
	pop_address: "주소",
	pop_phone: "전화번호",
	pop_hours: "운영 시간",
	pop_extended: "연장 운영 시간",
	pop_access: "휠체어 이용 가능"
}
messages.po = {
	cc_title: "Znajdź Centrum Chłodzenia",
	btn_cooling_centers: 'Centrum Chłodzenia',
	panel_note: '<p>Miasto Nowy Jork otwiera Centrum Chłodzenia w klimatyzowanych obiektach publicznych dla osób doświadczających trudności fizycznych podczas fali upałów.</p><p>W celu znalezienia Centrum Chłodzenia, należy po prostu wpisać adres lub skrzyżowanie w pole wyszukiwania w lewym górnym rogu mapy i nacisnąć “Enter” lub powiększyć mapę wokół własnej lokalizacji.</p><p>W celu wyszukania lub sprawdzenia ośrodków łatwo dostępnych dla osob niepełnosprawnych, proszę nacisnąć poniższy przycisk “Tylko Centrum Chłodzenia dostępne dla osob niepełnosprawnych”; proszę kliknąć „ Centrum Chłodzenia” w celu powrotu do wyszukiwania lub sprawdzenia wszystkich Centrum.</p><p><b>UWAGA:</b> Prosimy o codzienne sprawdzanie niniejszej strony. Centrum Chłodzenia może zmieniać godziny otwarcia.</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">Dowiedzcie się więcej o tym, jak się chłodzić.</a></p>',
	acc_all: "Centrum Chłodzenia",
	acc_only: "Tylko Centrum Chłodzenia dostępne dla osob niepełnosprawnych",
	btn_legend: 'Legenda',
	legend_comm: "Ośrodki społeczno-kulturalne ",
	legend_senior: "Ośrodki dla emerytów",
    legend_cornerstone: "Program Środowiskowy ",
	legend_library: "Biblioteka ",
	legend_school: "Szkoła",
	pop_name: "Imię i nazwisko",
	pop_type: "Rodzaj obiektu",
	pop_address: "Adres",
	pop_phone: "Numer telefonu",
	pop_hours: "Godziny otwarcia",
	pop_extended: "Przedłużone godzin otwarcia",
	pop_access: "Dostępne dla wózków inwalidzkich"
}
messages.ru = {
	cc_title: "Поиск центров охлаждения",
	btn_cooling_centers: 'Центры<br>охлаждения',
	panel_note: '<p>В Нью-Йорке работают центры охлаждения в кондиционированных общественных зданиях для тех, кто испытывает физический дискомфорт в период сильной жары. </p><p>Чтобы найти центр охлаждения, введите ваш адрес или перекресток в поисковую строку в верхнем левом углу карты и нажмите клавишу ввода; либо увеличьте изображение и найдите на карте ваш район.</p><p>Для поиска или просмотра только тех центров, которые доступны для лиц с физическими недостатками, нажмите ниже кнопку «Только доступные»; чтобы вернуться к поиску или просмотру всех центров, нажмите кнопку «Все центры».</p><p><b>ПРИМЕЧАНИЕ:</b> Проверяйте этот сайт ежедневно. Часы работы центров охлаждения могут измениться.</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">Узнайте о том, как избежать перегревания.</a></p>',
	acc_all: "Все центры ",
	acc_only: "Только доступные",
	btn_legend: 'Легенда',
	legend_note: "Прежде чем отправиться в центр охлаждения, позвоните и уточните часы его работы.",
	legend_searched: "Адрес, указанный для поиска",
	legend_comm: "Общественный центр",
	legend_senior: "Центр для пожилых",
    legend_cornerstone: "Программа Cornerstone",
	legend_library: "Библиотека",
	legend_school: "Школа",
	pop_name: "Ф.И.О.",
	pop_type: "Тип учреждения",
	pop_address: "Адрес",
	pop_phone: "Телефон",
	pop_hours: "Часы работы",
	pop_extended: "Продленные часы работы",
	pop_access: "Доступ для инвалидных колясок"
}
messages.es = {
	cc_title: "Directorio de centros de refrigeración",
	btn_cooling_centers: 'Centros de<br>refrigeración',
	panel_note: '<p>La Ciudad de Nueva York abre centros de refrigeración en instalaciones públicas con aire acondicionado, para quienes experimenten molestias físicas en una ola de calor.</p><p>Para encontrar un centro de refrigeración, simplemente escriba su dirección o intersección en el campo de búsqueda en la esquina superior izquierda del mapa y luego presione "Enter"; o amplíe y explore el mapa correspondiente a su vecindario.</p><p>Para buscar o ver solamente los centros con acceso para personas con discapacidades, haga clic en el botón "Solo centros con acceso para personas con discapacidades" más abajo; haga clic en "Todos los centros" para volver a la búsqueda de todos los centros o ver el estado.</p><p><b>NOTA:</b> Por favor, revise este sitio a diario. El horario de operación de los centros de refrigeración podría cambiar.</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">Obtenga más información sobre formas de mantenerse fresco.</a></p>',
	acc_all: "Todos los centros",
	acc_only: "Solo centros con acceso para personas con discapacidades",
	btn_legend: 'Leyenda',
	legend_comm: "Centro comunitario",
	legend_senior: "Centro para personas mayores",
    legend_cornerstone: "Programa Cornerstone ",
	legend_library: "Biblioteca",
	legend_school: "Escuela",
	pop_name: "Nombre",
	pop_type: "Tipo de instalación",
	pop_address: "Dirección",
	pop_phone: "Teléfono",
	pop_hours: "Horario",
	pop_extended: "Horario extendido",
	pop_access: "Acceso para sillas de ruedas"
}
messages.ur = {
	cc_title: "کولنگ سینٹر  تلاش کرنے کا ذریعہ",
	btn_cooling_centers: 'کولنگ سینٹر (ٹھنڈا رہنے کے مراکز)',
	panel_note: 'نیو یارک شہر گرمی کی لہر میں جسمانی تکلیف کا سامنا کرنے والے افراد کے لئے ایئر کنڈیشنڈ والی عوامی سہولیات میں کولنگ سینٹر کھولتا ہے۔<p>کولنگ سینٹر کو تلاش کرنے کے لئے، بس نقشے کے اوپری بائیں کونے پر تلاش کی جگہ میں اپنے ایڈریس یا انٹرسیکشن کو ٹائپ کریں اور پھر "اینٹر" دبائیں؛ یا نقشہ کو اپنا علاقہ دیکھنے کے لئے زوم اور پین کریں۔</p><p>صرف قابل رسائی مراکز تلاش کرنے یا دیکھنے کے لئے ذیل میں صرف قابل رسائی بٹن پر کلک کریں؛ تمام مراکز کو دوبارہ تلاش کرنے اور دیکھنےکیلئے "تمام مراکز" پر کلک کریں۔</p><p>نوٹ: براہ مہربانی اس سائٹ کو روزانہ ملاحظہ کریں۔ کولنگ سینٹر اوقات کار تبدیل کر سکتے ہیں۔</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">ٹھنڈا رہنے کے طریقوں کے بارے میں مزید معلومات حاصل کریں۔۔</a></p>',
	acc_all: "تمام مراکز",
	acc_only: "صرف قابل رسائی",
	btn_legend: 'علامات',
	legend_comm: "کمیونٹی سینٹر",
	legend_senior: "سینئیر سینٹر",
    legend_cornerstone: "Cornerstone پروگرام",
	legend_library: "لائبریری",
	legend_school: "سکول",
	pop_name: "نام",
	pop_type: "سہولیات کی نوعیت",
	pop_address: 'پتا',
	pop_phone: 'فون',
	pop_hours: "اوقات",
	pop_extended: "توسیع شدہ اوقات",
	pop_access: "وہیل چیئر قابل رسائی"
}

export default {messages, languages}