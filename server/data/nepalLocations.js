/**
 * Complete list of Nepal locations (cities, towns, municipalities)
 * Organized by Province → District → Places
 * Used as a flat searchable array for dropdowns
 */

const nepalLocations = [
  // ── Province No. 1 (Koshi) ──────────────────────────────────────────────
  // Taplejung
  "Taplejung", "Phungling", "Sirijunga",
  // Panchthar
  "Phidim", "Miklajung", "Hilihang", "Falelung",
  // Ilam
  "Ilam", "Deumai", "Mai", "Maijogmai", "Sandakpur", "Suryodaya",
  // Jhapa
  "Birtamod", "Bhadrapur", "Damak", "Mechinagar", "Urlabari",
  "Arjundhara", "Budhabare", "Gauradaha", "Haldibari", "Kankai",
  "Kamal", "Shivasataxi", "Tenzing Norgye", "Charali",
  // Morang
  "Biratnagar", "Rangeli", "Sundarharaicha", "Urlabari",
  "Belbari", "Ratuwamai", "Pathari Shanischare", "Dhanpalthan",
  "Gramthan", "Jahada", "Kanepokhari", "Kerabari",
  "Letang Bhogateni", "Miklajung", "Sunwarshi",
  // Sunsari
  "Dharan", "Itahari", "Inaruwa", "Duhabi", "Harinagar",
  "Barahakshetra", "Bhokraha Narsingh", "Dewanganj", "Koshi",
  "Ramdhuni",
  // Bhojpur
  "Bhojpur", "Shadananda", "Aamchowk", "Arun", "Hatuwagadhi",
  "Pauwadungma", "Ramprasad Rai", "Salpasilichho",
  // Dhankuta
  "Dhankuta", "Pakhribas", "Chhathar Jorpati", "Khalsa Devi",
  "Mahalaxmi", "Sangurigadhi", "Shahidbhumi",
  // Terhathum
  "Myanglung", "Chhathar", "Aathrai Tribeni", "Fedap", "Laligurans",
  "Menchyayem", "Phedap",
  // Sankhuwasabha
  "Khandbari", "Chainpur", "Dharmadevi", "Madi", "Makalu",
  "Panchkhapan", "Sabhapokhari", "Silichong",
  // Solukhumbu
  "Salleri", "Solududhkunda", "Dudh Koshi", "Khumbu Pasanglahmu",
  "Likhupike", "Mahakulung", "Nechasalyan", "Sotang", "Thulung Dudhkoshi",
  // Okhaldhunga
  "Okhaldhunga", "Champadevi", "Chisankhugadhi", "Khijidemba",
  "Likhu Tamakoshi", "Manebhanjyang", "Molung", "Siddhicharan", "Sunkoshi",
  // Khotang
  "Diktel", "Halesi Tuwachung", "Aiselukharka", "Barahapokhari",
  "Chisapani", "Diprung Chuichumma", "Jantedhunga", "Khotehang",
  "Lamidanda", "Rawabesi", "Sakela",
  // Udayapur
  "Gaighat", "Triyuga", "Belaka", "Chaudandigadhi", "Katari", "Limchungbung",
  "Rautamai", "Sunkoshi", "Tapli", "Udayapurgadhi",

  // ── Province No. 2 (Madhesh) ────────────────────────────────────────────
  // Saptari
  "Rajbiraj", "Kanchanrup", "Agnisair Krishna Savaran", "Balan Vihul",
  "Bishnupur", "Bodebarsain", "Chhinnamasta", "Dakneshwori",
  "Hanumannagar Kankalini", "Khadak", "Mahadeva", "Rajgadh", "Rupani",
  "Shambhunath", "Saptakoshi", "Surunga", "Tilathi Koiladi", "Tirhut",
  // Siraha
  "Lahan", "Siraha", "Dhangadhimai", "Golbazar", "Mirchaiya",
  "Sukhipur", "Aurahi", "Bishnupur", "Bariyarpatti", "Bhagwanpur",
  "Karjanha", "Kalyanpur", "Lakshmipur Patari", "Nawarajpur",
  "Sakhuwanankarkatti",
  // Dhanusha
  "Janakpur", "Janakpurdham", "Dhanusadham", "Ganeshman Charnath",
  "Hansapur", "Lakshminiya", "Mithila", "Mithila Bihari", "Nagarain",
  "Sabaila", "Shahidnagar", "Bateshwar", "Bideha", "Chhireshwornath",
  "Dhanauji", "Inruwa", "Kamala", "Mukhiyapatti Musarmiya",
  "Parwanipur", "Saurahawa", "Triveni",
  // Mahottari
  "Jaleshwar", "Bardibas", "Aurahi", "Balawa", "Bangarwa", "Bhangaha",
  "Ekdara", "Gaushala", "Loharpatti", "Mahottari", "Manara Siswa",
  "Matihani", "Pipra", "Ramgopalpur", "Samsi", "Sarladevi",
  "Sonama", "Sonama",
  // Sarlahi
  "Malangwa", "Bagmati", "Balara", "Barahathawa", "Basbariya",
  "Bishnu", "Bramhapuri", "Chakraghatta", "Chandranagar", "Dhankaul",
  "Godaita", "Haripurwa", "Hariwan", "Ishworpur", "Kabilasi",
  "Kamalamai", "Kaudena", "Lalbandi", "Parsa", "Ramnagar",
  "Rautamai", "Tekuwa",
  // Rautahat
  "Gaur", "Baudhimai", "Brindaban", "Chandrapur", "Devahi Gonahi",
  "Durga Bhagwati", "Gadhimai", "Garuda", "Guruthwa", "Ishanath",
  "Katahariya", "Maulapur", "Madhav Narayan", "Paroha", "Phatuwa Bijai Nagar",
  "Phatuwabijainagar", "Rajdevi", "Rajpur", "Yamunamai",
  // Bara
  "Kalaiya", "Jitpur Simara", "Bara", "Adarsha Kotwal", "Baragadhi",
  "Chakraghatta", "Devtal", "Jitpursimara", "Kalaiya", "Karaiyamai",
  "Kolhabi", "Mahagadhimai", "Nijgadh", "Parwanipur", "Pheta",
  "Prasauni", "Simraungadh", "Suwarna",
  // Parsa
  "Birgunj", "Parsagadhi", "Bahudarmai", "Bindabasini", "Chhipaharmai",
  "Dhobini", "Jagarnathpur", "Jirabhawani", "Kalikamai", "Pakaha Mainpur",
  "Pakahamainpur", "Paterwasugauli", "Pokhariya", "Sakhuwa Prasauni",
  "Thori",

  // ── Bagmati Province ────────────────────────────────────────────────────
  // Kathmandu
  "Kathmandu", "Budhanilkantha", "Chandragiri", "Dakshinkali",
  "Gokarneshwar", "Kageshwori Manahara", "Kirtipur", "Nagarjun",
  "Shankharapur", "Tarakeshwar", "Tokha",
  // Bhaktapur
  "Bhaktapur", "Changunarayan", "Madhyapur Thimi", "Suryabinayak",
  // Lalitpur
  "Lalitpur", "Godawari", "Mahalaxmi", "Konjyosom",
  // Kavrepalanchok
  "Dhulikhel", "Banepa", "Panauti", "Panchkhal", "Namobuddha",
  "Bethanchok", "Bhumlu", "Chaurideurali", "Khanikhola", "Mandan Deupur",
  "Mahabharat", "Roshi", "Temal",
  // Sindhupalchok
  "Chautara Sangachokgadhi", "Balephi", "Bhotekoshi", "Helambu",
  "Indrawati", "Jugal", "Larjung", "Lisankhu Pakhar", "Melamchi",
  "Panchpokhari Thangpal", "Tripurasundari",
  // Rasuwa
  "Dhunche", "Amachodingmo", "Gosaikunda", "Kalika", "Naukunda", "Uttargaya",
  // Nuwakot
  "Bidur", "Bel Nagi", "Belkotgadhi", "Dupcheshwar", "Kakani",
  "Kispang", "Likhu", "Myagang", "Panchakanya", "Shivapur",
  "Suryagadhi", "Tadi", "Tarkeshwar",
  // Dhading
  "Nilkantha", "Benighat Rorang", "Gajuri", "Galchi", "Gangajamuna",
  "Jwalamukhi", "Khaniyabas", "Netrawati Dabjong", "Rubi Valley",
  "Siddhilek", "Thakre", "Tripurasundari",
  // Makwanpur
  "Hetauda", "Bakaiya", "Bhimphedi", "Bagmati", "Indrasarowar", "Kailash",
  "Makwanpurgadhi", "Manahari", "Raksirang", "Thaha",
  // Chitwan
  "Bharatpur", "Ratnanagar", "Bidur", "Ichangu", "Kalika", "Khairahani",
  "Madi", "Rapti", "Rwang",
  // Ramechhap
  "Manthali", "Doramba", "Gokulganga", "Khandadevi", "Likhu Tamakoshi",
  "Likhutamakoshi", "Manthali", "Ramechhap", "Sunapati", "Umakunda",
  // Sindhuli
  "Sindhulimadi", "Dudhouli", "Ghanglekh", "Golanjor", "Hariharpurgadhi",
  "Kamalamai", "Marin", "Phikkal", "Sunkoshi", "Tinpatan",
  // Dolakha
  "Charikot", "Bigu", "Bhimeshwor", "Baiteshwor", "Gaurishankar",
  "Jiri", "Kalinchok", "Melung", "Sailung", "Shailung", "Tamakoshi",

  // ── Gandaki Province ────────────────────────────────────────────────────
  // Kaski
  "Pokhara", "Annapurna", "Machhapuchchhre", "Madi", "Rupa",
  // Tanahun
  "Damauli", "Byas", "Bhanu", "Devghat", "Ghiring", "Myagde",
  "Shuklagandaki", "Bandipur", "Anbukhaireni", "Ripchhip", "Marsyangdi",
  // Lamjung
  "Besisahar", "Dordi", "Dudhpokhari", "Kwholasothar", "Madhyanepal",
  "Marsyangdi", "Rainas", "Sundarbazar",
  // Gorkha
  "Gorkha", "Ajirkot", "Arughat", "Barpak Sulikot", "Bhimsenthapa",
  "Chum Nubri", "Dharche", "Gandaki", "Kerauja", "Palungtar",
  "Shahid Lakhan", "Siranchok", "Tsum Nubri",
  // Manang
  "Chame", "Manang Disyang", "Narphu", "Narphu", "Nasong",
  // Mustang
  "Jomsom", "Barhagaun Muktichhetra", "Dalome", "Gharapjhong",
  "Lomanthang", "Thasang", "Varagung Muktichhetra",
  // Myagdi
  "Beni", "Annapurna", "Dhaulagiri", "Mangala", "Malika", "Raghu Ganesh",
  "Raghuganga",
  // Parbat
  "Kushma", "Bihadi", "Dhurkot", "Jaljala", "Mahashila", "Modi",
  "Painyu",
  // Baglung
  "Baglung", "Badigad", "Bareng", "Bhagawati", "Dhorpatan", "Galkot",
  "Jaimini", "Kanthekhola", "Nisikhola", "Taman",
  // Nawalpur
  "Kawasoti", "Bulingtar", "Devchuli", "Gaidakot", "Hupsekot",
  "Madhyabindu",
  // Syangja
  "Putalibazar", "Aandhikhola", "Arjunchaupari", "Biruwa", "Bhirkot",
  "Chapakot", "Galyang", "Harinas", "Kaligandaki", "Phedikhola",
  "Waling",

  // ── Lumbini Province ────────────────────────────────────────────────────
  // Rupandehi
  "Bhairahawa", "Butwal", "Devdaha", "Gaidahawa", "Gyaneswor",
  "Kotahimai", "Lumbini Sanskritik", "Mayadevi", "Marchawari",
  "Omsatiya", "Rohini", "Sainamaina", "Sammarimai", "Shudhodhan",
  "Sudhdhodhan", "Siyari", "Tilottama",
  // Kapilvastu
  "Taulihawa", "Banganga", "Bijaynagar", "Buddhabhumi", "Kapilvastu",
  "Krishnanagar", "Maharajgunj", "Mayadevi", "Shivaraj", "Suddhodhan",
  "Yashodhara",
  // Nawalparasi (East)
  "Bardaghat", "Hupsekot", "Palhinandan", "Pratappur", "Ramgram",
  "Sunwal", "Triveni", "Vijayapur",
  // Palpa
  "Tansen", "Bagnaskali", "Mathagadhi", "Nisdi", "Purbakhola",
  "Rampur", "Rambha", "Rainadevi Chhahara", "Ribdikot", "Ripdikot",
  "Tinau",
  // Arghakhanchi
  "Sandhikharka", "Bhumekasthan", "Chhatradev", "Malarani", "Panini",
  "Shitganga",
  // Gulmi
  "Tamghas", "Chandrakot", "Chatrakot", "Dhurkot", "Gulmidarbar",
  "Isma", "Kaligandaki", "Madane", "Malika", "Musikot", "Resunga",
  "Ruru", "Satyawati",
  // Pyuthan
  "Pyuthan", "Gaumukhi", "Jhimaruk", "Lungri", "Mallarani",
  "Naubahini", "Sarumarani", "Sworgadwary",
  // Rolpa
  "Liwang", "Gangadev", "Madi", "Pariwartan", "Rolpa", "Runtigadhi",
  "Sunchhahari", "Suwarna", "Thabang", "Tribeni",
  // Rukum (East)
  "Putha Uttarganga", "Bhume", "Sisne",
  // Dang
  "Ghorahi", "Tulsipur", "Babai", "Banglachuli", "Dangisharan",
  "Gadhawa", "Ghorahi", "Lamahi", "Rajpur", "Rapti", "Shantinagar",
  "Tulsipur",
  // Banke
  "Nepalgunj", "Baijanath", "Duduwa", "Janki", "Khajura",
  "Kohalpur", "Narainapur", "Rapti Sonari",
  // Bardiya
  "Gulariya", "Badhaiyatal", "Bansgadhi", "Barbardiya", "Geruwa",
  "Madhuwan", "Rajapur", "Thakurbaba",

  // ── Karnali Province ────────────────────────────────────────────────────
  // Surkhet
  "Birendranagar", "Bheriganga", "Chaukune", "Gurbhakot", "Lekhbesi",
  "Panchpuri", "Simta",
  // Dailekh
  "Narayan", "Aathabis", "Bhairabi", "Chamunda Bindrasaini", "Dullu",
  "Gurans", "Mahabu", "Naumule", "Thantikandh",
  // Jajarkot
  "Khalanga", "Barekot", "Bheri", "Chhedagad", "Junichande", "Kuse",
  "Nalagad", "Shiwalaya",
  // Rukum (West)
  "Musikot", "Aathbiskot", "Banfikot", "Chaurjahari", "Triveni",
  // Salyan
  "Bangad Kupinde", "Bagchaur", "Baijnath", "Chhatreshwori", "Darma",
  "Dhorchaur", "Kalimati", "Kapurkot", "Kumakh", "Sharada", "Siddha Kumakh",
  "Tribeni",
  // Dolpa
  "Dunai", "Dolpo Buddha", "Jagdulla", "Kaike", "Mudkechula",
  "Shey Phoksundo", "Thuli Bheri", "Tripurasundari",
  // Mugu
  "Gamgadhi", "Chhayanath Rara", "Khatyad", "Mugum Karmarong", "Soru",
  // Humla
  "Simikot", "Adanchuli", "Chankheli", "Kharpunath", "Namkha",
  "Sarkegad", "Tanjakot",
  // Kalikot
  "Manma", "Mahawai", "Naraharinath", "Pachaljharana", "Palata",
  "Raskot", "Shubha Kalika", "Sanni Tribeni", "Tilagufa",
  // Jumla
  "Chandannath", "Guthichaur", "Hima", "Kanaka Sundari", "Khadachakra",
  "Malikartika", "Patarasi", "Sinja", "Tila",

  // ── Sudurpashchim Province ───────────────────────────────────────────────
  // Kailali
  "Dhangadhi", "Tikapur", "Bhajani", "Chure", "Gauriganga",
  "Ghodaghodi", "Janaki", "Jorayal", "Kailari", "Lamkichuha", "Mohanyal",
  "Phakiya Budhiganga",
  // Kanchanpur
  "Mahendranagar", "Belauri", "Bedkot", "Bhimdatta", "Krishnapur",
  "Laljhadi", "Punarbas", "Shuklapha",
  // Dadeldhura
  "Amargadhi", "Aalital", "Ajayameru", "Bhageshwar", "Ganayapdhura",
  "Navadurga", "Parashuram",
  // Baitadi
  "Dasharathchand", "Dilasaini", "Dogdakedar", "Melauli",
  "Patan", "Purnagiri", "Sigas", "Surnaya",
  // Darchula
  "Darchula", "Apihimal", "Bylasi", "Duhun", "Khaptad Chhanna",
  "Lekam", "Mahakali", "Marma", "Naugad", "Shailyashikhar",
  // Bajhang
  "Chainpur", "Bungal", "Chhanna", "Durgathali", "Jayaprithvi",
  "Khaptadchhanna", "Masta", "Saipal", "Surma", "Talkot", "Thalara",
  // Bajura
  "Martadi", "Badimalika", "Budhiganga", "Gaumul", "Himali",
  "Jagannath", "Khaptad Chhanna", "Pandav Gupha", "Swami Kartik Khapar",
  "Triveni",
  // Achham
  "Mangalsen", "Bannigadhi Jayagadh", "Chaurpati", "Dhakari",
  "Kamalbazar", "Mellekh", "Panchadewal Binayak", "Ramaroshan",
  "Sanphebagar", "Turmakhand",
  // Doti
  "Dipayal Silgadhi", "Aadarsha", "Badikedar", "Bogtan",
  "Jorayal", "K.I. Singh", "Purbichauki", "Sayal", "Shikhar",
];

// Remove duplicates and sort alphabetically
const NEPAL_LOCATIONS = [...new Set(nepalLocations)].sort((a, b) =>
  a.localeCompare(b)
);

module.exports = NEPAL_LOCATIONS;
