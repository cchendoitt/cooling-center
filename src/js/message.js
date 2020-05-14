/*
	en: {code: 'en', name: 'English', native: 'English', hint: 'Translate'},
	ar: {code: 'ar', name: 'Arabic' , native: '&#x627;&#x644;&#x639;&#x631;&#x628;&#x64A;&#x629;', hint: '&#x62A;&#x631;&#x62C;&#x645;'},
	bn: {code: 'bn', name: 'Bengali', native: '&#x9AC;&#x9BE;&#x999;&#x9BE;&#x9B2;&#x9BF;', hint: '&#x9AC;&#x9BE;&#x999;&#x9BE;&#x9B2;&#x9BF;', hint: '&#x985;&#x9A8;&#x9C1;&#x9AC;&#x9BE;&#x9A6; &#x995;&#x9B0;&#x9BE;'},
	zh: {code: 'zh', name: 'Chinese', native: '&#x4E2D;&#x56FD;', hint: '&#x7FFB;&#x8BD1;'},
	fr: {code: 'fr', name: 'French', native: 'Fran&#231;ais', hint: 'Traduire'},
	ht: {code: 'ht', name: 'Haitian Creole', native: 'Krey&#242;l Ayisyen', hint: 'Tradui'},
	ko: {code: 'ko', name: 'Korean' , native: '&#xD55C;&#xAD6D;&#xC758;', hint: '&#xBC88;&#xC5ED;'},
	po: {code: 'po', name: 'Polish', native: 'język polski', hint: 'język polski'},
	ru: {code: 'ru', name: 'Russian', native: 'P&#x443;&#x441;&#x441;&#x43A;&#x438;&#x439;', hint: '&#x43F;&#x435;&#x440;&#x435;&#x432;&#x435;&#x441;&#x442;&#x438;'},
	es: {code: 'es', name: 'Spanish', native: 'Espa&#241;ol', hint: 'Traducir'},
	ur: {code: 'ur', name: 'Urdu', native: '&#x627;&#x631;&#x62F;&#x648;', hint: '&#x62A;&#x631;&#x62C;&#x645;&#x6C1; &#x6A9;&#x631;&#x6CC;&#x6BA;'}
}
 */
const languages = {
	en: {code: 'en', name: 'English', native: 'English', hint: 'Translate'},
	ar: {code: 'ar', name: 'Arabic', native: 'بالعربية', hint: 'بالعربية'},
	bn: {code: 'bn', name: 'Bengali', native: 'বাংলা', hint: 'বাংলা'},
	zh: {code: 'zh', name: 'Chinese', native: '繁體中文', hint: '繁體中文'},
	fr: {code: 'fr', name: 'French', native: 'Francois', hint: 'Francois'},
	ht: {code: 'ht', name: 'Haitian Creole', native: 'Kreyòl', hint: 'Kreyòl'},
	ko: {code: 'ko', name: 'Korean', native: '한국어', hint: '한국어'},
	po: {code: 'po', name: 'Polish', native: 'język polski', hint: 'język polski'},
	ru: {code: 'ru', name: 'Russian', native: 'Русский', hint: 'Русский'},
	es: {code: 'es', name: 'Spanish', native: 'Español', hint: 'Español'},
	ur: {code: 'ur', name: 'Urdu', native: 'اردو', hint: 'اردو'}
};

const messages = {}

messages.en = {
	cc_title: "Cooling Center Finder",
	btn_cooling_centers: "Cooling Centers",
	panel_note: '<p>New York City opens cooling centers in air-conditioned public facilities for those experiencing physical discomfort in a heat wave.</p><p>To find a cooling center, simply type your address or intersection into the search field on the upper-left corner of the map and then hit "Enter"; or zoom and pan the map to your neighborhood location.</p><p>To search or view only accessible centers, click the Accessible Only button below; click All Centers to switch back all centers search or view status.</p><p><b>NOTE:</b> Please check this site daily. Cooling centers may change hours of operation. </p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">Learn more about ways to stay cool</a>.</p>',
	acc_all: "All Centers",
	acc_only: "Accessible Only",
	btn_legend: "Legend",
	legend_note: "Call the cooling center to confirm its hours before you go.",
	legend_searched: "Searched Address",
	legend_comm: "Community Center",
	legend_senior: "Senior Center",
	legend_wheel_comm: "Wheelchair Accessible Community Center",
	legend_wheel_senior: "Wheelchair Accessible Senior Center",
	pop_name: "Name",
	pop_type: "Facility Type",
	pop_address: "Address",
	pop_phone: "Phone",
	pop_hours: "Hours",
	pop_extended: "Extended Hours",
	pop_access: "Wheelchair Accessible",
	search_addr: "Search for an address",
	result_note1: "Click a cooling center name from the list below for more information, or use the map.",
	result_note2: "Call the cooling center to confirm its hours before you go."
}

messages.zh = {
	cc_title: "尋找紐約市避暑中心",
	btn_cooling_centers: '避暑中心',
	panel_note: "<p>紐約市在設有空調公共設施中為那些在熱浪中感到身體不適的人們開設避暑中心。</p><p>若要尋找一個避暑中心，只需在地圖的左上角的搜索框中輸入您的地址或街道交叉點，再按下“Enter” 鍵，或放大和平移動地圖到您的鄰居位置。</p><p>若要搜尋或查詢有輪椅通道的中心，請按下方的「僅限有輪椅通道」按鈕；點選「所有的中心」切換回所有中心的搜尋或查詢狀態。</p><p><b>注意：</b> 請每天查閲此網站。避暑中心開放時間可能會更改。</p><p><a href='http://www1.nyc.gov/site/em/ready/extreme-heat.page' target='_blank'>詳細了解如何保持涼爽的各種方式</a>。</p>",
	acc_all: "所有中心",
	acc_only: "只顯示無障礙設施",
	btn_legend: '說明',
	legend_note: "在前往避暑中心之前，請聯絡中心來確認開放時間。",
	legend_searched: "已搜尋的地址",
	legend_comm: "社區中心",
	legend_senior: "老年人中心",
	legend_wheel_comm: "無障礙社區中心",
	legend_wheel_senior: "無障礙老年人中心 ",
	pop_name: "設施名称",
	pop_type: "設施種類",
	pop_address: "地址",
	pop_phone: "電話號碼",
	pop_hours: "開放時間",
	pop_extended: "加開時間",
	pop_access: "無障礙設施",
	search_addr: "搜尋地址",
	result_note1: "從下方表單中點選避暑中心的名稱或使用地圖來了解更多資訊。 ",
	result_note2: "在前往避暑中心之前，請聯絡中心來確認開放時間。"
}

messages.fr = {
	cc_title: "Centre de rafraîchissement",
	btn_cooling_centers: 'Centers de<br>Rafraîchissement',
	panel_note: "<p>La ville de New York ouvre des centres de refroidissement dans des établissements publics climatisés pour les personnes éprouvant une gêne physique lors de canicule.</p><p>Pour trouver un centre de refroidissement, tapez simplement votre adresse ou intersection de rues dans le champ de recherche du coin supérieur gauche de la carte, puis appuyez sur Enter (Saisir); ou effectuez un zoom et déplacez la carte vers votre quartier.</p><p>Pour rechercher ou afficher uniquement les centres accessibles aux fauteuils roulants, cliquez sur le bouton Accessible Only (Accessibles uniquement) ci-dessous; cliquez sur All Centers (Tous les centres) pour revenir à la recherche de tous les centres ou afficher le statut.</p> <p><b>REMARQUE:</b> Revenez sur ce site quotidiennement. Les centres de refroidissement peuvent changer d'heures d’ouverture.</p><p><a href='http://www1.nyc.gov/site/em/ready/extreme-heat.page' target='_blank'>En savoir plus sur les moyens de rester au frais.</a></p>",
	acc_all: "Tous les centres",
	acc_only: "Accessible uniquement",
	btn_legend: 'Légende',
	legend_note: "Appelez le centre de refroidissement pour confirmer ses heures avant d’y aller.",
	legend_searched: "Adresse recherchée",
	legend_comm: "Centre communautaire",
	legend_senior: "Centre pour personnes âgées",
	legend_wheel_comm: "Centre communautaire accessible aux fauteuils roulants",
	legend_wheel_senior: "Centre pour personnes âgées accessible aux fauteuils roulants",
	pop_name: "Nom",
	pop_type: "Type d’établissement",
	pop_address: "Adresse",
	pop_phone: "Téléphone",
	pop_hours: "Heures",
	pop_extended: "Heures ajoutées",
	pop_access: "Accessible aux fauteuils roulants",
	search_addr: "Rechercher une adresse",
	result_note1: "Cliquez sur un nom de centre de refroidissement dans la liste ci-dessous pour plus d'informations ou utilisez la carte.",
	result_note2: "Il est conseillé d’appeler le centre de refroidissement pour confirmer ses heures d’ouverture avant d’y aller."
}

messages.ar = {
	cc_title: "الباحث عن مركز تبريد في مدينة نيويورك",
	btn_cooling_centers: "مراكز التبريد",
	panel_note: 'تفتح مدينة نيويورك مراكز تبريد في المرافق العامة المكيفة لاستخدامها من طرف من يتضايقون من موجة الحر.<p>للعثور على مركز تبريد، ما عليك سوى كتابة عنوانك أو  أسم  أقرب تقاطع  في حقل البحث في الزاوية العلوية اليسرى من الخريطة ثم الضغط على "إدخال" ؛ أو تكبير الخريطة وتحريكها إلى موقع منطقتك.</p><p>للبحث او لعرض المراكز المتاحة فقط، انقر على زر المتاح فقط؛ انقر على زر جميع المراكز للعودة الى مكان البحث العام او الى حالة العرض.</p><p>ملاحظة: يرجى مراجعة الموقع يوميا. قد تغير مراكز التبريد ساعات العمل.</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">تعرف على المزيد لكي تبقى باردا.<a></p>',
	acc_all: "كافة المراكز.",
	acc_only: "المراكز المتاحة فقط",
	btn_legend: "مفتاح الخريطة",
	legend_note: "اتصل بمركز التبريد للتأكد من ساعات العمل قبل الذهاب اليه.",
	legend_searched: "العنوان الذي تم البحث عنه",
	legend_comm: "مركز مجتمعي ",
	legend_senior: "مركز للكبار السن",
	legend_wheel_comm: "مركز مجتمع يمكن الوصول اليه بواسطة الكرسي المتحرك",
	legend_wheel_senior: "مركز لكبار السن يمكن الوصول اليه بواسطة الكرسي المتحرك",
	pop_name: "الاسم",
	pop_type: "نوع المرفق",
	pop_address: "العنوان",
	pop_phone: "الهاتف",
	pop_hours: "ساعات العمل",
	pop_extended: "ساعات العمل الممتدة",
	pop_access: "متاح بالكرسي المتحرك",
	search_addr: "ابحث عن عنوان",
	result_note1: "انقر على اسم مركز التبريد من القائمة في الأسفل للحصول على مزيد من المعلومات، او استخدم الخارطة.",
	result_note2: "اتصل بمركز التبريد للتأكد من ساعات العمل قبل الذهاب اليه."
}

messages.bn = {
	cc_title: "কুলিং সেন্টার ফাইন্ডার",
	btn_cooling_centers: 'কুলিং সেন্টার',
	panel_note: 'তাপদাহে শারীরিক অস্বাচ্ছন্দ্যের শিকার হওয়া ব্যক্তিদের জন্য নিউ ইয়র্ক সিটি শীতাতপ নিয়ন্ত্রিত সরকারি স্থাপনাগুলোতে কুলিং সেন্টার খুলে থাকে৷<p>একটি কুলিং সেন্টার খুঁজে বের করতে, মানচিত্রের উপরে বাম কোণে অনুসন্ধানের ঘরে আপনার ঠিকানা বা ইন্টারসেকশনের নাম লিখুন এবং “Enter” চাপুন; অথবা মানচিত্রে আপনার মহল্লার অবস্থানের জায়গায় জুম ও প্যান করুন৷</p><p>শুধু হুইলচেয়ার প্রবেশযোগ্য সেন্টারগুলো খুঁজতে, নিচের “Accessible Only” (শুধু হুইলচেয়ার প্রবেশযোগ্য) বাটনে ক্লিক করুন; সব কেন্দ্র খোঁজার জন্য ফিরে যেতে বা স্ট্যাটাস দেখতে “All Centers” (সব কেন্দ্র) অপশনে ক্লিক করুন৷</p><p><b>দ্রষ্টব্য:</b> অনুগ্রহ করে এই সাইট প্রতিদিন চেক করুন৷ কুলিং সেন্টারগুলো খোলা থাকার সময়সূচি পরিবর্তিত হতে পারে৷</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">ঠাণ্ডা থাকার উপায়গুলো সম্পর্কে আরো জানুন৷</a></p>',
	acc_all: "সব সেন্টার",
	acc_only: "শুধু হুইলচেয়ার প্রবেশযোগ্য",
	btn_legend: 'ব্যাখ্যা',
	legend_note: "কুলিং সেন্টার পরিচালনার সময়সূচি সম্পর্কে জানতে আপনি যাওয়ার আগে সেখানে ফোন করুন৷",
	legend_searched: "অনুসন্ধানকৃত ঠিকানা",
	legend_comm: "কমিউনিটি সেন্টার",
	legend_senior: "সিনিয়র সেন্টার",
	legend_wheel_comm: "হুইলচেয়ার প্রবেশযোগ্য কমিউনিটি সেন্টার",
	legend_wheel_senior: "হুইলচেয়ার প্রবেশযোগ্য সিনিয়র সেন্টার",
	pop_name: "নাম",
	pop_type: "কেন্দ্রের ধরন",
	pop_address: "ঠিকানা",
	pop_phone: "ফোন",
	pop_hours: "সময়সূচি",
	pop_extended: "সম্প্রসারিত সময়সূচি",
	pop_access: "হুইলচেয়ার প্রবেশযোগ্য",
	search_addr: 'কোনো ঠিকানার জন্য খুঁজুন',
	result_note1: "আরো তথ্যের জন্য নিচের তালিকা থেকে একটি কুলিং সেন্টারের নামের উপর ক্লিক করুন, বা মানচিত্র ব্যবহার করুন৷",
	result_note2: "কুলিং সেন্টার পরিচালনার সময়সূচি সম্পর্কে জানতে আপনি যাওয়ার আগে সেখানে ফোন করুন৷."
}

messages.ht = {
	cc_title: "Zouti pou Chèche Sant Refwadisman",
	btn_cooling_centers: 'Sant Refwadisman',
	panel_note: '<p>Vil New York ap louvri sant refwadisman nan etablisman piblik ki gen klimatizè pou moun ki santi malèz fizik pandan yon kout chalè.</p><p>Pou jwenn yon sant refwadisman, tou senpleman tape adrès ou oswa entèseksyon nan chan rechèch la sou kwen anwo a goch nan kat la epi frape "Enter" (Antre); oswa zoume epi panche kote katye ou ye a.<p>Pou chèche oswa wè sant ki aksesib sèlman, klike sou bouton Sèlman Aksesib ki anba a; klike sou Tout Sant pou retounen chèche tout sant yo oswa pou gade kondisyon yo.</p><p><b>NÒT:</b> Tanpri tcheke sit sa a chak jou. Sant refwadisman yo ka chanje orè fonksyonman yo.</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">Jwenn plis enfòmasyon sou fason pou rete fre.</a></p>',
	acc_all: "Tout Sant",
	acc_only: "Sèlman Aksesib",
	btn_legend: 'Lejann',
	legend_note: "Rele sant refwadisman an pou konfime lè yo louvri anvan ou ale.",
	legend_searched: "Adrès Rechèch",
	legend_comm: "Sant Kominotè",
	legend_senior: "Sant pou Moun Aje",
	legend_wheel_comm: "Sant Kominotè ki Aksesib pou Chèz-Woulan",
	legend_wheel_senior: "Sant pou Moun Aje ki Aksesib pou Chèz-Woulant",
	pop_name: "Non",
	pop_type: "Kalite Etablisman",
	pop_address: "Adrès",
	pop_phone: "Telefòn",
	pop_hours: "Orè Fonksyonman",
	pop_extended: "Orè Pwolonje",
	pop_access: "Aksesib pou Chèz-Woulant",
	search_addr: 'Chèche yon adrès',
	result_note1: "Klike sou yon non sant refwadisman nan lis anba a pou jwenn plis enfòmasyon, oswa itilize kat la.",
	result_note2: "Rele sant refwadisman an pou konfime lè yo louvri anvan ou ale."
}

messages.ko = {
	cc_title: "뉴욕시 쿨링 센터 검색",
	btn_cooling_centers: '쿨링 센터',
	panel_note: '<p>뉴욕시는 폭염중에 신체적인 불편을 격는 분들에게 에어컨이 작동되는 공공시설 내 쿨링 센터를 운영하고 있습니다.</p><p>쿨링 센터를 검색하려면 주소 또는 교차로를 지도의 왼쪽 상단에 위치한 검색창에 입력한후 “엔터”를 누르시기 바랍니다; 또는 원하시는 지역에 지도를 줌하여 설정하시기 바랍니다.</p><p>장애인 접근 가능한 센터만을 검색하려면 아래 장애인 접근 가능 센터 버튼을 누르세요; 다시 전 센터 또는 상태보기를 위해서는 All Centers (전 센터)를 클릭하시기 바랍니다.</p><p><b>비고:</b> 본 사이트를 매일 확인하시기 바랍니다.  쿨링 센터의 운영 시간이 바뀔수 있습니다. </p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">더위를 피할수 있는 방법</a></p>',
	acc_all: "전 센터",
	acc_only: "이용 가능 센터",
	btn_legend: '레전드',
	legend_note: "출발하시기 전에 쿨링 센터에 연락하여 운영 시간을 확인하시기 바랍니다.",
	legend_searched: "검색 주소",
	legend_comm: "커뮤니티 센터",
	legend_senior: "노인 센터",
	legend_wheel_comm: "휠체어 접근 가능한 커뮤니티 센터",
	legend_wheel_senior: "휠체어 접근 가능한 노인 센터 ",
	pop_name: "이름",
	pop_type: "시설 종류",
	pop_address: "주소",
	pop_phone: "전화번호",
	pop_hours: "운영 시간",
	pop_extended: "연장 운영 시간",
	pop_access: "휠체어 이용 가능",
	search_addr: '주소 검색',
	result_note1: "더 많은 정보를 위해서는 다음 목록에서 쿨링 센터를 클릭하거나 지도를 이용하세요.  ",
	result_note2: "출발하기 전에 쿨링 센터에 연락하여 운영 시간을 확인하세요."
}

messages.po = {
	cc_title: "Znajdź Centrum Chłodzenia",
	btn_cooling_centers: 'Centrum Chłodzenia',
	panel_note: '<p>Miasto Nowy Jork otwiera Centrum Chłodzenia w klimatyzowanych obiektach publicznych dla osób doświadczających trudności fizycznych podczas fali upałów.</p><p>W celu znalezienia Centrum Chłodzenia, należy po prostu wpisać adres lub skrzyżowanie w pole wyszukiwania w lewym górnym rogu mapy i nacisnąć “Enter” lub powiększyć mapę wokół własnej lokalizacji.</p><p>W celu wyszukania lub sprawdzenia ośrodków łatwo dostępnych dla osob niepełnosprawnych, proszę nacisnąć poniższy przycisk “Tylko Centrum Chłodzenia dostępne dla osob niepełnosprawnych”; proszę kliknąć „ Centrum Chłodzenia” w celu powrotu do wyszukiwania lub sprawdzenia wszystkich Centrum.</p><p><b>UWAGA:</b> Prosimy o codzienne sprawdzanie niniejszej strony. Centrum Chłodzenia może zmieniać godziny otwarcia.</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">Dowiedzcie się więcej o tym, jak się chłodzić.</a></p>',
	acc_all: "Centrum Chłodzenia",
	acc_only: "Tylko Centrum Chłodzenia dostępne dla osob niepełnosprawnych",
	btn_legend: 'Legenda',
	legend_note: "Przed wyjściem z domu należy zadzwonić do Centrum Chłodzenia  w celu sprawdzenia godzin otwarcia.",
	legend_searched: "Wyszukiwany adres",
	legend_comm: "Ośrodki społeczno-kulturalne ",
	legend_senior: "Ośrodki dla emerytów",
	legend_wheel_comm: "Ośrodek społeczno-kulturalny z dostępem dla wózków inwalidzkich",
	legend_wheel_senior: "Ośrodek dla emerytów z dostępem dla wózków inwalidzkich",
	pop_name: "Imię i nazwisko",
	pop_type: "Rodzaj obiektu",
	pop_address: "Adres",
	pop_phone: "Numer telefonu",
	pop_hours: "Godziny otwarcia",
	pop_extended: "Przedłużone godzin otwarcia",
	pop_access: "Dostępne dla wózków inwalidzkich",
	search_addr: 'Wyszukiwanie adresu',
	result_note1: "W celu uzyskania dalszych informacji należy kliknąć na nazwę Centrum Chłodzenia lub posłużyć się mapą.",
	result_note2: "Przed wyjściem z domu należy zadzwonić do Centrum Chłodzenia w celu sprawdzenia godzin otwarcia."
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
	legend_wheel_comm: "Общественный центр с доступом для инвалидных колясок",
	legend_wheel_senior: "Центр для пожилых с доступом для инвалидных колясок",
	pop_name: "Ф.И.О.",
	pop_type: "Тип учреждения",
	pop_address: "Адрес",
	pop_phone: "Телефон",
	pop_hours: "Часы работы",
	pop_extended: "Продленные часы работы",
	pop_access: "Доступ для инвалидных колясок",
	search_addr: 'Искать по адресу',
	result_note1: "Для получения дополнительной информации щелкните на центр охлаждения в нижеприведенном списке или воспользуйтесь картой.",
	result_note2: "Прежде чем отправиться в центр охлаждения, позвоните и уточните часы его работы."
}

messages.es = {
	cc_title: "Directorio de centros de refrigeración",
	btn_cooling_centers: 'Centros de<br>refrigeración',
	panel_note: '<p>La Ciudad de Nueva York abre centros de refrigeración en instalaciones públicas con aire acondicionado, para quienes experimenten molestias físicas en una ola de calor.</p><p>Para encontrar un centro de refrigeración, simplemente escriba su dirección o intersección en el campo de búsqueda en la esquina superior izquierda del mapa y luego presione "Enter"; o amplíe y explore el mapa correspondiente a su vecindario.</p><p>Para buscar o ver solamente los centros con acceso para personas con discapacidades, haga clic en el botón "Solo centros con acceso para personas con discapacidades" más abajo; haga clic en "Todos los centros" para volver a la búsqueda de todos los centros o ver el estado.</p><p><b>NOTA:</b> Por favor, revise este sitio a diario. El horario de operación de los centros de refrigeración podría cambiar.</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">Obtenga más información sobre formas de mantenerse fresco.</a></p>',
	acc_all: "Todos los centros",
	acc_only: "Solo centros con acceso para personas con discapacidades",
	btn_legend: 'Leyenda',
	legend_note: "Llame al centro de refrigeración para confirmar el horario de operacion antes de ir.",
	legend_searched: "Dirección buscada",
	legend_comm: "Centro comunitario",
	legend_senior: "Centro para personas mayores",
	legend_wheel_comm: "Centro comunitario con acceso para sillas de ruedas",
	legend_wheel_senior: "Centro para personas mayores con acceso para sillas de ruedas",
	pop_name: "Nombre",
	pop_type: "Tipo de instalación",
	pop_address: "Dirección",
	pop_phone: "Teléfono",
	pop_hours: "Horario",
	pop_extended: "Horario extendido",
	pop_access: "Acceso para sillas de ruedas",
	search_addr: 'Busque una dirección',
	result_note1: "Haga clic en el nombre de un centro de refrigeración de la lista a continuación para obtener más información o use el mapa.",
	result_note2: "Llame al centro de refrigeración para confirmar el horario de operación antes de ir."
}

messages.ur = {
	cc_title: "کولنگ سینٹر  تلاش کرنے کا ذریعہ",
	btn_cooling_centers: 'کولنگ سینٹر (ٹھنڈا رہنے کے مراکز)',
	panel_note: 'نیو یارک شہر گرمی کی لہر میں جسمانی تکلیف کا سامنا کرنے والے افراد کے لئے ایئر کنڈیشنڈ والی عوامی سہولیات میں کولنگ سینٹر کھولتا ہے۔<p>کولنگ سینٹر کو تلاش کرنے کے لئے، بس نقشے کے اوپری بائیں کونے پر تلاش کی جگہ میں اپنے ایڈریس یا انٹرسیکشن کو ٹائپ کریں اور پھر "اینٹر" دبائیں؛ یا نقشہ کو اپنا علاقہ دیکھنے کے لئے زوم اور پین کریں۔</p><p>صرف قابل رسائی مراکز تلاش کرنے یا دیکھنے کے لئے ذیل میں صرف قابل رسائی بٹن پر کلک کریں؛ تمام مراکز کو دوبارہ تلاش کرنے اور دیکھنےکیلئے "تمام مراکز" پر کلک کریں۔</p><p>نوٹ: براہ مہربانی اس سائٹ کو روزانہ ملاحظہ کریں۔ کولنگ سینٹر اوقات کار تبدیل کر سکتے ہیں۔</p><p><a href="http://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank">ٹھنڈا رہنے کے طریقوں کے بارے میں مزید معلومات حاصل کریں۔۔</a></p>',
	acc_all: "تمام مراکز",
	acc_only: "صرف قابل رسائی",
	btn_legend: 'علامات',
	legend_note: "اوقات کار کی تصدیق کے لئے جانے سے پہلے کولنگ سینٹر کو کال کریں۔",
	legend_searched: "تلاش کیا گیا ایڈرس",
	legend_comm: "کمیونٹی سینٹر",
	legend_senior: "سینئیر سینٹر",
	legend_wheel_comm: "وہیل چیئر قابل رسائی کمیونٹی سینٹر",
	legend_wheel_senior: "وہیل چیئر قابل رسائی سینئیر  سینٹر",
	pop_name: "نام",
	pop_type: "سہولیات کی نوعیت",
	pop_address: 'پتا',
	pop_phone: 'فون',
	pop_hours: "اوقات",
	pop_extended: "توسیع شدہ اوقات",
	pop_access: "وہیل چیئر قابل رسائی",
	search_addr: 'ایڈریس کو تلاش کریں',
	result_note1: "مزید معلومات کے لئے نیچے کی فہرست میں سے کسی کولنگ سینٹر کے نام پر کلک کریں، یا نقشہ کا استعمال کریں۔",
	result_note2: "اوقات کار کی تصدیق کے لئے جانے سے پہلے کولنگ سینٹر کو کال کریں۔"
}

export default {messages, languages}